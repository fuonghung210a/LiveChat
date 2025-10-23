import { cookies } from "next/headers";

export async function login(email: string, password: string) {
    // Example static auth, replace with DB check
    (await cookies()).set("token", "TokenPlaceHolder", { httpOnly: true });

    return { success: true, message: "Logged in successfully" };
}

export async function logout() {
    (await cookies()).delete("token");
}
