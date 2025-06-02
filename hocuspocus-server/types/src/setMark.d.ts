import { Document } from "@hocuspocus/server";
import { EditorState } from "prosemirror-state";
import * as Y from "yjs";
/**
 * Sets a mark in the yjs document based on a yjs selection
 */
export declare function setMark(doc: Document, fragment: Y.XmlFragment, yjsSelection: {
    anchor: any;
    head: any;
}, markName: string, markAttributes: any): void;
export declare const setMarkInProsemirror: (type: any, attributes: {} | undefined, state: EditorState) => import("prosemirror-state").Transaction;
