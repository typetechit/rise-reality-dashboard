import { useEffect, FormEventHandler } from 'react';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import {Input} from "@/Components/ui/input";
import {Button} from "@/Components/ui/button";
import {Textarea} from "@/Components/ui/textarea";
import {Card, CardContent, CardHeader, CardTitle} from "@/Components/ui/card";
import {Switch} from "@/Components/ui/switch";
import {Label} from "@/Components/ui/label";

export default function PostEditForm({ post }: { post: any }) {
    const { data, setData, patch, processing, progress, errors, reset } = useForm({
        title: post?.title,
        description: post?.description,
        featured_image: null,
        is_published: post?.is_published
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('posts.update', {post: post?.id}));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Post</CardTitle>
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
                            onChange={(e) => setData('title', e.target.value)}
                        />

                        <InputError message={errors.title} className="mt-2"/>
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

                    {/* Input: Featured Image */}
                    <div>
                        <Label htmlFor="featured_image">Featured Image</Label>

                        <Input
                            id="featured_image"
                            type="file"
                            name="featured_image"
                            accept={`image/png, image/gif, image/jpeg`}
                            onChange={(e: any) => setData('featured_image', e.target.files[0])}
                        />

                        <InputError message={errors.title} className="mt-2"/>
                    </div>

                    {/* Input: Is Published */}
                    <div>
                        <div className="flex items-center gap-5">
                            <Label htmlFor="is_published" className={`flex-grow cursor-pointer`}>Published</Label>
                            <Switch
                                id="is_published"
                                checked={data.is_published}
                                onCheckedChange={(value) => setData('is_published', value)} />
                        </div>
                    </div>

                    {progress && (
                        <progress value={progress.percentage} max="100">
                            {progress.percentage}%
                        </progress>
                    )}

                    <div className="flex items-center justify-end mt-4">
                        <Button className="ms-4" disabled={processing}>
                            { processing ? "Updating..." : "Update Post"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
