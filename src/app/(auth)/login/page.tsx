"use client";

import { useState } from "react";
import Button from "@/src/components/common/Button";
import Input from "@/src/components/common/Input";
import { BUTTON_VARIANTS } from "@/src/constants/button";
import AuthErrorMessage from "@/src/components/auth/AuthErrorMessage";
import AuthFormCard from "@/src/components/auth/AuthFormCard";
import AuthHeader from "@/src/components/auth/AuthHeader";
import AuthLayout from "@/src/components/auth/AuthLayout";
import { useAppDispatch, useAppSelector } from "@/src/hooks/reduxHooks";
import { authService } from "@/src/services/api/auth";
import { login as loginAction } from "@/src/store/userSlice";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  async function handleLogin(e: React.FormEvent) {
    console.log("email:", email, "Password", password);
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Call authService to login
      const response = await authService.login({ email, password });

      // Dispatch Redux action to update state
      dispatch(
        loginAction({
          name: response.user.name,
          email: response.user.email,
          token: response.token,
        }),
      );
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })
        ?.response?.data?.message;
      setError(message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <AuthFormCard onSubmit={handleLogin}>
        <AuthHeader
          logoSrc="/chatapp.png"
          logoAlt="login"
          title="Đăng nhập"
          description="Đăng nhập để tiếp tục chat với bạn bè!"
        />
        <div className="flex flex-col gap-1">
          <Input
            variant="email"
            label="Email"
            placeholder="Nhập email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            variant="password"
            label="Password"
            placeholder="Nhập mật khẩu..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <AuthErrorMessage message={error} />
          <Button variant={BUTTON_VARIANTS.PRIMARY} loading={loading}>
            Đăng nhập
          </Button>
        </div>
      </AuthFormCard>
    </AuthLayout>
  );
}
