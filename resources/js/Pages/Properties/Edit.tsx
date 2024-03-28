import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import DashboardLayout, {PageHeader} from "@/Layouts/DashboardLayout";
import PropertiesDataTable from "@/Components/Properties/PropertiesDataTable";
import PropertyCreateForm from "@/Components/Properties/PropertyCreateForm";
import PropertyEditForm from "@/Components/Properties/PropertyEditForm";
import Dump from "@/Components/Dump";

export default function PropertyEditPage({
                                             auth,
                                             property,
                                             listingTypes,
                                             amenities,
                                             categories,
                                             agents,

}: PageProps<{property: any, properties: any, listingTypes: any[], amenities: any[], categories: any[], agents: any[]}>) {
    return (
        <DashboardLayout
            user={auth.user}
            header={<PageHeader title={'Edit Property'}/>}
        >
            <Head title="Edit Property"/>

            <div className={`p-5`}>

                <PropertyEditForm
                    property={property}
                    listingTypes={listingTypes?.map(item => ({value: item, label: item}))}
                    amenityTypes={amenities?.map(item => ({...item, value: item.name, label: item.name}))}
                    categories={categories?.map(item => ({...item, value: item.name, label: item.name}))}
                    agents={agents?.map(item => ({...item, value: item.id, label: item.name}))}
                />

            </div>
        </DashboardLayout>
    );
}
