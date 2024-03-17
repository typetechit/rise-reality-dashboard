import {useEffect, FormEventHandler, useState, useRef} from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import {Card, CardContent, CardHeader, CardTitle} from "@/Components/ui/card";
import ContentEditor from "@/Components/ContentEditor";
import Dump from "@/Components/Dump";
import HTMLDisplay from "@/Components/HTMLDisplay";
import '@mdxeditor/editor/style.css'
import {MDXEditor, headingsPlugin, MDXEditorMethods} from "@mdxeditor/editor";
import Markdown from "react-markdown";
import {Input} from "@/Components/ui/input";
import {Label} from "@/Components/ui/label";
import {Textarea} from "@/Components/ui/textarea";
import {Button} from "@/Components/ui/button";
import {Switch} from "@/Components/ui/switch";

export default function PropertyCreateForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        content: '',
        featured_image: null,
        is_published: false,
        price: 0,
        location: '',
        mls_code: '',
        build_year: '',
        property_size: '',
        is_featured: false,
        listing_type: '',
        amenities: []
    });

    const [editorContent, setEditorContent] = useState("")

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('properties.store'));
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Add new Property</CardTitle>
                </CardHeader>

                <CardContent>

                    <form onSubmit={submit} className={`flex flex-col gap-4`}>
                        {/* Input: Title */}
                        <div>
                            <Label htmlFor="title">Title</Label>

                            <Input
                                id="title"
                                name="title"
                                value={data.title}
                                className="mt-1 block w-full"
                                autoComplete="username"
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
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData('description', e.target.value)}
                            />

                            <InputError message={errors.description} className="mt-2"/>
                        </div>

                        {/* Input: Content */}
                        <div>
                            <Label htmlFor="content">Content</Label>

                            <Textarea
                                id="content"
                                name="content"
                                value={data.content}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData('content', e.target.value)}
                            />

                            <InputError message={errors.content} className="mt-2"/>
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
                                    onCheckedChange={(value) => setData('is_published', value)} />
                            </div>
                        </div>

                        <div className="flex items-center mt-4">
                            <Button disabled={processing}>
                                {processing ? "Adding Property ..." : "Add Property"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

        </>
    );
}
