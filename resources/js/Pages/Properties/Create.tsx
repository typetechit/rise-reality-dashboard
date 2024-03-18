import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import DashboardLayout, {PageHeader} from "@/Layouts/DashboardLayout";
import PropertiesDataTable from "@/Components/Properties/PropertiesDataTable";
import PropertyCreateForm from "@/Components/Properties/PropertyCreateForm";

export default function PropertyCreatePage({
                                               auth,
                                               listingTypes,
                                               amenities,
                                               categories
}: PageProps<{properties: any, listingTypes: any[], amenities: any[], categories: any[]}>) {
    return (
        <DashboardLayout
            user={auth.user}
            header={<PageHeader title={'Add new Property'}/>}
        >
            <Head title="Add new Property"/>

            <div className={`p-5`}>
                <PropertyCreateForm
                    listingTypes={listingTypes.map(item => ({...item, value: item, label: item}))}
                    amenityTypes={amenities.map(item => ({...item, value: item.name, label: item.name}))}
                    categories={categories.map(item => ({...item, value: item.name, label: item.name}))}
                />
            </div>
        </DashboardLayout>
    );
}
