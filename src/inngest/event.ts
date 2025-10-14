export type TestEvent = {
  name: "test/hello.world";
  data: {
    email: string;
  };
};

export type AIChatCompletion = {
  name: "ai/chat.completion";
};

export type EventUnion = TestEvent | AIChatCompletion;
