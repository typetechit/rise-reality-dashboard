import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import DashboardLayout, {PageHeader} from "@/Layouts/DashboardLayout";
import PropertiesDataTable from "@/Components/Properties/PropertiesDataTable";
import PropertyCreateForm from "@/Components/Properties/PropertyCreateForm";
import PropertyEditForm from "@/Components/Properties/PropertyEditForm";

export default function PropertyEditPage({
                                             auth,
                                             property,
                                             listingTypes,
                                             amenities,
                                             categories
}: PageProps<{property: any, properties: any, listingTypes: any[], amenities: any[], categories: any[]}>) {
    return (
        <DashboardLayout
            user={auth.user}
            header={<PageHeader title={'Edit Property'}/>}
        >
            <Head title="Edit Property"/>

            <div className={`p-5`}>
                <PropertyEditForm
                    property={property}
                    listingTypes={listingTypes.map(item => ({value: item, label: item}))}
                    amenityTypes={amenities.map(item => ({...item, value: item.name, label: item.name}))}
                    categories={categories.map(item => ({...item, value: item.name, label: item.name}))}
                />
            </div>
        </DashboardLayout>
    );
}
