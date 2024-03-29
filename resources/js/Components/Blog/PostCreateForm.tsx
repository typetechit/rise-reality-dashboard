import { useEffect, FormEventHandler, useState, useRef } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Switch } from "@/Components/ui/switch";
import { Label } from "@/Components/ui/label";
import Dump from "@/Components/Dump";
import { MinusIcon } from "@heroicons/react/24/solid";
import { MinusCircle, PlusCircle } from "lucide-react";
import VideoLinksInput from "@/Components/ui/VideoLinksInput";
import ReachText from "../ui/reachtext";
import { MDXEditorMethods } from "@mdxeditor/editor";
import InputDate from "@/Components/ui/InputDate";

export default function PostCreateForm() {
    const editorRef = useRef<MDXEditorMethods | null>(null);
    const {
        data,
        setData,
        setError,
        progress,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        title: "",
        description: "",
        featured_image: null,
        is_published: false,
        published_at: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("posts.store"));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create new Post</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className={`flex flex-col gap-5`}>
                    {/* Input: Title */}
                    <div>
                        <Label htmlFor="title">Title</Label>

                        <Input
                            id="title"
                            type="text"
                            name="title"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                        />

                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    {/* Input: Description */}
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <ReachText
                            markdown={data.description}
                            editorRef={editorRef}
                            onChange={() =>
                                setData(
                                    "description",

                                    editorRef.current
                                        ? editorRef.current.getMarkdown()
                                        : ""
                                )
                            }
                        />

                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>

                    {/* Input: Featured Image */}
                    <div>
                        <Label htmlFor="featured_image">Featured Image</Label>

                        <Input
                            id="featured_image"
                            type="file"
                            name="featured_image"
                            accept={`image/png, image/gif, image/jpeg,  image/webp`}
                            onChange={(e: any) =>
                                setData("featured_image", e.target.files[0])
                            }
                        />

                        <InputError
                            message={errors.featured_image}
                            className="mt-2"
                        />
                    </div>

                    {/* Input: Is Published */}
                    <div>
                        <div className="flex flex-col gap-4">
                            <Label
                                htmlFor="is_published"
                                className={`flex-grow cursor-pointer`}
                            >
                                Published
                            </Label>
                            <Switch
                                id="is_published"
                                onCheckedChange={(value) =>
                                    setData("is_published", value)
                                }
                            />
                        </div>
                    </div>

                    {/* Input: Published At */}
                    <div>
                        <div className="flex flex-col gap-4">
                            <Label
                                htmlFor="published_at"
                                className={`flex-grow cursor-pointer`}
                            >
                                Published Date
                            </Label>

                            <InputDate
                                defaultValue={new Date()}
                                onChange={(date) =>
                                    setData("published_at", date)
                                }
                            />

                            <InputError
                                message={errors.published_at}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    {progress && (
                        <progress value={progress.percentage} max="100">
                            {progress.percentage}%
                        </progress>
                    )}

                    <div className="flex items-center">
                        <Button disabled={processing}>Create Post</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
