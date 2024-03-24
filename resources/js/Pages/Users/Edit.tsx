import DashboardLayout, {DashboardContainer, PageHeader} from "@/Layouts/DashboardLayout";
import {PageProps} from "@/types";
import {Head} from "@inertiajs/react";
import UserEditForm from "@/Components/User/UserEditForm";

export default function UserEditPage({ auth, user, roles }: PageProps<{user: any, roles: string []}>){
    return (
        <DashboardLayout user={auth.user} header={<PageHeader title={'Edit User'} /> }>
            <Head title={`Edit User`} />

            <div className={`p-5`}>
                <UserEditForm user={user} roles={roles}/>
            </div>
        </DashboardLayout>
    );
}
