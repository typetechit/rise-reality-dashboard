import DashboardLayout, {DashboardContainer, PageHeader} from "@/Layouts/DashboardLayout";
import {PageProps} from "@/types";
import {Head} from "@inertiajs/react";
import CategoryCreateForm from "@/Components/Settings/Categories/CategoryCreateForm";

export default function CategoryCreatePage({ auth, categoryTypes }: PageProps<{categoryTypes: string[]}>){
    const categoryTypeOptions = categoryTypes.map(item => ({label: item, value: item}))
    return (
        <DashboardLayout user={auth.user} header={<PageHeader title={'Add Category'} /> }>
            <Head title="Add Category" />

            <div className={`p-5`}>
                <CategoryCreateForm categoryTypes={categoryTypeOptions} />
            </div>
        </DashboardLayout>
    );
}
