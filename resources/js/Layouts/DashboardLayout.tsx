import {Fragment, PropsWithChildren, ReactNode, useEffect, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    FolderIcon,
    HomeIcon, InboxIcon, QuestionMarkCircleIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import {cn} from "@/lib/utils";
import {User} from "@/types";
import ApplicationLogo from "@/Components/ApplicationLogo";
import {Link} from "@inertiajs/react";
import {LogOutIcon, MessageCircleIcon, Terminal} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/Components/ui/card";
import GoBack from "@/Components/GoBack";
import {animeAtom, authUser, sidebarOpenState} from "@/store/DashboardLayoutState";
import {useAtom, useAtomValue, useSetAtom} from 'jotai'
import Dump from "@/Components/Dump";

const adminNavigations = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
    { name: 'Blog Posts', href: '/posts', icon: UsersIcon, current: false },
    { name: 'Properties', href: '/properties', icon: FolderIcon, current: false },
    { name: "Faqs", href: "/faqs", icon: QuestionMarkCircleIcon, current: false },
    { name: "Testimonials", href: "/testimonials", icon: MessageCircleIcon, current: false },
    { name: "Contacts Messages", href: "/contact-messages", icon: MessageCircleIcon, current: false },
    { name: "Inbox", href: "/inbox", icon: InboxIcon, current: false },
]

const propertyAgentNavigations = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
    { name: 'Properties', href: '/properties', icon: FolderIcon, current: false },
    { name: "Inbox", href: "/inbox", icon: InboxIcon, current: false },
]

const editorNavigations = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
    { name: 'Blog Posts', href: '/posts', icon: UsersIcon, current: false },
]

export default function DashboardLayout({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {
    const [anime, setAnime] = useAtom(animeAtom)
    const [open, setOpen] = useAtom(sidebarOpenState)
    const setAuthUser = useSetAtom(authUser)


    useEffect(() => {
        if(user){
            setAuthUser(user)
        }
    }, [user]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">

            <Sidebar
                sidebarOpen={open}
                setSidebarOpen={setOpen}
            />

            <Navbar setSidebarOpen={setOpen} />

            <main className="lg:pl-72 lg:pt-0">
                <div className="">
                    {header || null}
                    {children}
                </div>
            </main>
        </div>
    )
}

export function PageHeader({ title, action }: { title: any, action?: any }) {
    return (
        <Card className={`rounded-none border-none`}>
            <CardHeader>
                <div className={`flex items-center justify-between`}>
                    <div className={`flex items-center gap-4`}>
                        <GoBack />

                        <CardTitle>{title}</CardTitle>
                    </div>
                    {action}
                </div>
            </CardHeader>
        </Card>
    )
}


export function Navbar({ setSidebarOpen }: { setSidebarOpen: (value: boolean) => void}) {
    return (
        <>
            <NavbarMobile setSidebarOpen={setSidebarOpen}/>
        </>
    )
}

export function NavbarMobile({ setSidebarOpen }: { setSidebarOpen: (value: boolean) => void}) {
    return (
        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
            <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                    onClick={() => setSidebarOpen(true)}>
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
            </button>
            <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">Dashboard</div>
            <a href="#">
                <span className="sr-only">Your profile</span>
                <img
                    className="h-8 w-8 rounded-full bg-gray-50"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                />
            </a>
        </div>
    )
}

export function Sidebar({sidebarOpen, setSidebarOpen}: {
    sidebarOpen: boolean,
    setSidebarOpen: (value: boolean) => void,
}) {
    return (
        <>
            <SidebarMobile/>

            {/* Static sidebar for desktop */}
            <SidebarDesktop/>
        </>
    )
}

function SidebarAuthUserContent({ user }: {user: any}) {
    return (
        <div className="mt-auto">
            <div className={`flex items-center justify-between gap-4`}>
                <Link
                    href={route('profile.edit')}
                    className="flex items-center gap-x-4 py-3 text-sm font-semibold leading-6"
                >
                    <img
                        className="h-8 w-8 rounded-full bg-gray-800"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true" className={`flex flex-col`}>
                        <span>{user?.name}</span>
                        <span className={`text-xs text-gray-500`}>{user?.email}</span>
                    </span>
                </Link>

                <Link
                    href={route('logout')} method="post"
                    className={'bg-gray-50 hover:bg-red-100 p-2 rounded'}
                    as={'button'}
                >
                    <LogOutIcon />
                </Link>
            </div>
        </div>
    );
}

export function SidebarMobile() {
    const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenState)
    const user = useAtomValue(authUser)
    let navigations: any[] = []

    if(user?.role === 'ADMIN'){
        navigations = adminNavigations
    }else if(user?.role === 'EDITOR'){
        navigations = editorNavigations
    }else if(user?.role === 'PROPERTY_AGENT'){
        navigations = propertyAgentNavigations
    }

    return (
        <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-900/80"/>
                </Transition.Child>

                <div className="fixed inset-0 flex">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                        <span className="sr-only">Close sidebar</span>
                                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </Transition.Child>

                            {/* Sidebar component, swap this element with another sidebar if you like */}
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                                <div className="flex h-16 shrink-0 items-center">

                                    <Link href="/">
                                        <ApplicationLogo
                                            className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200"/>
                                    </Link>

                                </div>

                                <SidebarNavigations navigations={navigations}/>

                                <SidebarAuthUserContent user={user} />
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export function SidebarNavigations({navigations}: { navigations: any[] }) {
    return (
        <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                    <ul role="list" className="-mx-2 space-y-1">

                        {  }

                        {navigations.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        item.current
                                            ? 'bg-gray-50 text-indigo-600'
                                            : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                    )}
                                >
                                    <item.icon
                                        className={cn(
                                            item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                            'h-6 w-6 shrink-0'
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </nav>
    )
}

export function SidebarDesktop() {
    const user = useAtomValue(authUser)
    let navigations: any[] = []

    if(user?.role === 'ADMIN'){
        navigations = adminNavigations
    }else if(user?.role === 'EDITOR'){
        navigations = editorNavigations
    }else if(user?.role === 'PROPERTY_AGENT'){
        navigations = propertyAgentNavigations
    }

    return (
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            {/*<Dump data={user} />*/}
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
                <div className="flex h-16 shrink-0 items-center">
                    <Link href="/">
                        <ApplicationLogo
                            className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200"/>
                    </Link>
                </div>

                <SidebarNavigations navigations={navigations}/>

                <SidebarAuthUserContent user={user} />
            </div>
        </div>
    )
}

export function DashboardContainer({ children, className }: { children: ReactNode, className?: string }){
    return (
        <div className={cn(
            `mx-auto max-w-7xl sm:px-6 lg:px-8`,
            className
        )}>
            {children}
        </div>
    );
}
