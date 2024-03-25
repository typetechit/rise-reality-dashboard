import DashboardLayout, {PageHeader} from "@/Layouts/DashboardLayout";
import {PageProps} from "@/types";
import {Head} from "@inertiajs/react";
import AmenityCreateForm from "@/Components/Settings/Amenities/AmenityCreateForm";

export default function AmenityCreatePage({ auth }: PageProps){
    return (
        <DashboardLayout user={auth.user} header={<PageHeader title={'Add Amenity'} /> }>
            <Head title="Add Amenity" />

            <div className={`p-5`}>
                <AmenityCreateForm />
            </div>
        </DashboardLayout>
    );
}
