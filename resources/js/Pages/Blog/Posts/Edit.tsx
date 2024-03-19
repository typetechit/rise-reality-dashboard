import DashboardLayout, {DashboardContainer, PageHeader} from "@/Layouts/DashboardLayout";
import {PageProps} from "@/types";
import {Head} from "@inertiajs/react";
import PostCreateForm from "@/Components/Blog/PostCreateForm";
import PostEditForm from "@/Components/Blog/PostEditForm";

export default function PostEditPage({ auth, post }: PageProps<{post: any}>){
    return (
        <DashboardLayout user={auth.user} header={<PageHeader title={'Edit Post'} /> }>
            <Head title={`Edit Post`} />

            <div className={`p-5`}>
                <PostEditForm post={post}/>
            </div>
        </DashboardLayout>
    );
}
