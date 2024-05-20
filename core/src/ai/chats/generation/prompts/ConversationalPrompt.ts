import { ChatGenerationPrompt, PromptTokenModifier } from "@core/ai/chats/generation/ChatGenerationPrompt";
import { formatOpenToken } from "@core/ai/chats/generation/commands/FormatToken";

export const ConversationalType = "conversational";

export function conversationalPrompt(tokenPrefix: string = "<|", tokenSuffix: string = "|>"): ChatGenerationPrompt {
  const token: PromptTokenModifier = {
    open: {
      prefix: tokenPrefix,
      suffix: tokenSuffix,
    },
    close: {
      prefix: tokenPrefix,
      suffix: tokenSuffix,
    },
  };

  return {
    token,
    chat: {
      session: {
        open: formatOpenToken("begin_of_text", token),
        close: formatOpenToken("end_of_text", token),
      },
      roleHeader: {
        open: formatOpenToken("start_header_id", token),
        close: formatOpenToken("end_header_id", token),
      },
      message: {
        open: "\n\n",
        close: formatOpenToken("eot_id", token),
      }
    }
  };
}
