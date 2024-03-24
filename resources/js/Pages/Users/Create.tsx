import DashboardLayout, { PageHeader} from "@/Layouts/DashboardLayout";
import {PageProps} from "@/types";
import {Head} from "@inertiajs/react";
import UserCreateForm from "@/Components/User/UserCreateForm";

export default function UserCreatePage({ auth, roles }: PageProps<{ roles: string[] }>){
    return (
        <DashboardLayout user={auth.user} header={<PageHeader title={'Add User'} /> }>
            <Head title="Add User" />

            <div className={`p-5`}>
                <UserCreateForm roles={roles}/>
            </div>
        </DashboardLayout>
    );
}
