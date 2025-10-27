"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Button from "@/src/components/common/Button";
import { BUTTON_VARIANTS } from "@/src/constants/button";
import Input from "@/src/components/common/Input";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (true) {
            redirect("/dashboard");
        } else {
            const data = await res.json();
            setError(data.message || "Login failed!");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="p-6 rounded-2xl shadow-md w-96 bg-gray-50"
            >
                <div className="flex items-center flex-col justify-center pb-5">
                    <Image
                        src="/chatapp.png"
                        width={100}
                        height={100}
                        alt="login"
                    />
                    <h1 className="text-xl font-bold mb-4">Đăng nhập</h1>
                    <h2 className="text-sm text-gray-500">
                        Đăng nhập để tiếp tục chat với bạn bè!
                    </h2>
                </div>
                <div>
                    <Input
                        variant="email"
                        label="Email"
                        placeholder="Nhập email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Input>
                    <Input
                        variant="password"
                        label="Password"
                        placeholder="Nhập mật khẩu..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Input>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button variant={BUTTON_VARIANTS.PRIMARY}>Đăng nhập</Button>
                </div>
            </form>
        </div>
    );
}
