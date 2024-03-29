import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import DashboardLayout, {PageHeader} from "@/Layouts/DashboardLayout";
import PropertiesDataTable from "@/Components/Properties/PropertiesDataTable";

export default function PropertiesIndexPage({ auth, properties }: PageProps<{properties: any}>) {
    return (
        <DashboardLayout
            user={auth.user}
            header={<PageHeader title={'Properties'}/>}
        >
            <Head title="PropertiesIndexPage"/>

            <div className={`p-5`}>
                <PropertiesDataTable properties={properties}/>
            </div>
        </DashboardLayout>
    );
}
