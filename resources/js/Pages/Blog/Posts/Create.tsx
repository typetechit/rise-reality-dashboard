import DashboardLayout, {DashboardContainer, PageHeader} from "@/Layouts/DashboardLayout";
import {PageProps} from "@/types";
import {Head} from "@inertiajs/react";
import PostCreateForm from "@/Components/Blog/PostCreateForm";

export default function PostCreatePage({ auth }: PageProps){
    return (
        <DashboardLayout user={auth.user} header={<PageHeader title={'Add Post'} /> }>
            <Head title="Add Post" />

            <div className={`p-5`}>
                <PostCreateForm/>
            </div>
        </DashboardLayout>
    );
}
