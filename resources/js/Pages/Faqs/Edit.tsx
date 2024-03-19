import DashboardLayout, {DashboardContainer, PageHeader} from "@/Layouts/DashboardLayout";
import {PageProps} from "@/types";
import {Head} from "@inertiajs/react";
import FaqCreateForm from "@/Components/FAQ/FaqCreateForm";
import FaqEditForm from "@/Components/FAQ/FaqEditForm";

export default function FaqEditPage({ auth, faq }: PageProps<{faq: any}>){
    return (
        <DashboardLayout user={auth.user} header={<PageHeader title={'Edit FAQ'} /> }>
            <Head title="Edit FAQ" />

            <div className={`p-5`}>
                <FaqEditForm faq={faq}/>
            </div>
        </DashboardLayout>
    );
}
