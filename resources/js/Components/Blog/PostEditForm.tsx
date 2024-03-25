import { useEffect, FormEventHandler, useRef } from "react";
import InputError from "@/Components/InputError";
import { Head, Link, useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Switch } from "@/Components/ui/switch";
import { Label } from "@/Components/ui/label";
import Dump from "@/Components/Dump";
import VideoLinksInput from "@/Components/ui/VideoLinksInput";
import { MDXEditorMethods } from "@mdxeditor/editor";
import ReachText from "@/Components/ui/reachtext";

export default function PostEditForm({ post: PostData }: { post: any }) {
    const editorRef = useRef<MDXEditorMethods | null>(null);
    const { data, setData, post, processing, progress, errors, reset } =
        useForm({
            title: PostData?.title,
            description: PostData?.description,
            featured_image: null,
            is_published: PostData?.is_published,
            _method: "PUT",
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("posts.update", { post: PostData?.id }));
    };

    return (
        <Card>
            <div className={`shadow-2xl`}>
                <img
                    src={PostData.featured_image}
                    className="object-cover max-h-[400px] w-full"
                    alt={PostData.title}
                />
            </div>

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
                            onChange={(e) => setData("title", e.target.value)}
                        />

                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    {/* Input: Description */}
                    <div>
                        <Label htmlFor="description">Description</Label>

                        {/* <Textarea
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={(e: any) =>
                                setData("description", e.target.value)
                            }
                        /> */}
                        <ReachText
                            markdown={data.description}
                            editorRef={editorRef}
                            onChange={() =>
                                setData(
                                    "description",

                                    editorRef.current?.getMarkdown()
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
                                checked={data.is_published}
                                onCheckedChange={(value) =>
                                    setData("is_published", value)
                                }
                            />
                        </div>
                    </div>

                    {progress && (
                        <progress value={progress.percentage} max="100">
                            {progress.percentage}%
                        </progress>
                    )}

                    <div className="flex items-center">
                        <Button disabled={processing}>
                            {processing ? "Updating..." : "Update Post"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
