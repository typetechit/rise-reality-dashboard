import { FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import Select from "react-select";

export default function CategoryCreateForm({ categoryTypes }: { categoryTypes: any[] }) {
    const {
        data,
        setData,
        setError,
        post,
        processing,
        errors,
    } = useForm({
        name: "",
        type: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("settings.categories.store"));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create new Category</CardTitle>
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

                    {/* Input: Type */}
                    <div>
                        <Label htmlFor="type">Type</Label>

                        <Select
                            id={`type`}
                            name={'type'}
                            options={categoryTypes}
                            onChange={(item: any) => setData('type', item.value)}
                        />

                        <InputError
                            message={errors.type}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center">
                        <Button disabled={processing}>Create Category</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
