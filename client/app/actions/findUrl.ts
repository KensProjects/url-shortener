'use server'
import { env } from "@/env"
import axios from "axios"

export async function findUrl(url: string) {

    try {
        const res = await axios.post(env.BASE_URL, { url })
        const data = await res.data
        return data
    } catch (error) {
        return error
    }
}