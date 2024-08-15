'use server'
import { env } from "@/env";
import axios from "axios";

export default async function getShortUrl(short_url: string) {
    try {
        const res = await axios.get(`${env.BASE_URL}/${short_url}`)
        const data = await res.data
        return data
    } catch (error) {
        return error
    }

}
