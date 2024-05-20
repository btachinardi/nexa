import { Event } from "@core/events/Event";
import { EventHandler } from "@core/events/EventHandler";

export class EventHub<T extends string> {
  private _eventHandlers: Map<T, EventHandler<T>[]> = new Map();

  on<TEvent extends Event<T> = Event<T>>(eventType: T, callback: EventHandler<T, TEvent>): void {
    const callbacks = this._eventHandlers.get(eventType) || [];
    callbacks.push(callback as EventHandler<T>);
    this._eventHandlers.set(eventType, callbacks);
  }

  emit(eventType: T): void;
  emit(event: Event<T>): void;

  emit(eventOrEventType: Event<T> | T): void {
    const event = typeof eventOrEventType === 'string' ? { type: eventOrEventType } as Event<T> : eventOrEventType;
    const callbacks = this._eventHandlers.get(event.type);
    if (callbacks) {
      callbacks.forEach(callback => callback(event));
    }
  }
}
