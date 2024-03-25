import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import DashboardLayout, {PageHeader} from "@/Layouts/DashboardLayout";
import AttributesDataTable from "@/Components/Settings/Attributes/AttributesDataTable";


export default function AttributesIndexPage({ auth, attributes }: PageProps<{attributes: any}>) {
    return (
        <DashboardLayout
            user={auth.user}
            header={<PageHeader title={'Attributes'} />}
        >
            <Head title="Attributes" />

            <div className={`p-5`}>
                <AttributesDataTable attributes={attributes} />
            </div>

        </DashboardLayout>
    );
}
