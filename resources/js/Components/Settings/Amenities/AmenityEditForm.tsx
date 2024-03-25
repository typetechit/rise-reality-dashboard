import { FormEventHandler } from 'react';
import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import {Input} from "@/Components/ui/input";
import {Button} from "@/Components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/Components/ui/card";
import {Label} from "@/Components/ui/label";
import Select from "react-select";

export default function AmenityEditForm({ amenity }: { amenity: any }) {
    const { data, setData, patch, processing, progress, errors, reset } = useForm({
        name: amenity?.name || "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('settings.amenities.update', {amenity: amenity?.id}));
    };

    return (
        <Card>

            <CardHeader>
                <CardTitle>Edit Amenity</CardTitle>
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

                    <div className="flex items-center">
                        <Button disabled={processing}>
                            {processing ? "Updating..." : "Update Amenity"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
