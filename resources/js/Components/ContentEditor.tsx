import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {
    MDXEditor,
    MDXEditorMethods,
    UndoRedo,
    BoldItalicUnderlineToggles,
    toolbarPlugin,
    codeBlockPlugin,
    InsertImage,
    imagePlugin,
    linkPlugin,
    InsertTable,
    linkDialogPlugin,
    markdownShortcutPlugin,
    InsertFrontmatter,
    frontmatterPlugin,
    InsertAdmonition,
    directivesPlugin,
    AdmonitionDirectiveDescriptor,
    tablePlugin,
    CreateLink, BlockTypeSelect, listsPlugin, thematicBreakPlugin, ListsToggle, InsertThematicBreak
} from "@mdxeditor/editor";

export default function ContentEditor({ onChange }: { onChange: (value: any) => void}) {
    const editorRef = useRef<MDXEditorMethods>(null)

    const log = () => {
        if (editorRef.current) {
            onChange(editorRef.current?.getMarkdown())
        }
    };

    return (
        <>
            <MDXEditor
                ref={editorRef}
                markdown="hello world"
                onChange={log}
                plugins={[
                    toolbarPlugin({
                        toolbarContents: () => (
                            <>
                                {' '}
                                <UndoRedo />
                                <BoldItalicUnderlineToggles />
                                <InsertImage />
                                <InsertTable />
                                <CreateLink />
                                <BlockTypeSelect />
                                <ListsToggle />
                                <InsertThematicBreak />
                            </>
                        )
                    }),
                    imagePlugin({
                        imageUploadHandler: () => {
                            return Promise.resolve('https://picsum.photos/200/300')
                        },
                        imageAutocompleteSuggestions: ['https://picsum.photos/200/300', 'https://picsum.photos/200']
                    }),
                    tablePlugin(),
                    linkDialogPlugin(),
                    listsPlugin(),
                    thematicBreakPlugin()
                ]}
            />
        </>
    );
}
