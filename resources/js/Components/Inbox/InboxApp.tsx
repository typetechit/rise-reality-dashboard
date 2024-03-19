import {Menu, Transition} from "@headlessui/react";
import {EllipsisVerticalIcon} from "@heroicons/react/20/solid";
import {Fragment, useEffect} from "react";
import {cn} from "@/lib/utils";

import {useAtomValue} from "jotai";
import {messagesState, messageState} from "@/Components/Inbox/InboxAppState";

export default function InboxApp(){
    return (
        <div className={`min-h-screen overflow-hidden`}>
            <div className="min-w-0 flex-1 border-t border-gray-200 xl:flex">
                <section
                    aria-labelledby="message-heading"
                    className="flex h-full min-w-0 flex-1 flex-col overflow-hidden xl:order-last"
                >
                    {/* Inbox Toolbar */}
                    {/*<InboxToolbar/>*/}

                    {/* Inbox Content */}
                    <InboxContent/>
                </section>

                {/* Message list*/}
                <InboxSidebar/>
            </div>
        </div>
    )
}


function InboxContent() {
    const message = useAtomValue(messageState)

    return (
        <>
            <div className="min-h-0 flex-1 overflow-y-auto">
                <div className="bg-white pb-6 pt-5 shadow">
                    <div className="px-4 sm:flex sm:items-baseline sm:justify-between sm:px-6 lg:px-8">
                        <div className="sm:w-0 sm:flex-1">
                            <h1 id="message-heading" className="text-lg font-medium text-gray-900">
                                {message.subject}
                            </h1>
                            <p className="mt-1 truncate text-sm text-gray-500">{message.sender}</p>
                        </div>

                        <div
                            className="mt-4 flex items-center justify-between sm:ml-6 sm:mt-0 sm:flex-shrink-0 sm:justify-start">
                      <span
                          className="inline-flex items-center rounded-full bg-cyan-100 px-3 py-0.5 text-sm font-medium text-cyan-800">
                        {message.status}
                      </span>
                            <Menu as="div" className="relative ml-3 inline-block text-left">
                                <div>
                                    <Menu.Button
                                        className="-my-2 flex items-center rounded-full bg-white p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600">
                                        <span className="sr-only">Open options</span>
                                        <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true"/>
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items
                                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({active}) => (
                                                    <button
                                                        type="button"
                                                        className={cn(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'flex w-full justify-between px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        <span>Copy email address</span>
                                                    </button>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({active}) => (
                                                    <a
                                                        href="#"
                                                        className={cn(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'flex justify-between px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        <span>Previous conversations</span>
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({active}) => (
                                                    <a
                                                        href="#"
                                                        className={cn(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'flex justify-between px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        <span>View original</span>
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>
                {/* Thread section*/}
                <ul role="list" className="space-y-2 py-4 sm:space-y-4 sm:px-6 lg:px-8">
                    {message?.items?.map((item: any) => (
                        <li key={item.id} className="bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6">
                            <div className="sm:flex sm:items-baseline sm:justify-between">
                                <h3 className="text-base font-medium">
                                    <span className="text-gray-900">{item.author}</span>{' '}
                                    <span className="text-gray-600">wrote</span>
                                </h3>
                                <p className="mt-1 whitespace-nowrap text-sm text-gray-600 sm:ml-3 sm:mt-0">
                                    <time dateTime={item.datetime}>{item.date}</time>
                                </p>
                            </div>
                            <div
                                className="mt-4 space-y-6 text-sm text-gray-800"
                                dangerouslySetInnerHTML={{__html: item.body}}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

function InboxSidebar() {
    const messages = useAtomValue(messagesState)

    return (
        <aside className="hidden xl:order-first xl:block xl:flex-shrink-0">
            <div className="relative flex h-full w-96 flex-col border-r border-gray-200 bg-gray-100">
                <div className="flex-shrink-0">
                    <div className="flex h-16 flex-col justify-center bg-white px-6">
                        <div className="flex items-baseline space-x-3">
                            <h2 className="text-lg font-medium text-gray-900">Inbox</h2>
                            <p className="text-sm font-medium text-gray-500">{messages.length} messages</p>
                        </div>
                    </div>
                    <div
                        className="border-b border-t border-gray-200 bg-gray-50 px-6 py-2 text-sm font-medium text-gray-500">
                        Sorted by date
                    </div>
                </div>
                <nav aria-label="Message list" className="min-h-[870px] max-h-[870px] flex-1 overflow-y-auto">
                    <ul role="list" className="divide-y divide-gray-200 border-b border-gray-200">
                        {messages?.map((message: any) => (
                            <li
                                key={message.id}
                                className="relative bg-white px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 hover:bg-gray-50"
                                onClick={() => alert("Coming soon...")}
                            >
                                <div className="flex justify-between space-x-3">
                                    <div className="min-w-0 flex-1">
                                        <a href={message.href} className="block focus:outline-none">
                                            <span className="absolute inset-0" aria-hidden="true"/>
                                            <p className="truncate text-sm font-medium text-gray-900">{message.sender}</p>
                                            <p className="truncate text-sm text-gray-500">{message.subject}</p>
                                        </a>
                                    </div>
                                    <time
                                        dateTime={message.datetime}
                                        className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500"
                                    >
                                        {message.date}
                                    </time>
                                </div>
                                <div className="mt-1">
                                    <p className="line-clamp-2 text-sm text-gray-600">{message.preview}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
