import { useEffect, FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import { Head, Link, useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import Select from "react-select";
import Dump from "@/Components/Dump";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";

export default function UserEditForm({
    user,
    roles,
}: {
    user: any;
    roles: string[];
}) {
    const roleOptions = roles.map((role) => ({ label: role, value: role }));
    const defaultRole = roleOptions.filter(
        (role) => role.value === user.role
    )[0];
    const { data, setData, post, processing, progress, errors, reset } =
        useForm({
            name: user?.name || "",
            email: user?.email || "",
            image: "",
            role: user?.role || "",
            designation: user?.designation || "",
            description: user?.description || "",
            experience: user?.experience || "",
            location: user?.location || "",
            practice_area: user?.practice_area || "",
            phone: user?.phone || "",
            _method: "put",
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("users.update", { user: user?.id }));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit User</CardTitle>
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
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        {/* Input: Email */}
                        <div>
                            <Label htmlFor="email">Email</Label>

                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        {/* Input: Role */}
                        <div>
                            <Label htmlFor="role">Role</Label>
                            <Select
                                id={`role`}
                                name={"role"}
                                defaultValue={defaultRole}
                                options={roleOptions}
                                onChange={(item: any) =>
                                    setData("role", item.value)
                                }
                            />

                            <InputError
                                message={errors.role}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className={`grid grid-cols-3 gap-4`}>
                        {/* Input: User Image */}
                        <div>
                            <div className={`flex items-center gap-4`}>
                                <Avatar className={`w-12 h-12`}>
                                    <AvatarImage
                                        src={
                                            user?.image ||
                                            "https://github.com/shadcn.png"
                                        }
                                    />
                                    <AvatarFallback>{user.name}</AvatarFallback>
                                </Avatar>

                                <div
                                    className={"flex-grow flex flex-col gap-3"}
                                >
                                    <Label htmlFor="image">Image</Label>

                                    <Input
                                        id="image"
                                        type="file"
                                        name="image"
                                        multiple={false}
                                        accept={`image/png, image/gif, image/jpeg,  image/webp`}
                                        onChange={(e: any) =>
                                            setData("image", e.target.files[0])
                                        }
                                    />
                                </div>

                                <InputError
                                    message={errors.image}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        {/* Input: Phone */}
                        <div>
                            <Label htmlFor="phone">Phone</Label>

                            <Input
                                id="phone"
                                type="tel"
                                name="phone"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.phone}
                                className="mt-2"
                            />
                        </div>

                        {/* Input: Designation */}
                        <div>
                            <Label htmlFor="designation">Designation</Label>

                            <Input
                                id="designation"
                                type="text"
                                name="designation"
                                value={data.designation}
                                onChange={(e) =>
                                    setData("designation", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.designation}
                                className="mt-2"
                            />
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
                                onChange={(e) =>
                                    setData("experience", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.experience}
                                className="mt-2"
                            />
                        </div>

                        {/* Input: Location */}
                        <div>
                            <Label htmlFor="location">Location</Label>

                            <Input
                                id="location"
                                type="text"
                                name="location"
                                value={data.location}
                                onChange={(e) =>
                                    setData("location", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.location}
                                className="mt-2"
                            />
                        </div>

                        {/* Input: Practice Area */}
                        <div>
                            <Label htmlFor="practice_area">Practice Area</Label>

                            <Input
                                id="practice_area"
                                type="text"
                                name="practice_area"
                                value={data.practice_area}
                                onChange={(e) =>
                                    setData("practice_area", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.practice_area}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    {/* Input: Description */}
                    <div>
                        <Label htmlFor="description">Description</Label>

                        <Textarea
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={(e: any) =>
                                setData("description", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>

                    {progress && (
                        <progress value={progress.percentage} max="100">
                            {progress.percentage}%
                        </progress>
                    )}

                    <div className="flex items-center">
                        <Button disabled={processing}>
                            {processing ? "Updating..." : "Update User"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
