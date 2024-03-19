import { FormEventHandler } from 'react';
import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import {Input} from "@/Components/ui/input";
import {Button} from "@/Components/ui/button";
import {Textarea} from "@/Components/ui/textarea";
import {Card, CardContent, CardHeader, CardTitle} from "@/Components/ui/card";
import {Label} from "@/Components/ui/label";

export default function TestimonialCreateForm() {
    const { data, setData, progress, post, processing, errors, reset } = useForm({
        name: "",
        type: "",
        img: null,
        description: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('testimonials.store'));
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
                        <Label htmlFor="img">Image</Label>

                        <Input
                            id="img"
                            type="file"
                            name="img"
                            accept={`image/png, image/gif, image/jpeg`}
                            onChange={(e: any) => setData('img', e.target.files[0])}
                        />

                        <InputError message={errors.img} className="mt-2"/>
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
                            Create Testimonial
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
