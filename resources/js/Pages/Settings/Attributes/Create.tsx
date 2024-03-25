import DashboardLayout, {PageHeader} from "@/Layouts/DashboardLayout";
import {PageProps} from "@/types";
import {Head} from "@inertiajs/react";
import AttributeCreateForm from "@/Components/Settings/Attributes/AttributeCreateForm";

export default function AttributeCreatePage({ auth }: PageProps){
    return (
        <DashboardLayout user={auth.user} header={<PageHeader title={'Add Attribute'} /> }>
            <Head title="Add Attribute" />

            <div className={`p-5`}>
                <AttributeCreateForm />
            </div>
        </DashboardLayout>
    );
}
