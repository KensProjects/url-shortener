'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { findUrl } from "../actions/findUrl";

export default function useCheckExistingUrl(url: string) {

    const queryClient = useQueryClient()

    const { data: urlQuery, mutate: checkForExistingUrl, error: urlFetchingError } = useMutation({
        mutationKey: ["url"],
        mutationFn: () => findUrl(url),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['url'] })
    })

    return { urlQuery, checkForExistingUrl, urlFetchingError }
}