import { useEffect, FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import Dump from "@/Components/Dump";

export default function TestimonialEditForm({
    testimonial,
}: {
    testimonial: any;
}) {
    const { data, setData, progress, post, processing, errors, reset } =
        useForm({
            name: testimonial?.name || "",
            position: testimonial?.position || "",
            company: testimonial?.company || "",
            image: null,
            comment: testimonial?.comment || "",
            _method: "PUT",
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("testimonials.update", { testimonial: testimonial.id }));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Testimonial</CardTitle>
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
                            onChange={(e: any) =>
                                setData("name", e.target.value)
                            }
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    {/* Input: Position */}
                    <div>
                        <Label htmlFor="type">Position</Label>

                        <Input
                            id="position"
                            name="position"
                            value={data.position}
                            onChange={(e: any) =>
                                setData("position", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.position}
                            className="mt-2"
                        />
                    </div>

                    {/* Input: Company */}
                    <div>
                        <Label htmlFor="company">Company</Label>

                        <Input
                            id="company"
                            name="company"
                            value={data.company}
                            onChange={(e: any) =>
                                setData("company", e.target.value)
                            }
                        />

                        <InputError message={errors.company} className="mt-2" />
                    </div>

                    {/* Input: Featured Image */}
                    <div>
                        <Label htmlFor="img">Image</Label>

                        <Input
                            id="image"
                            type="file"
                            name="image"
                            accept={`image/png, image/gif, image/jpeg,  image/webp`}
                            onChange={(e: any) =>
                                setData("image", e.target.files[0])
                            }
                        />

                        <InputError message={errors.image} className="mt-2" />
                    </div>

                    {/* Input: Comment */}
                    <div>
                        <Label htmlFor="comment">Comment</Label>

                        <Textarea
                            id="comment"
                            name="comment"
                            value={data.comment}
                            onChange={(e: any) =>
                                setData("comment", e.target.value)
                            }
                        />

                        <InputError message={errors.comment} className="mt-2" />
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
