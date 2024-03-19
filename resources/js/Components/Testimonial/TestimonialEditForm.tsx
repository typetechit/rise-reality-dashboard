import { useEffect, FormEventHandler } from 'react';
import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import {Input} from "@/Components/ui/input";
import {Button} from "@/Components/ui/button";
import {Textarea} from "@/Components/ui/textarea";
import {Card, CardContent, CardHeader, CardTitle} from "@/Components/ui/card";
import {Label} from "@/Components/ui/label";

export default function TestimonialEditForm({ testimonial }: { testimonial: any }) {
    const { data, setData, progress, patch, processing, errors, reset } = useForm({
        name: testimonial?.name || "",
        type: testimonial?.type || "",
        image: null,
        description: testimonial?.description || "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('testimonials.update', { testimonial: testimonial.id }));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create new Testimonial</CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={submit} className={`flex flex-col gap-5`}>

                    {/* Input: name */}
                    <div>
                        <Label htmlFor="name">Name</Label>

                        <Input
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e: any) => setData('name', e.target.value)}
                        />

                        <InputError message={errors.name} className="mt-2"/>
                    </div>

                    {/* Input: type */}
                    <div>
                        <Label htmlFor="type">Type</Label>

                        <Input
                            id="type"
                            name="type"
                            value={data.type}
                            onChange={(e: any) => setData('type', e.target.value)}
                        />

                        <InputError message={errors.type} className="mt-2"/>
                    </div>

                    {/* Input: Featured Image */}
                    <div>
                        <Label htmlFor="image">Image</Label>

                        <Input
                            id="image"
                            type="file"
                            name="image"
                            accept={`image/png, image/gif, image/jpeg`}
                            onChange={(e: any) => setData('image', e.target.files[0])}
                        />

                        <InputError message={errors.image} className="mt-2"/>
                    </div>

                    {/* Input: Description */}
                    <div>
                        <Label htmlFor="description">Description</Label>

                        <Textarea
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={(e: any) => setData('description', e.target.value)}
                        />

                        <InputError message={errors.description} className="mt-2"/>
                    </div>

                    <div className="flex items-center">
                        <Button disabled={processing}>
                            Update Testimonial
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
