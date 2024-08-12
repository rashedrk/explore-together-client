import { FieldValues } from "react-hook-form";

export const userLogin = async (data: FieldValues) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/login`,
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