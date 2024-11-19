import { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "..";
import { ReactComponent as IconArrowSelect } from "../../../../styles/assets/svg/icon-select-arrow.svg";
import * as S from "../inputs.styles";
import { SelectHTMLAttributes, useState } from "react";

interface InputSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  displayExpr: string | string[];
  keyExpr: string;
  label?: string;
  items?: any;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  invisible?: boolean;
  children?: React.ReactElement;
  register?: UseFormRegisterReturn;
  size?: string | any;
  errors?: any;
  step?: string;
  necessary?: boolean;
  refs?: any;
  autoComplete?: "on" | "off";
  addNullItem?: boolean;
}

export const InputSelect = ({
  label,
  name,
  size,
  placeholder,
  register,
  onChange = () => {},
  items,
  displayExpr,
  keyExpr,
  necessary,
  addNullItem = false,
  value,
}: InputSelectProps) => {
  const [changeValue, setChangeValue] = useState<string>("");
  let addedItem = items;

  if (addNullItem && items) {
    // 조건부 빈값추가
    const addObject: any = {};
    addObject[keyExpr] = "";
    if (typeof displayExpr === "object") {
      for (let i = 0; i < displayExpr.length; i++) {
        addObject[displayExpr[i]] = " ";
      }
    } else {
      addObject[displayExpr] = " ";
    }
    addedItem = [addObject, ...items];
  }

  return (
    <Input size={size}>
      <>
        <S.InputTypeBox>
          <select
            {...register}
            onChange={(e) => {
              register?.onChange(e);
              onChange(e);
              setChangeValue(e.target.value);
            }}
            value={changeValue}
            className={
              changeValue === "" ||
              changeValue === "차종" ||
              changeValue === "규격" ||
              changeValue === "샤시"
                ? "defaultValue"
                : ""
            }
          >
            {placeholder && <option>{placeholder}</option>}
            {addedItem &&
              addedItem?.map((item: any, idx: number) => {
                return (
                  <option key={idx} value={item[keyExpr]}>
                    {typeof displayExpr === "string" && item[displayExpr]}
                    {typeof displayExpr === "object" &&
                      `${displayExpr.map((cur) => item[cur]).join(" - ")}`}
                  </option>
                );
              })}
          </select>
          <div className="arrowDiv">
            <IconArrowSelect width={24} height={24} />
          </div>
        </S.InputTypeBox>
      </>
    </Input>
  );
};
