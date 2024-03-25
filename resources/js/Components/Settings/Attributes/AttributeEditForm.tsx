import { FormEventHandler } from 'react';
import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import {Input} from "@/Components/ui/input";
import {Button} from "@/Components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/Components/ui/card";
import {Label} from "@/Components/ui/label";
import Select from "react-select";

export default function AttributeEditForm({ attribute }: { attribute: any }) {
    const { data, setData, patch, processing, progress, errors, reset } = useForm({
        name: attribute?.name || "",
        icon: attribute?.icon || ""
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('settings.attributes.update', {attribute: attribute?.id}));
    };

    return (
        <Card>

            <CardHeader>
                <CardTitle>Edit Attribute</CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={submit} className={`flex flex-col gap-5`}>

                    {/* Input: Name */}
                    <div>
                        <Label htmlFor="name">Name</Label>

                        <Input
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    {/* Input: Icon */}
                    <div>
                        <Label htmlFor="icon">Icon</Label>

                        <Input
                            id="name"
                            type="text"
                            name="icon"
                            value={data.icon}
                            onChange={(e) => setData("icon", e.target.value)}
                        />

                        <InputError
                            message={errors.icon}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center">
                        <Button disabled={processing}>
                            {processing ? "Updating..." : "Update Attribute"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
