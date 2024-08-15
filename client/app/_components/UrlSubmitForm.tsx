"use client"

import { Button } from "@/components/ui/button"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import useCheckExistingUrl from "../hooks/useCheckExistingUrl"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import FetchedUrlTable from "./FetchedUrlTable"
import { env } from "@/env"

export default function UrlSubmitForm() {

    const formSchema = z.object({
        url: z.string().url(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: "",
        },
    })
    const formUrl = form.getValues().url

    const { urlQuery, checkForExistingUrl } = useCheckExistingUrl(formUrl)

    const shortedUrlHref = `${env.NEXT_PUBLIC_BASE_URL}/${urlQuery?.shortened_url}`
    const originalUrlHref = urlQuery?.original_url as string

    async function onSubmit() {
        checkForExistingUrl()
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>URL Shortener</CardTitle>
                <CardDescription>Shorten your URLs!</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center items-center w-full">
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>URL Shortener</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter URL here..." {...field} className="w-full" type="url" />
                                    </FormControl>
                                    <FormDescription>
                                        Enter URL to be shortened.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
            {urlQuery &&
                <CardFooter>

                    <FetchedUrlTable original_url={originalUrlHref} shortened_url={shortedUrlHref} />
                </CardFooter>
            }
        </Card>
    )
}