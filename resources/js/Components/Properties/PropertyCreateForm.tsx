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

export default function PropertyCreateForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
        content: ''
    });

    const [editorContent, setEditorContent] = useState("")

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Add new Property</CardTitle>
                </CardHeader>

                <CardContent>

                    <Markdown>{editorContent}</Markdown>

                    <form onSubmit={submit}>

                        <ContentEditor onChange={setEditorContent} />
                        <div>
                            <InputLabel htmlFor="email" value="Email"/>

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />

                            <InputError message={errors.email} className="mt-2"/>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password"/>

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />

                            <InputError message={errors.password} className="mt-2"/>
                        </div>

                        <div className="block mt-4">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                            </label>
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton className="ms-4" disabled={processing}>
                                Log in
                            </PrimaryButton>
                        </div>
                    </form>
                </CardContent>
            </Card>

        </>
    );
}
