"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import LiveblocksProvider from "@liveblocks/yjs";
import { useRoom, useSelf, useMyPresence } from "../../liveblocks.config";
import { useEffect, useState, PointerEvent } from "react";
import { Toolbar } from "./Toolbar";
import styles from "../styles/CollaborativeEditor.module.css";
import { Avatars } from "./Avatars";
import { Cursor } from "./Cursor";

// Collaborative text editor with simple rich text, live cursors, and live avatars
export function CollaborativeEditor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<any>();
  
  
  // Set up Liveblocks Yjs provider
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);
 
    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  return <><TiptapEditor doc={doc} provider={provider} /></>;
}

type EditorProps = {
  doc: Y.Doc;
  provider: any;
};

function TiptapEditor({ doc, provider }: EditorProps) {
  // Get user info from Liveblocks authentication endpoint
  const userInfo = useSelf((me) => me.info);
  const [myPresence, updateMyPresence] = useMyPresence();
  // Set up editor with plugins, and place user info into Yjs awareness and cursors
  const editor = useEditor({
    editorProps: {
      attributes: {
        // Add styles to editor element
        class: styles.editor,
      },
    },
    extensions: [
      StarterKit.configure({
        // The Collaboration extension comes with its own history handling
        history: false,
      }),
      // Register the document with Tiptap
      Collaboration.configure({
        document: doc,
      }),
      // Attach provider and user info
      CollaborationCursor.configure({
        provider: provider,
        user: userInfo,
      }),
    ],
  });

  function handelCursorMove(e: PointerEvent<HTMLDivElement>) {
    const cursor = { x: Math.floor(e.clientX), y: Math.floor(e.clientY) };
    updateMyPresence({ cursor });
  }
  function handelCursorLeave() {
    updateMyPresence({ cursor: null });
  }

  return (
    <main
      onPointerMove={handelCursorMove}
      onPointerLeave={handelCursorLeave}
      className="flex h-screen text-white flex-col  text-xl p-12 lg:p-24 bg-gradient-to-b from-purple to-indigo-600"
    >
      <div className={`flex-1 ${styles.container} mb-6 `}>
        <div className={styles.editorHeader}>
          <Toolbar editor={editor} />
          <Avatars />
        </div>
        <EditorContent editor={editor} className={styles.editorContainer} />
      </div>
      <Cursor />
    </main>
  );
}
