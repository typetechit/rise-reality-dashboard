import DashboardLayout, {DashboardContainer, PageHeader} from "@/Layouts/DashboardLayout";
import {PageProps} from "@/types";
import {Head} from "@inertiajs/react";
import TestimonialCreateForm from "@/Components/Testimonial/TestimonialCreateForm";

export default function TestimonialCreatePage({ auth }: PageProps){
    return (
        <DashboardLayout user={auth.user} header={<PageHeader title={'Add Testimonial'} /> }>
            <Head title="Add Testimonial" />

            <div className={`p-5`}>
                <TestimonialCreateForm/>
            </div>
        </DashboardLayout>
    );
}
