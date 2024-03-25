import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import DashboardLayout, {PageHeader} from "@/Layouts/DashboardLayout";
import AmenitiesDataTable from "@/Components/Settings/Amenities/AmenitiesDataTable";


export default function AttributesIndexPage({ auth, amenities }: PageProps<{amenities: any}>) {
    return (
        <DashboardLayout
            user={auth.user}
            header={<PageHeader title={'Amenities'} />}
        >
            <Head title="Amenities" />

            <div className={`p-5`}>
                <AmenitiesDataTable amenities={amenities} />
            </div>

        </DashboardLayout>
    );
}
