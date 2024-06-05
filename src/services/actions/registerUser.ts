import { FieldValues } from "react-hook-form";

export const registerUser = async (data: FieldValues) => {
    const res = await fetch(
        'https://travel-buddy-matching-server.vercel.app/api/register',
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