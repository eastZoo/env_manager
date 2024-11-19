import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { request } from "../../../lib/api";
import {
  writeAccessToken,
  writeRefreshToken,
} from "../../../lib/authFunctions";
import { useSetRecoilState } from "recoil";
import { User, userState } from "../../../states/user";
import * as S from "./loginForm.styles";
import { InputText } from "../../atoms/PopupAlert/Inputs/InputText";
import { InputPassword } from "../../atoms/PopupAlert/Inputs/InputPassword";
import { Button } from "../../atoms/Buttons";
import mainLogo from "../../../styles/assets/img/logo.png";
import { Link } from "react-router-dom";

interface LoginInputs {
  userId: string;
  password: string;
}

export const LoginForm = () => {
  /** ============================= state 영역 ============================= */
  const setUserState = useSetRecoilState(userState);
  const schema = yup
    .object({
      userId: yup.string().required("아이디를 입력해주세요."),
      password: yup.string().required("비밀번호를 입력해주세요."),
    })
    .required();

  const { register, handleSubmit } = useForm<LoginInputs>({
    resolver: yupResolver(schema),
  });

  /** ============================= API 영역 ============================= */
  const { mutateAsync: loginMutation } = useMutation({
    mutationFn: (inputs: LoginInputs) => {
      return request<{
        success: boolean;
        message?: string;
        accessToken?: string;
        refreshToken?: string;
        user: User;
      }>({
        method: "POST",
        url: "auth/sign-in",
        data: inputs,
      });
    },
    onSuccess: (res) => {
      if (res.success) {
        writeAccessToken(res?.accessToken!);
        writeRefreshToken(res?.refreshToken!);
        setUserState(res.user);
        window.location.replace("/");
        // f7router.navigate("/");
      } else {
        alert(res.message);
      }
    },
    onError: (e) => {
      alert(e?.message || "서버요청 에러");
    },
  });

  /** ============================= 비즈니스 로직 영역 ============================= */
  const onSubmit: SubmitHandler<LoginInputs> = async (inputs) => {
    await loginMutation(inputs);
  };
  /** ============================= 컴포넌트 영역 ============================= */

  /** ============================= useEffect 영역 ============================= */
  return (
    <S.LoginFormLayout>
      <S.LoginForm onSubmit={handleSubmit(onSubmit)}>
        <S.LoginLogoBox>
          <Link to="/">
            <img src={mainLogo} style={{ width: "180px" }} alt="" />
          </Link>
        </S.LoginLogoBox>
        <S.LoginInputBox>
          <InputText
            label="ID"
            size="full"
            register={register("userId")}
            name="userId"
          />
          <InputPassword
            label="PASSWORD"
            size="full"
            register={register("password")}
            name="password"
          />
          {/* <S.UserInfoSaveCheckBox onClick={() => setUserCheck(!userCheck)}>
            {userCheck ? (
              <IconCheckTrue width={24} height={24} />
            ) : (
              <IconCheckFalse width={24} height={24} />
            )}
            로그인 정보 저장
          </S.UserInfoSaveCheckBox> */}
        </S.LoginInputBox>
        <Button type="submit" size="full" label="로그인" />
      </S.LoginForm>
      <S.BottomMoveLayout>
        <S.UserInfoFindAndJoin onClick={() => {}}>
          계정정보 찾기
        </S.UserInfoFindAndJoin>
        <S.UserInfoFindAndJoin onClick={() => {}}>
          회원가입
        </S.UserInfoFindAndJoin>
      </S.BottomMoveLayout>
    </S.LoginFormLayout>
  );
};
