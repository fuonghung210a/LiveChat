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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  async function handleSubmit(e: React.FormEvent) {}

  return (
    <AuthLayout>
      <AuthFormCard onSubmit={handleSubmit}>
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
          <Button variant={BUTTON_VARIANTS.PRIMARY}>Đăng nhập</Button>
        </div>
      </AuthFormCard>
    </AuthLayout>
  );
}
