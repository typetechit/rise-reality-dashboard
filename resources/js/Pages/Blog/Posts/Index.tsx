import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import DashboardLayout, {PageHeader} from "@/Layouts/DashboardLayout";
import PostsDataTable from "@/Components/Blog/PostsDataTable";

export default function PostsIndexPage({ auth, posts }: PageProps<{posts: any}>) {
    return (
        <DashboardLayout
            user={auth.user}
            header={<PageHeader title={'Blog Posts'}/>}
        >
            <Head title="Blog Posts" />

            <div className={`p-5`}>
                <PostsDataTable posts={posts} />
            </div>
        </DashboardLayout>
    );
}
