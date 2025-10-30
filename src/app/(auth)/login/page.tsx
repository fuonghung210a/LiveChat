import { LoginView } from "@/src/sections/auth/view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập",
};

export default function LoginPage() {
  return <LoginView></LoginView>;
}
