"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Button from "./_components/Button";
import { BUTTON_VARIANTS } from "@/src/constants/button";

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
                className="p-6 rounded-2xl shadow-md w-96"
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
                    <div className="group">
                        <h2 className="text-md pl-0.5 font-bold">Tài khoản</h2>
                        <input
                            type="email"
                            placeholder="Nhập tài khoản"
                            className="border p-2 w-full mb-2 rounded-md"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <h2 className="text-md pl-0.5 font-bold">Mật khẩu</h2>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu"
                            className="border p-2 w-full mb-2 rounded-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}
                    </div>
                    <Button variant={BUTTON_VARIANTS.PRIMARY}>Đăng nhập</Button>
                </div>
            </form>
        </div>
    );
}
