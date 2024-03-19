import { useEffect, FormEventHandler } from 'react';
import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import {Input} from "@/Components/ui/input";
import {Button} from "@/Components/ui/button";
import {Textarea} from "@/Components/ui/textarea";
import {Card, CardContent, CardHeader, CardTitle} from "@/Components/ui/card";
import {Label} from "@/Components/ui/label";

export default function ContactMessageEditForm({ contactMessage }: { contactMessage: any }) {
    const { data, setData, progress, patch, processing, errors, reset } = useForm({
        name: contactMessage?.name || "",
        email: contactMessage?.email || "",
        subject: contactMessage?.subject || "",
        message: contactMessage?.message || "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('contact-messages.update', { contact_message: contactMessage.id }));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Contact Message</CardTitle>
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
                            Update Contact Message
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
