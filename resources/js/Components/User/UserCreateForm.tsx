import {useEffect, FormEventHandler, useState} from 'react';
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
import {MinusIcon} from "@heroicons/react/24/solid";
import {MinusCircle, PlusCircle} from "lucide-react";
import VideoLinksInput from "@/Components/ui/VideoLinksInput";
import Select from "react-select";

export default function UserCreateForm({ roles }: { roles: string[]}) {
    const { data, setData, setError, progress, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        image: '',
        role: '',
        designation: '',
        description: '',
        experience: '',
        location: '',
        practice_area: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('users.store'));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create new Post</CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={submit} className={`flex flex-col gap-5`}>

                    <div className={`grid grid-cols-3 gap-4`}>
                        {/* Input: Name */}
                        <div>
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
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
                                onChange={(e) => setData('email', e.target.value)}
                            />

                            <InputError message={errors.email} className="mt-2"/>
                        </div>

                        {/* Input: Phone */}
                        <div>
                            <Label htmlFor="phone">Phone</Label>

                            <Input
                                id="phone"
                                type="tel"
                                name="phone"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                            />

                            <InputError message={errors.phone} className="mt-2"/>
                        </div>
                    </div>

                    <div className={`grid grid-cols-3 gap-4`}>
                        {/* Input: User Image */}
                        <div>
                            <Label htmlFor="image">Image</Label>

                            <Input
                                id="image"
                                type="file"
                                name="image"
                                accept={`image/png, image/gif, image/jpeg`}
                                onChange={(e: any) => setData('image', e.target.files[0])}
                            />

                            <InputError message={errors.image} className="mt-2"/>
                        </div>

                        {/* Input: Role */}
                        <div>
                            <Label htmlFor="role">Role</Label>

                            <Select
                                id={`role`}
                                name={'role'}
                                options={roles.map(role => ({label: role, value: role}))}
                                onChange={(item: any) => setData('role', item.value)}
                            />

                            <InputError message={errors.role} className="mt-2"/>
                        </div>

                        {/* Input: Designation */}
                        <div>
                            <Label htmlFor="designation">Designation</Label>

                            <Input
                                id="designation"
                                type="text"
                                name="designation"
                                value={data.designation}
                                onChange={(e) => setData('designation', e.target.value)}
                            />

                            <InputError message={errors.designation} className="mt-2"/>
                        </div>
                    </div>


                    <div className={`grid grid-cols-3 gap-4`}>

                        {/* Input: Experience */}
                        <div>
                            <Label htmlFor="experience">Experience</Label>

                            <Input
                                id="experience"
                                type="text"
                                name="experience"
                                value={data.experience}
                                onChange={(e) => setData('experience', e.target.value)}
                            />

                            <InputError message={errors.experience} className="mt-2"/>
                        </div>

                        {/* Input: Location */}
                        <div>
                            <Label htmlFor="location">Location</Label>

                            <Input
                                id="location"
                                type="text"
                                name="location"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                            />

                            <InputError message={errors.location} className="mt-2"/>
                        </div>

                        {/* Input: Practice Area */}
                        <div>
                            <Label htmlFor="practice_area">Practice Area</Label>

                            <Input
                                id="practice_area"
                                type="text"
                                name="practice_area"
                                value={data.practice_area}
                                onChange={(e) => setData('practice_area', e.target.value)}
                            />

                            <InputError message={errors.practice_area} className="mt-2"/>
                        </div>
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

                    <div className={`grid grid-cols-3 gap-4`}>

                        {/* Input: Password */}
                        <div>
                            <Label htmlFor="password">Password</Label>

                            <Input
                                id="password"
                                type="password"
                                name="password"
                                onChange={(e) => setData('password', e.target.value)}
                            />

                            <InputError message={errors.password} className="mt-2"/>
                        </div>

                        {/* Input: Password Confirmation */}
                        <div>
                            <Label htmlFor="password">Password Confirmation</Label>

                            <Input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                            />

                            <InputError message={errors.password_confirmation} className="mt-2"/>
                        </div>

                    </div>

                    {progress && (
                        <progress value={progress.percentage} max="100">
                            {progress.percentage}%
                        </progress>
                    )}

                    <div className="flex items-center">
                        <Button disabled={processing}>
                            Create Post
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
