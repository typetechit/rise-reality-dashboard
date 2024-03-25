import { FormEventHandler } from 'react';
import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import {Input} from "@/Components/ui/input";
import {Button} from "@/Components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/Components/ui/card";
import {Label} from "@/Components/ui/label";
import Select from "react-select";
import Dump from "@/Components/Dump";

export default function CategoryEditForm({ category, categoryTypes, attributeTypes }: { category: any, categoryTypes: any[], attributeTypes: any[] }) {
    const { data, setData, patch, processing, progress, errors, reset } = useForm({
        name: category?.name,
        type: category?.type,
        attributes: category?.attributes || []
    });

    const selectedCategory = categoryTypes[categoryTypes.findIndex(item => item.value === category.type)]

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('settings.categories.update', {category: category?.id}));
    };

    return (
        <Card>

            <CardHeader>
                <CardTitle>Edit Category</CardTitle>
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
                            defaultValue={selectedCategory}
                            options={categoryTypes}
                            onChange={(item: any) => setData('type', item.value)}
                        />

                        <InputError
                            message={errors.type}
                            className="mt-2"
                        />
                    </div>

                    {/* Input: Attributes */}
                    <div>
                        <Label htmlFor="Attributes">Attributes</Label>
                        <Select
                            id={`attributes`}
                            name={'attributes'}
                            isMulti={true}
                            isClearable={true}
                            defaultValue={data.attributes?.map((item: any) => ({...item, value: item.id, label: item.name}))}
                            options={attributeTypes}
                            onChange={(item: any) => setData('attributes', item)}
                        />

                        <InputError
                            message={errors.attributes}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center">
                        <Button disabled={processing}>
                            {processing ? "Updating..." : "Update Category"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
