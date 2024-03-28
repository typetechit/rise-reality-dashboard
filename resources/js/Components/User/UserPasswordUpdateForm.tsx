import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/Components/ui/card";
import {FormEventHandler} from "react";
import {useForm} from "@inertiajs/react";

export default function UserPasswordUpdateForm({ user }: { user: any }) {
    const { data, setData, post, processing, progress, errors, reset } =
        useForm({
            new_password: "",
            new_password_confirmation: "",
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("users.updatePassword", { user: user?.id }));
    };

    return (
        <div className={'my-6'}>
            <Card>
                <CardHeader>
                    <CardTitle>Password Update</CardTitle>
                    <CardDescription>Ensure your account is using a long, random password to stay secure.</CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={submit} >
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="new-password">
                                New Password
                            </label>
                            <Input
                                id="new-password"
                                placeholder="New Password"
                                type="password"
                                onChange={e => setData('new_password', e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-1" htmlFor="confirm-password">
                                Confirm Password
                            </label>
                            <Input
                                id="confirm-password"
                                placeholder="Confirm Password"
                                type="password"
                                name={`new_password_confirmation`}
                                onChange={e => setData('new_password_confirmation', e.target.value)}
                            />
                        </div>

                        <Button type={'submit'}>Save</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

