'use client'

import { useQuery } from "@tanstack/react-query"
import getShortUrl from "../actions/getShortUrl"

export default function useGoToShortPage(short_url: string) {
    const { error, fetchStatus } = useQuery({
        queryKey: ['url'],
        queryFn: () => getShortUrl(short_url),
        enabled: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    })
    const isLoading = fetchStatus === "fetching"
    
    return { error, isLoading }
}
