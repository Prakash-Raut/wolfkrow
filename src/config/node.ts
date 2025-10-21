import { InitialNode } from "@/components/initial-node";
import { NodeType } from "@/generated/prisma";
import { NodeTypes } from "@xyflow/react";

export const nodeConfig = {
  [NodeType.INITIAL]: InitialNode,
} as const satisfies NodeTypes;

export type RegisteredTypeNode = keyof typeof nodeConfig;
