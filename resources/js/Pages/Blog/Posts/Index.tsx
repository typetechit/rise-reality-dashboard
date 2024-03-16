import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import DashboardLayout from "@/Layouts/DashboardLayout";
import Dump from "@/Components/Dump";

export default function PostsIndexPage({ auth, posts }: PageProps<{posts: any}>) {
    return (
        <DashboardLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Blog Posts</h2>}
        >
            <Head title="Blog Posts" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">Blog Posts</div>
                        <Dump data={posts} />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
