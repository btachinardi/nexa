import { ChatMessage, isChatMessage } from "@core/ai/chats/sessions/ChatMessage";
import { checkType, hasArray, hasNumber, hasProperty, isObject } from "@core/utils/Guards";

export interface ChatMessageNodeContainer {
  index: number;
  children: ChatMessageNode[];
  selectedIndex: number;
}

export interface ChatMessageNode extends ChatMessageNodeContainer {
  message: ChatMessage;
}

export function isNodeContainer(node: unknown): node is ChatMessageNodeContainer {
  return isObject(node) &&
    hasNumber(node, 'index') &&
    hasArray(node, 'children', isNode) &&
    hasNumber(node, 'selectedIndex') &&
    checkType<ChatMessageNodeContainer>(node);
}

export function isNode(node: unknown): node is ChatMessageNode {
  return isNodeContainer(node) &&
    hasProperty(node, 'message', isChatMessage)
    && checkType<ChatMessageNode>(node);
}
