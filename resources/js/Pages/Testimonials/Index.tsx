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

            <div className={`p-5`}>
                <TestimonialsDataTable testimonials={testimonials}/>
            </div>
        </DashboardLayout>
    )
}
