import { FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";

export default function AttributeCreateForm() {
    const {
        data,
        setData,
        setError,
        post,
        processing,
        errors,
    } = useForm({
        name: "",
        icon: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("settings.attributes.store"));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create new Attribute</CardTitle>
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
                        <Button disabled={processing}>Create Attribute</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
