import { EventSchemas, Inngest } from "inngest";
import { EventUnion } from "./event";

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "wolfkrow-ai",
  schemas: new EventSchemas().fromUnion<EventUnion>(),
});
