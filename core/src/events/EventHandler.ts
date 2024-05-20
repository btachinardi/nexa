import { Event } from "@core/events/Event";

export type EventHandler<T extends string = string, TEvent extends Event<T> = Event<T>> = (event: TEvent) => void;
