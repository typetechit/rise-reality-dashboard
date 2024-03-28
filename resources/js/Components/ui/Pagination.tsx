import {Button} from "@/Components/ui/button";
import {Link} from "@inertiajs/react";
import * as React from "react";

export default function Pagination({ links }: { links: any[] }) {
    return (
        <div className="space-x-2">

            {links?.map((link: any) => (
                <Button
                    key={`pagination_link_${link}`}
                    variant="outline"
                    size="sm"
                    disabled={!link.active}
                    asChild
                >
                    <Link href={link.url}>{link.label.replace(/&raquo;|&laquo;/g, '')}</Link>
                </Button>
            ))}
        </div>
    )
}
