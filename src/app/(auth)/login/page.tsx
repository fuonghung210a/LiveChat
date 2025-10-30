"use client";

import { useEffect, useState } from "react";
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
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the redirect URL from query params (e.g., /login?redirect=/dashboard)
  const redirectURL = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  // Redirect if already logged in
  useEffect(() => {
    if (user.token) {
      router.push(redirectURL);
    }
  }, [user.token, router, redirectURL]);

  async function handleLogin(e: React.FormEvent) {
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

      router.push(redirectURL);
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
          <div className="text-center text-sm text-gray-600 mt-2">
            Chưa có tài khoản?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </AuthFormCard>
    </AuthLayout>
  );
}
