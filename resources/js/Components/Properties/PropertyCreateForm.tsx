import InputError from "@/Components/InputError";
import {useForm, usePage} from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import Select from "react-select";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { TrashIcon } from "lucide-react";
import VideoLinksInput from "@/Components/ui/VideoLinksInput";
import { useEffect, FormEventHandler, useState, useRef } from "react";
import { MDXEditorMethods } from "@mdxeditor/editor";
import ReachText from "../ui/reachtext";
import InputDate from "@/Components/ui/InputDate";
import Dump from "@/Components/Dump";
function CategoryAttributeModificationTable({
    attributes,
    onValueChange,
    onRemoveItem,
}: {
    attributes: any[];
    onValueChange: (attribute: any, indexId: any) => void;
    onRemoveItem: (attribute: any, indexId: any) => void;
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]"></TableHead>
                    <TableHead>Attribute Name</TableHead>
                    <TableHead>Attribute Value</TableHead>
                    <TableHead className="text-right w-[100px]"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {attributes.map((attribute, indexId) => (
                    <TableRow key={`attribute.id.${attribute.id}`}>
                        <TableCell className="font-medium">
                            {attribute.icon}
                        </TableCell>
                        <TableCell>{attribute.name}</TableCell>
                        <TableCell>
                            <Input
                                onChange={(e) =>
                                    onValueChange(
                                        { ...attribute, value: e.target.value },
                                        indexId
                                    )
                                }
                            />
                        </TableCell>
                        <TableCell className="text-right">
                            <Button
                                size={"icon"}
                                type={`button`}
                                onClick={() => onRemoveItem(attribute, indexId)}
                            >
                                <TrashIcon className={`w-5 h-5`} />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default function PropertyCreateForm({
    listingTypes,
    amenityTypes,
    categories,
    agents
}: {
    listingTypes: any[];
    amenityTypes: any[];
    categories: any[];
    agents: any[];
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
        content: "",
        featured_image: null,
        gallery_images: null,
        is_published: false,
        price: 0,
        location: "",
        map_url: "",
        mls_code: "",
        build_year: "",
        property_size: "",
        is_featured: false,
        listing_type: "",
        amenities: [],
        category: null as any,
        category_attributes: [] as any[],
        video_links: [""],
        published_at: "",
        agent_id: null
    });
    const editorRef = useRef<MDXEditorMethods | null>(null);
    const [editorContent, setEditorContent] = useState("");
    const [categoryAttributes, setCategoryAttributes] = useState([]);
    const [selectedCategoryAttributes, setSelectedCategoryAttributes] =
        useState<any[]>([]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("properties.store"));
    };

    function handleCategoryAttributeValueChange(attribute: any, indexId: any) {
        const currentAttributes = [...data.category_attributes];
        if (!currentAttributes?.length) {
            currentAttributes.push(attribute);
            setData("category_attributes", categoryAttributes);
        } else {
            const updatedAttributes = currentAttributes.map((currAttr) =>
                currAttr.id === attribute.id ? attribute : currAttr
            );
            setData("category_attributes", updatedAttributes);
        }
    }

    function handleCategoryAttributeRemove(attribute: any, indexId: any) {
        alert("Coming soon.");
    }

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
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.title}
                                className="mt-2"
                            />
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
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div>

                        {/* Input: Content */}
                        <div>
                            <Label htmlFor="content">Content</Label>
                            <ReachText
                                markdown={data.description}
                                editorRef={editorRef}
                                onChange={() =>
                                    setData(
                                        "content",

                                        editorRef.current
                                            ? editorRef.current.getMarkdown()
                                            : ""
                                    )
                                }
                            />

                            <InputError
                                message={errors.content}
                                className="mt-2"
                            />
                        </div>

                        <div className={`grid grid-cols-4 gap-4`}>
                            {/* Input: Price */}
                            <div>
                                <Label htmlFor="price">Price</Label>

                                <Input
                                    id="price"
                                    type={"number"}
                                    name="price"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData(
                                            "price",
                                            parseFloat(e.target.value)
                                        )
                                    }
                                />

                                <InputError
                                    message={errors.price}
                                    className="mt-2"
                                />
                            </div>

                            {/* Input: location */}
                            <div>
                                <Label htmlFor="location">Location</Label>

                                <Input
                                    id="location"
                                    type={"text"}
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

                            {/* Input: map url */}
                            <div>
                                <Label htmlFor="location">Map URL</Label>

                                <Input
                                    id="map_url"
                                    type={"text"}
                                    name="map_url"
                                    value={data.map_url}
                                    onChange={(e) =>
                                        setData("map_url", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.map_url}
                                    className="mt-2"
                                />
                            </div>

                            {/* Input: mls_code */}
                            <div>
                                <Label htmlFor="mls_code">MLS Code</Label>

                                <Input
                                    id="mls_code"
                                    type={"text"}
                                    name="mls_code"
                                    value={data.mls_code}
                                    onChange={(e) =>
                                        setData("mls_code", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.mls_code}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <div className={`grid grid-cols-4 gap-4`}>
                            {/* Input: build_year */}
                            <div>
                                <Label htmlFor="build_year">Build Year</Label>

                                <Input
                                    id="build_year"
                                    type={"number"}
                                    name="build_year"
                                    value={data.build_year}
                                    onChange={(e) =>
                                        setData("build_year", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.build_year}
                                    className="mt-2"
                                />
                            </div>

                            {/* Input: property_size */}
                            <div>
                                <Label htmlFor="property_size">
                                    Property Size
                                </Label>

                                <Input
                                    id="property_size"
                                    type={"number"}
                                    name="property_size"
                                    value={data.property_size}
                                    onChange={(e) =>
                                        setData("property_size", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.property_size}
                                    className="mt-2"
                                />
                            </div>

                            {/* Input: Listing Types */}
                            <div>
                                <Label htmlFor="listing_type">
                                    Listing Type
                                </Label>

                                <Select
                                    id={`listing_type`}
                                    name={"listing_type"}
                                    options={listingTypes}
                                    onChange={(item) =>
                                        setData("listing_type", item.value)
                                    }
                                />

                                <InputError
                                    message={errors.listing_type}
                                    className="mt-2"
                                />
                            </div>

                            {/* Input: Amenities */}
                            <div>
                                <Label htmlFor="amenities">Amenities</Label>

                                <Select
                                    id={`amenities`}
                                    name={"amenities"}
                                    options={amenityTypes}
                                    isMulti={true}
                                    onChange={(item: any) =>
                                        setData("amenities", item)
                                    }
                                />

                                <InputError
                                    message={errors.amenities}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <div className={`bg-gray-100 p-4`}>
                            <div className={`grid grid-cols-2 gap-4 border-b`}>
                                {/* Input: Categories */}
                                <div>
                                    <Label htmlFor="category">Category</Label>

                                    <Select
                                        id={`category`}
                                        name={"category"}
                                        options={categories}
                                        onChange={(item: any) => {
                                            setData("category", {
                                                id: item.id,
                                                name: item.name,
                                            });
                                            setCategoryAttributes(
                                                item.attributes.map(
                                                    (attr: any) => ({
                                                        id: attr.id,
                                                        name: attr.name,
                                                        icon: attr.icon,
                                                        value: attr.id,
                                                        label: attr.name,
                                                    })
                                                )
                                            );
                                        }}
                                    />

                                    <InputError
                                        message={errors.amenities}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Input: Category Attributes */}
                                <div>
                                    <Label htmlFor="category_attributes">
                                        Category Attributes
                                    </Label>

                                    <Select
                                        id={`category_attributes`}
                                        options={categoryAttributes}
                                        isMulti={true}
                                        onChange={(data: any) =>
                                            setSelectedCategoryAttributes(data)
                                        }
                                    />

                                    <InputError
                                        message={errors.category_attributes}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <CategoryAttributeModificationTable
                                attributes={selectedCategoryAttributes}
                                onValueChange={
                                    handleCategoryAttributeValueChange
                                }
                                onRemoveItem={handleCategoryAttributeRemove}
                            />
                        </div>

                        {/* Input: Video Links */}
                        <div>
                            <Label htmlFor="video_links">
                                Youtube Video Id
                            </Label>

                            <VideoLinksInput
                                defaultLinks={data.video_links}
                                onChange={(links) =>
                                    setData("video_links", links)
                                }
                            />
                        </div>

                        <div className={`grid grid-cols-3 gap-4`}>
                            {/* Input: Featured Image */}
                            <div className={`col-span-1`}>
                                <Label htmlFor="featured_image">
                                    Featured Image
                                </Label>

                                <Input
                                    id="featured_image"
                                    type="file"
                                    name="featured_image"
                                    accept={`image/png, image/gif, image/jpeg, image/webp`}
                                    onChange={(e: any) =>
                                        setData(
                                            "featured_image",
                                            e.target.files[0]
                                        )
                                    }
                                />

                                <InputError
                                    message={errors.title}
                                    className="mt-2"
                                />
                            </div>

                            {/* Input: Gallery Images */}
                            <div className={"col-span-2"}>
                                <Label htmlFor="gallery_images">
                                    Gallery Images
                                </Label>

                                <Input
                                    id="gallery_images"
                                    type="file"
                                    name="gallery_images"
                                    accept={`image/png, image/gif, image/jpeg,  image/webp`}
                                    multiple={true}
                                    onChange={(e: any) =>
                                        setData(
                                            "gallery_images",
                                            e.target.files
                                        )
                                    }
                                />

                                <InputError
                                    message={errors.gallery_images}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <div className={`grid grid-cols-4 gap-4`}>
                            <div>
                                <Label
                                    htmlFor="is_featured"
                                    className={`flex-grow cursor-pointer`}
                                >
                                    Is Featured
                                </Label>

                                <RadioGroup
                                    defaultValue="option-one"
                                    className={`flex items-center gap-5 mt-3`}
                                    onValueChange={(value: any) =>
                                        setData("is_featured", value)
                                    }
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value={"1"}
                                            id="is_featured-yes"
                                        />
                                        <Label htmlFor="is_featured-yes">
                                            Yes
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value={"0"}
                                            id="is_featured-no"
                                        />
                                        <Label htmlFor="is_featured-no">
                                            No
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {/* Input: Is Published */}
                            <div>
                                <Label
                                    htmlFor="is_featured"
                                    className={`flex-grow cursor-pointer`}
                                >
                                    Is Published
                                </Label>

                                <RadioGroup
                                    defaultValue="option-one"
                                    className={`flex items-center gap-5 mt-3`}
                                    onValueChange={(value: any) =>
                                        setData("is_published", value)
                                    }
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value={"1"}
                                            id="is_published-yes"
                                        />
                                        <Label htmlFor="is_published-yes">
                                            Yes
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value={"0"}
                                            id="is_published-no"
                                        />
                                        <Label htmlFor="is_published-no">
                                            No
                                        </Label>
                                    </div>
                                </RadioGroup>
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

                            {/* Input: Agent */}
                            <div>
                                <Label htmlFor="agent_id">
                                    Select Agent
                                </Label>

                                <Select
                                    id={`agent_id`}
                                    name={"agent_id"}
                                    options={agents}
                                    onChange={(item) =>
                                        setData("agent_id", item.value)
                                    }
                                />

                                <InputError
                                    message={errors.agent_id}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <div className="flex items-center mt-4">
                            <Button disabled={processing}>
                                {processing
                                    ? "Adding Property ..."
                                    : "Add Property"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
