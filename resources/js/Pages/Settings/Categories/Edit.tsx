import DashboardLayout, {PageHeader} from "@/Layouts/DashboardLayout";
import {PageProps} from "@/types";
import {Head} from "@inertiajs/react";
import CategoryEditForm from "@/Components/Settings/Categories/CategoryEditForm";

export default function CategoryEditPage({ auth, category, categoryTypes }: PageProps<{category: any, categoryTypes: string[]}>){
    const categoryTypeOptions = categoryTypes.map(item => ({label: item, value: item}))

    return (
        <DashboardLayout user={auth.user} header={<PageHeader title={'Edit Category'} /> }>
            <Head title={`Edit Category`} />

            <div className={`p-5`}>
                <CategoryEditForm
                    category={category}
                    categoryTypes={categoryTypeOptions}
                />
            </div>
        </DashboardLayout>
    );
}
