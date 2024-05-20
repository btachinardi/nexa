import { Assistant } from "@core/ai/assistants/Assistant";
import { ChatSession } from "@core/ai/chats/sessions/ChatSession";
import { AggregateRoot } from "@core/domains/AggregateRoot";


export interface AppUser extends AggregateRoot {
  readonly name: string;
  readonly email: string;
  readonly avatar: string;
  readonly sessions: ChatSession[];
  readonly assistants: Assistant[];
}