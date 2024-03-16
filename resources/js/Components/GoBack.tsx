import {Link, usePage} from "@inertiajs/react";
import {ArrowLeftCircleIcon} from "@heroicons/react/24/solid";

export default function GoBack(){
    let pageProps: any = usePage()?.props
    let urlPrevious = pageProps?.urlPrevious

    return (
        <Link href={urlPrevious}>
            <ArrowLeftCircleIcon className={`w-5 h-5 text-gray-500`} />
        </Link>
    )
}
