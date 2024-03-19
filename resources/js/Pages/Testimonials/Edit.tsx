import DashboardLayout, {DashboardContainer, PageHeader} from "@/Layouts/DashboardLayout";
import {PageProps} from "@/types";
import {Head} from "@inertiajs/react";
import TestimonialEditForm from "@/Components/Testimonial/TestimonialEditForm";

export default function FaqEditPage({ auth, testimonial }: PageProps<{testimonial: any}>){
    return (
        <DashboardLayout user={auth.user} header={<PageHeader title={'Edit Testimonial'} /> }>
            <Head title="Edit Testimonial" />

            <div className={`p-5`}>
                <TestimonialEditForm testimonial={testimonial}/>
            </div>
        </DashboardLayout>
    );
}
