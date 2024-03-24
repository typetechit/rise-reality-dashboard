import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import DashboardLayout, {DashboardContainer, PageHeader} from "@/Layouts/DashboardLayout";
import DashboardStats from "@/Components/Dashboard/DashboardStats";
import UsersDataTable from "@/Components/User/UsersDataTable";

export default function UsersIndexPage({ auth, users }: PageProps<{users: any}>) {
    return (
        <DashboardLayout
            user={auth.user}
            header={<PageHeader title={'Users'} />}
        >
            <Head title="Users" />

            <div className={`p-5`}>
                <UsersDataTable users={users}/>
            </div>

        </DashboardLayout>
    );
}
