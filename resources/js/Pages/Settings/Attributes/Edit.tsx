import DashboardLayout, {PageHeader} from "@/Layouts/DashboardLayout";
import {PageProps} from "@/types";
import {Head} from "@inertiajs/react";
import AttributeEditForm from "@/Components/Settings/Attributes/AttributeEditForm";

export default function AttributeEditPage({ auth, attribute}: PageProps<{attribute: any}>){
    return (
        <DashboardLayout user={auth.user} header={<PageHeader title={'Edit Attribute'} /> }>
            <Head title={`Edit Attribute`} />

            <div className={`p-5`}>
                <AttributeEditForm
                    attribute={attribute}
                />
            </div>
        </DashboardLayout>
    );
}
