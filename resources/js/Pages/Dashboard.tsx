import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import DashboardLayout from "@/Layouts/DashboardLayout";
import DashboardStats from "@/Components/Dashboard/DashboardStats";

export default function Dashboard({ auth }: PageProps) {
    return (
        <DashboardLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <DashboardStats />
            
        </DashboardLayout>
    );
}
