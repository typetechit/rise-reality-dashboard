import {PageProps} from "@/types";
import DashboardLayout, {DashboardContainer, PageHeader} from "@/Layouts/DashboardLayout";
import {Head} from "@inertiajs/react";
import FaqsDataTable from "@/Components/FAQ/FaqsDataTable";

export default function FaqsIndexPage({ auth, faqs }: PageProps<{faqs: any}>){
    return (
        <DashboardLayout
            user={auth.user}
            header={<PageHeader title={'FAQ'} />}
        >
            <Head title={'Faq'} />

            <DashboardContainer className={`mt-10`}>
                <FaqsDataTable faqs={faqs} />
            </DashboardContainer>
        </DashboardLayout>
    )
}
