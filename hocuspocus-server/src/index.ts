import { Server } from "@hocuspocus/server";

// Setup Hocuspocus server
const hocuspocusServer = Server.configure({
  port: 8787,
});

hocuspocusServer.listen();
