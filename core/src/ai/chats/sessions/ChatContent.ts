import { checkType, hasEnum, hasOptionalEnum, hasProperty, hasString, isArray, isObject, isString } from "@core/utils/Guards";

export enum ChatContentPartType {
    Text = 'text',
    Image = 'image',
}

export enum ChatImageDetail {
    Low = 'low',
    High = 'high',
}

export interface ChatImage {
    url: string;
    detail?: ChatImageDetail;
}

export interface ChatContentPart {
    type: ChatContentPartType;
}

export interface ChatTextContentPart extends ChatContentPart {
    text: string;
}

export interface ChatImageContentPart extends ChatContentPart {
    image: ChatImage;
}

export type ChatContent = string | ChatContentPart[];

export function isContentPart(part: unknown): part is ChatContentPart {
    return isObject(part) &&
        hasEnum(part, 'type', ChatContentPartType) &&
        checkType<ChatContentPart>(part);
}

export function isTextPart(part: unknown): part is ChatTextContentPart {
    return isContentPart(part) && part.type === ChatContentPartType.Text &&
        hasString(part, 'text') &&
        checkType<ChatTextContentPart>(part);
}

export function isImagePart(part: unknown): part is ChatImageContentPart {
    return isContentPart(part) && part.type === ChatContentPartType.Image &&
        hasProperty(part, 'image', isImage) &&
        checkType<ChatImageContentPart>(part);
}

export function isImage(image: unknown): image is ChatImage {
    return isObject(image) &&
        hasString(image, 'url') &&
        hasOptionalEnum(image, 'detail', ChatImageDetail) &&
        checkType<ChatImage>(image);
}

export function isChatContent(content: unknown): content is ChatContent {
    return (isString(content) && checkType<string>(content)) ||
        (isArray(content, isContentPart) && checkType<ChatContentPart[]>(content)) &&
        checkType<ChatContent>(content);
}

export function chatContentToString(content: ChatContent): string {
    if (typeof content === 'string') {
        return content;
    }
    return content.map(part => {
        if (isTextPart(part)) {
            return part.text;
        } else if (isImagePart(part)) {
            return `![${part.image.detail}](${part.image.url})`;
        }
        return "";
    }).join('');
}