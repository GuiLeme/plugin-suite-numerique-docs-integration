import { YjsThreadStore } from "@blocknote/core";
import { Document } from "@hocuspocus/server";
import { Hono } from "hono";
export declare const threadsRouter: (options: {
    threadsMapKey: string;
}) => Hono<{
    Variables: {
        document: Document;
        userId: string;
        role: "COMMENT-ONLY" | "READ-WRITE";
        threadStore: YjsThreadStore;
    };
}, import("hono/types").BlankSchema, "/">;
