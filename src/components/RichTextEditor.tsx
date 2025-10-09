"use client";

import { useEditor, EditorContent, useEditorState } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Undo,
  Redo,
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
} from "lucide-react";

import { Toggle } from "@/components/ui/toggle";

import { Separator } from "@/components/ui/separator";

import { Button } from "@/components/ui/button";

import TextAlign from "@tiptap/extension-text-align";

import { CharacterCount } from "@tiptap/extensions";

const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      StarterKit.configure({}),

      CharacterCount.configure({}),
    ],

    content: "<p>Type your content here...</p>",

    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none text-left min-h-[300px] p-4 focus:outline-none",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-lg">
      <div className="flex flex-wrap items-center gap-1 border-b p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-8" />

        <Toggle
          size="sm"
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          aria-label="Toggle bold"
        >
          <Bold className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Toggle italic"
        >
          <Italic className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive("strike")}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          aria-label="Toggle strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>

        <Separator orientation="vertical" className="h-8" />

        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: "left" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("left").run()
          }
          aria-label="Align left"
        >
          <AlignLeft className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: "center" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("center").run()
          }
          aria-label="Align center"
        >
          <AlignCenter className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: "right" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("right").run()
          }
          aria-label="Align right"
        >
          <AlignRight className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: "justify" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("justify").run()
          }
          aria-label="Align justify"
        >
          <AlignJustify className="h-4 w-4" />
        </Toggle>
      </div>

      <EditorContent editor={editor} />

      <div className="border-t p-2 text-xs text-slate-500 flex items-center">
        0 Words
      </div>
    </div>
  );
};

export default RichTextEditor;
