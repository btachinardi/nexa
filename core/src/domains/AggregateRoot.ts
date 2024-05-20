import { Enum, EnumValue, checkType, hasEnum, hasString, isObject } from "@core/utils/Guards";

export interface AggregateRoot<TId extends string | number | Enum<TId> = string> {
  readonly id: TId;
}

export type Transient<T extends AggregateRoot> = Omit<T, 'id'> & { id?: never; };

export function isTransient<T extends AggregateRoot>(item: T | Transient<T>): item is Transient<T> {
  return !('id' in item);
}

export function isAggregateRoot(value: unknown): value is AggregateRoot;
export function isAggregateRoot<TId extends Enum<TId>>(value: unknown, idEnum: TId): value is AggregateRoot<EnumValue<TId>>;
export function isAggregateRoot<TId extends Enum<TId>>(value: unknown, idEnum?: TId): value is AggregateRoot<EnumValue<TId>> | AggregateRoot {
  if (idEnum) {
    return isObject(value) &&
      hasEnum(value, 'id', idEnum) &&
      checkType<AggregateRoot<EnumValue<TId>>>(value);
  }
  return isObject(value) &&
    hasString(value, 'id') &&
    checkType<AggregateRoot>(value);
}