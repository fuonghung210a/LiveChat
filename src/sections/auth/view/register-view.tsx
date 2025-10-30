"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/src/components/common/Button";
import Input from "@/src/components/common/Input";
import { BUTTON_VARIANTS } from "@/src/constants/button";
import AuthErrorMessage from "@/src/components/auth/AuthErrorMessage";
import AuthFormCard from "@/src/components/auth/AuthFormCard";
import AuthHeader from "@/src/components/auth/AuthHeader";
import AuthLayout from "@/src/components/auth/AuthLayout";
import { useAppDispatch } from "@/src/hooks/reduxHooks";
import { authService } from "@/src/services/api/auth";
import { login as loginAction } from "@/src/store/userSlice";
import Link from "next/link";

export default function RegisterView() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Validation
    if (!name.trim()) {
      setError("Vui lòng nhập tên");
      return;
    }

    if (!email.trim()) {
      setError("Vui lòng nhập email");
      return;
    }

    if (!password) {
      setError("Vui lòng nhập mật khẩu");
      return;
    }

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    setLoading(true);

    try {
      // Call authService to register
      const response = await authService.register({ name, email, password });

      // Dispatch Redux action to update state
      dispatch(
        loginAction({
          name: response.user.name,
          email: response.user.email,
          token: response.token,
        }),
      );

      // Redirect to home page after successful registration
      router.push("/");
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })
        ?.response?.data?.message;
      setError(message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <AuthFormCard onSubmit={handleRegister}>
        <AuthHeader
          logoSrc="/chatapp.png"
          logoAlt="register"
          title="Đăng ký"
          description="Tạo tài khoản mới để bắt đầu chat!"
        />
        <div className="flex flex-col gap-1">
          <Input
            variant="text"
            label="Tên"
            placeholder="Nhập tên của bạn..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            variant="email"
            label="Email"
            placeholder="Nhập email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            variant="password"
            label="Mật khẩu"
            placeholder="Nhập mật khẩu..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            variant="password"
            label="Xác nhận mật khẩu"
            placeholder="Nhập lại mật khẩu..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <AuthErrorMessage message={error} />
          <Button variant={BUTTON_VARIANTS.PRIMARY} loading={loading}>
            Đăng ký
          </Button>
          <div className="text-center text-sm text-gray-600 mt-2">
            Đã có tài khoản?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      </AuthFormCard>
    </AuthLayout>
  );
}
