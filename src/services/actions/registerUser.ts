import { FieldValues } from "react-hook-form";

export const registerUser = async (data: FieldValues) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            cache: "no-store",
        }
    );
    const userInfo = await res.json();
    return userInfo;
};