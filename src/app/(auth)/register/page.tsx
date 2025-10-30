import RegisterView from "@/src/sections/auth/view/register-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng ký",
};

export default function RegisterPage() {
  return <RegisterView></RegisterView>;
}
