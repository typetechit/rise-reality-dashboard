import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import DashboardLayout, {PageHeader} from "@/Layouts/DashboardLayout";
import PropertiesDataTable from "@/Components/Properties/PropertiesDataTable";
import PropertyCreateForm from "@/Components/Properties/PropertyCreateForm";

export default function PropertiesIndexPage({ auth, properties }: PageProps<{properties: any}>) {
    return (
        <DashboardLayout
            user={auth.user}
            header={<PageHeader title={'Add new Property'}/>}
        >
            <Head title="Add new Property"/>

            <div className={`p-5`}>
                <PropertyCreateForm />
            </div>
        </DashboardLayout>
    );
}
