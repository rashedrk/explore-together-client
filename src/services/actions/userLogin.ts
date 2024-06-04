import { FieldValues } from "react-hook-form";

export const userLogin = async (data: FieldValues) => {
    const res = await fetch(
        'https://travel-buddy-matching-server.vercel.app/api/login',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            //   credentials: "include",
        }
    );
    const userInfo = await res.json();
    // console.log(userInfo);


    return userInfo;
};