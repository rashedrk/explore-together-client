import { authKey } from "@/constants/authkey";
import { getFromLocalStorage } from "@/utils/local-storage";
import { FieldValues } from "react-hook-form";

export const postTrip = async (data: FieldValues) => {
    const accessToken = getFromLocalStorage(authKey);
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/trips`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken ? accessToken : ""
            },
            body: JSON.stringify(data),
            cache: "no-store",
        }
    );
    const tripInfo = await res.json();
    return tripInfo;
};