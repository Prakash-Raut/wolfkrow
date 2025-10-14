import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { inngest } from "./client";

const google = createGoogleGenerativeAI();
const openai = createOpenAI();
const anthropic = createAnthropic();

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "ai/chat.completion" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "5s");

    const { text: geminiText } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: google("gemini-2.0-flash-001"),
        system: "You are a helpful assistant.",
        prompt: "What is the capital of France?",
      },
    );

    const { text: openaiText } = await step.ai.wrap(
      "openai-generate-text",
      generateText,
      {
        model: openai("gpt-4o"),
        system: "You are a helpful assistant.",
        prompt: "What is the capital of France?",
      },
    );

    const { text: anthropicText } = await step.ai.wrap(
      "anthropic-generate-text",
      generateText,
      {
        model: anthropic("claude-3-5-sonnet-20241022"),
        system: "You are a helpful assistant.",
        prompt: "What is the capital of France?",
      },
    );

    return {
      geminiText,
      openaiText,
      anthropicText,
    };
  },
);
