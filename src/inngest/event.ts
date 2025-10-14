export type TestEvent = {
  name: "test/hello.world";
  data: {
    email: string;
  };
};

export type AIChatCompletion = {
  name: "ai/chat.completion";
  data: {
    prompt: {
      role: "system" | "user" | "assistant";
      content: string;
    }[];
    temperature: number;
    maxOutputTokens: number;
  };
};

export type EventUnion = TestEvent | AIChatCompletion;
