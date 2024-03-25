import DashboardLayout, {PageHeader} from "@/Layouts/DashboardLayout";
import {PageProps} from "@/types";
import {Head} from "@inertiajs/react";
import AmenityEditForm from "@/Components/Settings/Amenities/AmenityEditForm";

export default function AmenityEditPage({ auth, amenity}: PageProps<{amenity: any}>){
    return (
        <DashboardLayout user={auth.user} header={<PageHeader title={'Edit Attribute'} /> }>
            <Head title={`Edit Attribute`} />

            <div className={`p-5`}>
                <AmenityEditForm
                    amenity={amenity}
                />
            </div>
        </DashboardLayout>
    );
}
