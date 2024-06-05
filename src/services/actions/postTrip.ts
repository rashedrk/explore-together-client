import { authKey } from "@/constants/authkey";
import { getFromLocalStorage } from "@/utils/local-storage";
import { FieldValues } from "react-hook-form";

export const postTrip = async (data: FieldValues) => {
    const accessToken = getFromLocalStorage(authKey);
    const res = await fetch(
        'https://travel-buddy-matching-server.vercel.app/api/trips',
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