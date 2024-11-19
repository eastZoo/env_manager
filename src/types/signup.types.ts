import { UseFormRegister, UseFormHandleSubmit } from "react-hook-form";
import { UseMutateFunction } from "@tanstack/react-query";
import { Interface } from "readline";

export interface UseFormType {
  register: UseFormRegister<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  errors: any;
}

export interface SignUpType {
  username: string;
  userId: string;
  password: string;
  userPwCheck: string;
  email?: string;
  phoneNumber: string;
  birthDay: Date;
  gender?: string;
}

export interface StoreListType {
  id: string;
  name: string;
}

export interface MerchantType {
  id: string;
  name: string;
}
