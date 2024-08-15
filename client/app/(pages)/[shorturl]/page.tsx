'use client'

import useGoToShortPage from "@/app/hooks/useGoToShortPage"

export default function ShortUrlPage({ params }: { params: { short_url: string } }) {

    const srt_url = params.short_url

    const { error, isLoading } = useGoToShortPage(srt_url)

    if (error) {
        return <pre>{JSON.stringify(error)}</pre>
    }

    if (isLoading) return <p>Loading</p>

}
