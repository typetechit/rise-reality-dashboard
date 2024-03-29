"use client";
// InitializedMDXEditor.tsx
import type { ForwardedRef } from "react";

import {
    BlockTypeSelect,
    BoldItalicUnderlineToggles,
    CreateLink,
    InsertImage,
    InsertTable,
    InsertThematicBreak,
    ListsToggle,
    MDXEditor,
    MDXEditorMethods,
    MDXEditorProps,
    UndoRedo,
    imagePlugin,
    linkDialogPlugin,
    linkPlugin,
    listsPlugin,
    markdownShortcutPlugin,
    quotePlugin,
    tablePlugin,
    thematicBreakPlugin,
    toolbarPlugin,
} from "@mdxeditor/editor";
import { headingsPlugin } from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css";

// Only import this to the next file
export default function ReachText({
    onChange,
    editorRef,
    ...props
}: {
    onChange: (values: any) => void;
    editorRef: ForwardedRef<MDXEditorMethods> | null;
} & MDXEditorProps) {
    async function imageUploadHandler(image: File) {
        const formData = new FormData();
        formData.append("image", image);
        // get csrf token form cookie

        const response = await fetch("/editor-file-upload", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const { editor_uploaded_image } = await response.json();
            console.log("Response status:", editor_uploaded_image); // Log the response status
            return editor_uploaded_image;
        } else {
            console.error("Error uploading image:", response.statusText); // Log any errors
            console.log("Failed to upload image");
        }
    }
    return (
        <div className="  rounded-md border border-input bg-background  ring-offset-background  focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ">
            <MDXEditor
                onChange={onChange}
                contentEditableClassName="prose"
                plugins={[
                    listsPlugin(),
                    quotePlugin(),
                    headingsPlugin(),
                    thematicBreakPlugin(),
                    markdownShortcutPlugin(),
                    toolbarPlugin({
                        toolbarContents: () => (
                            <>
                                <UndoRedo />
                                <BoldItalicUnderlineToggles />
                                <InsertImage />
                                <InsertTable />
                                <CreateLink />
                                <BlockTypeSelect />
                                <ListsToggle />
                                <InsertThematicBreak />
                            </>
                        ),
                    }),
                    linkPlugin(),
                    tablePlugin(),
                    linkDialogPlugin(),
                    imagePlugin({ imageUploadHandler }),
                ]}
                {...props}
                ref={editorRef}
            />
        </div>
    );
}
