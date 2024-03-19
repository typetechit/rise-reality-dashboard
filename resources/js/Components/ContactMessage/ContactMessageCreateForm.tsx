import { FormEventHandler } from 'react';
import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import {Input} from "@/Components/ui/input";
import {Button} from "@/Components/ui/button";
import {Textarea} from "@/Components/ui/textarea";
import {Card, CardContent, CardHeader, CardTitle} from "@/Components/ui/card";
import {Label} from "@/Components/ui/label";

export default function ContactMessageCreateForm() {
    const { data, setData, progress, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('contact-messages.store'));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create new Contact Message</CardTitle>
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

                    {/* Input: Email */}
                    <div>
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e: any) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2"/>
                    </div>

                    {/* Input: Subject */}
                    <div>
                        <Label htmlFor="subject">Subject</Label>

                        <Input
                            id="subject"
                            type="subject"
                            name="subject"
                            value={data.subject}
                            onChange={(e: any) => setData('subject', e.target.value)}
                        />

                        <InputError message={errors.subject} className="mt-2"/>
                    </div>

                    {/* Input: Message */}
                    <div>
                        <Label htmlFor="message">Message</Label>

                        <Textarea
                            id="message"
                            name="message"
                            value={data.message}
                            onChange={(e: any) => setData('message', e.target.value)}
                        />

                        <InputError message={errors.message} className="mt-2"/>
                    </div>

                    <div className="flex items-center">
                        <Button disabled={processing}>
                            Create Contact Message
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
