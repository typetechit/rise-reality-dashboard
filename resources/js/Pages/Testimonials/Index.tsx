import {PageProps} from "@/types";
import DashboardLayout, {DashboardContainer, PageHeader} from "@/Layouts/DashboardLayout";
import {Head} from "@inertiajs/react";
import FaqsDataTable from "@/Components/FAQ/FaqsDataTable";
import TestimonialsDataTable from "@/Components/Testimonial/TestimonialsDataTable";

export default function TestimonialsIndexPage({ auth, testimonials }: PageProps<{testimonials: any}>){
    return (
        <DashboardLayout
            user={auth.user}
            header={<PageHeader title={'Testimonials'} />}
        >
            <Head title={'Testimonials'} />

            <DashboardContainer className={`mt-10`}>
                <TestimonialsDataTable faqs={testimonials} />
            </DashboardContainer>
        </DashboardLayout>
    )
}
