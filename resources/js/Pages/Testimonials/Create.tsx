import DashboardLayout, {DashboardContainer, PageHeader} from "@/Layouts/DashboardLayout";
import {PageProps} from "@/types";
import {Head} from "@inertiajs/react";
import TestimonialCreateForm from "@/Components/Testimonial/TestimonialCreateForm";

export default function FaqCreatePage({ auth }: PageProps){
    return (
        <DashboardLayout user={auth.user} header={<PageHeader title={'Add Testimonial'} /> }>
            <Head title="Add Testimonial" />

            <DashboardContainer className={`mt-10`}>
                <TestimonialCreateForm />
            </DashboardContainer>
        </DashboardLayout>
    );
}
