import {useEffect, useState} from "react";
import {Input} from "@/Components/ui/input";
import {Button} from "@/Components/ui/button";
import {MinusCircle, PlusCircle} from "lucide-react";

export default function VideoLinksInput({ defaultLinks, onChange }: { defaultLinks: string[], onChange: (values: any[]) => void }) {
    const [videoLinks, setVideoLinks] = useState(defaultLinks || []);

    useEffect(() => {
        if(onChange){
            onChange(videoLinks)
        }
    }, [videoLinks, onChange]);

    function removeVideoLink(itemIdx: number) {
        const updatedLinks = [...videoLinks];
        updatedLinks.splice(itemIdx, 1);
        setVideoLinks(updatedLinks);
    }

    function updateVideoLink(value: string, itemIdx: number) {
        const updatedLinks = [...videoLinks];
        updatedLinks[itemIdx] = value;
        setVideoLinks(updatedLinks);
    }

    function addVideoLink() {
        setVideoLinks([...videoLinks, '']);
    }

    return (
        <div className={`flex flex-col gap-4`}>

            { videoLinks?.map((video_link, itemIdx) => {
                return (
                    <div key={`video_link_${itemIdx}`} className={`flex items-center gap-4`}>
                        <Input
                            value={video_link}
                            onChange={e => updateVideoLink(e.target.value, itemIdx) }
                        />

                        <Button
                            type={'button'}
                            variant={'secondary'}
                            size={'icon'}
                            onClick={(e) => removeVideoLink(itemIdx) }>
                            <MinusCircle />
                        </Button>
                    </div>
                )
            }) }

            <Button variant={'outline'} type={'button'} onClick={addVideoLink} className={`flex item-center gap-2 w-48`}>
                <PlusCircle /> Add More
            </Button>
        </div>
    );
}
