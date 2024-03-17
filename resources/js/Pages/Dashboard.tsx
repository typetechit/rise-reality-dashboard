import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import DashboardLayout, {DashboardContainer, PageHeader} from "@/Layouts/DashboardLayout";
import DashboardStats from "@/Components/Dashboard/DashboardStats";

export default function Dashboard({ auth }: PageProps) {
    return (
        <DashboardLayout
            user={auth.user}
            header={<PageHeader title={'Dashboard'} />}
        >
            <Head title="Dashboard" />

            <DashboardContainer className={'mt-10'}>
                <DashboardStats />
            </DashboardContainer>

        </DashboardLayout>
    );
}
