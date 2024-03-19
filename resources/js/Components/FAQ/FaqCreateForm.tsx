import { useEffect, FormEventHandler } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import DashboardLayout from "@/Layouts/DashboardLayout";
import {Input} from "@/Components/ui/input";
import {Button} from "@/Components/ui/button";
import {Textarea} from "@/Components/ui/textarea";
import {Card, CardContent, CardHeader, CardTitle} from "@/Components/ui/card";
import {Switch} from "@/Components/ui/switch";
import {Label} from "@/Components/ui/label";
import Dump from "@/Components/Dump";

export default function FaqCreateForm() {
    const { data, setData, progress, post, processing, errors, reset } = useForm({
        question: '',
        answer: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('faqs.store'));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create new FAQ</CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={submit} className={`flex flex-col gap-5`}>

                    {/* Input: Question */}
                    <div>
                        <Label htmlFor="question">Question</Label>

                        <Textarea
                            id="question"
                            name="question"
                            value={data.question}
                            onChange={(e: any) => setData('question', e.target.value)}
                        />

                        <InputError message={errors.question} className="mt-2"/>
                    </div>

                    {/* Input: Answer */}
                    <div>
                        <Label htmlFor="answer">Answer</Label>

                        <Textarea
                            id="answer"
                            name="answer"
                            value={data.answer}
                            onChange={(e: any) => setData('answer', e.target.value)}
                        />

                        <InputError message={errors.answer} className="mt-2"/>
                    </div>

                    <div className="flex items-center">
                        <Button disabled={processing}>
                            Create FAQ
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
