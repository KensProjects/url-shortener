import { Button } from '@/components/ui/button'
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import Link from 'next/link'

export default function FetchedUrlTable({ original_url, shortened_url }: { original_url: string, shortened_url: string }) {

    const tableHeadStyling = "bg-blue-700 text-white"
    return (
        <Table >
            <TableCaption>URL successfully found.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className={tableHeadStyling}>Original URL</TableHead>
                    <TableHead className={tableHeadStyling}>Shortened URL</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <Button variant={'outline'} asChild>
                            <Link href={original_url} target='_blank'>{original_url}</Link>
                        </Button>

                    </TableCell>
                    <TableCell>
                        <Button variant={'outline'} asChild>
                            <Link href={shortened_url} target='_blank'>{shortened_url}</Link>
                        </Button>

                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}
