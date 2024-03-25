import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import DashboardLayout, {PageHeader} from "@/Layouts/DashboardLayout";
import CategoriesDataTable from "@/Components/Settings/Categories/CategoriesDataTable";


export default function CategoriesIndexPage({ auth, categories }: PageProps<{categories: any}>) {
    const activeTab: any = route()?.params?.tab || ""

    return (
        <DashboardLayout
            user={auth.user}
            header={<PageHeader title={'Settings'} />}
        >
            <Head title="Settings" />

            <div className={`p-5`}>
                <CategoriesDataTable categories={categories} />
            </div>

        </DashboardLayout>
    );
}
