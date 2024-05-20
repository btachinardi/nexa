export type Enum<T, TValue extends T[keyof T] = T[keyof T]> = { [P in keyof T]: TValue };
export type EnumValue<T> = T[keyof T];

export function isEnum<TEnum extends Enum<TEnum>>(value: unknown, enumType: TEnum): value is EnumValue<TEnum> {
  return (isString(value) || isNumber(value)) && Object.values(enumType).includes(value);
}

export function isSpecificEnum<
  TEnum extends Enum<TEnum>,
  TSpecific extends EnumValue<TEnum>
>(value: unknown, enumType: TEnum, specificValue: TSpecific): value is TSpecific {
  return isEnum(value, enumType) && value === specificValue;
}

export function isOptionalEnum<TEnum extends Enum<TEnum>>(
  value: unknown, enumType: TEnum
): value is EnumValue<TEnum> | undefined {
  return value === undefined || isEnum(value, enumType);
}


export function isSpecificOptionalEnum<
  TEnum extends Enum<TEnum>,
  TSpecific extends EnumValue<TEnum>
>(value: unknown, enumType: TEnum, specificValue: TSpecific): value is TSpecific | undefined {
  return value === undefined || isSpecificEnum(value, enumType, specificValue);
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isSpecificString<TSpecific extends string>(
  value: unknown,
  specificValue: TSpecific
): value is TSpecific {
  return value === specificValue;
}

export function isOptionalString(value: unknown): value is string | undefined {
  return value === undefined || isString(value);
}

export function isSpecificOptionalString<TSpecific extends string>(
  value: unknown,
  specificValue: TSpecific
): value is TSpecific | undefined {
  return value === undefined || value === specificValue;
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export function isSpecificNumber<TSpecific extends number>(
  value: unknown,
  specificValue: TSpecific
): value is TSpecific {
  return value === specificValue;
}

export function isOptionalNumber(value: unknown): value is number | undefined {
  return value === undefined || isNumber(value);
}

export function isSpecificOptionalNumber<TSpecific extends number>(
  value: unknown,
  specificValue: TSpecific
): value is TSpecific | undefined {
  return value === undefined || value === specificValue;
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

export function isSpecificBoolean<TSpecific extends boolean>(
  value: unknown,
  specificValue: TSpecific
): value is TSpecific {
  return value === specificValue;
}

export function isOptionalBoolean(value: unknown): value is boolean | undefined {
  return value === undefined || isBoolean(value);
}

export function isSpecificOptionalBoolean<TSpecific extends boolean>(
  value: unknown,
  specificValue: TSpecific
): value is TSpecific | undefined {
  return value === undefined || value === specificValue;
}


export function isArray(value: unknown): value is unknown[];
export function isArray<T>(value: unknown, isItem: (item: unknown) => item is T): value is T[];
export function isArray<T = unknown>(value: unknown, isItem?: (item: unknown) => item is T): value is T[] | unknown[] {
  return Array.isArray(value) && (isItem ? value.every(isItem) : true);
}

export function isOptionalArray(value: unknown): value is unknown[] | undefined;
export function isOptionalArray<T>(value: unknown, isItem: (item: unknown) => item is T): value is T[] | undefined;
export function isOptionalArray<TItem>(value: unknown, isItem?: (item: unknown) => item is TItem): value is TItem[] | unknown[] | undefined {
  return value === undefined || (isItem ? isArray(value, isItem) : isArray(value));
}

export function isObject(value: unknown): value is object {
  return value !== undefined && value !== null && typeof value === 'object';
}

export function isOptionalObject(value: unknown): value is object | undefined {
  return value === undefined || isObject(value);
}

export function isProperty<TProp>(value: unknown, typeCheck: (value: unknown) => value is TProp): value is TProp {
  return typeCheck(value);
}

export function isOptionalProperty<TProp>(value: unknown, typeCheck: (value: unknown) => value is TProp): value is TProp | undefined {
  return value === undefined || typeCheck(value);
}

export function hasEnum<K extends string | number, TEnum extends Enum<TEnum>>(
  value: object, property: K, enumType: TEnum
): value is { [P in K]: EnumValue<TEnum> } {
  return (hasString(value, property) || hasNumber(value, property)) && isEnum(value[property], enumType);
}

export function hasSpecificEnum<
  K extends string | number,
  TEnum extends Enum<TEnum>,
  TSpecific extends EnumValue<TEnum>
>(value: object, property: K, enumType: TEnum, specificValue: TSpecific): value is { [P in K]: TSpecific } {
  return hasEnum(value, property, enumType) && isSpecificEnum(value[property], enumType, specificValue);
}

export function hasOptionalEnum<
  K extends string | number,
  TEnum extends Enum<TEnum>
>(value: object, property: K, enumType: TEnum): value is { [P in K]: EnumValue<TEnum> | undefined } {
  return hasMissing(value, property) || isEnum((value as { [P in K]: unknown })[property], enumType);
}

export function hasSpecificOptionalEnum<
  K extends string | number,
  TEnum extends Enum<TEnum>,
  TSpecific extends EnumValue<TEnum>
>(value: object, property: K, enumType: TEnum, specificValue: TSpecific): value is { [P in K]: TSpecific | undefined } {
  return hasMissing(value, property) || isSpecificEnum((value as { [P in K]: unknown })[property], enumType, specificValue);
}

export function hasString<
  K extends string | number
>(value: object, property: K): value is { [P in K]: string } {
  return !hasMissing(value, property) && isString((value as { [P in K]: unknown })[property]);
}

export function hasSpecificString<
  K extends string | number,
  TSpecific extends string
>(value: object, property: K, specificValue: TSpecific): value is { [P in K]: TSpecific } {
  return !hasMissing(value, property) && isSpecificString((value as { [P in K]: unknown })[property], specificValue);
}

export function hasOptionalString<
  K extends string | number
>(value: object, property: K): value is { [P in K]: string | undefined } {
  return hasMissing(value, property) || isString((value as { [P in K]: unknown })[property]);
}

export function hasSpecificOptionalString<
  K extends string | number,
  TSpecific extends string
>(value: object, property: K, specificValue: TSpecific): value is { [P in K]: TSpecific | undefined } {
  return hasMissing(value, property) || isSpecificString((value as { [P in K]: unknown })[property], specificValue);
}

export function hasNumber<
  K extends string | number
>(value: object, property: K): value is { [P in K]: number } {
  return !hasMissing(value, property) && isNumber((value as { [P in K]: unknown })[property]);
}

export function hasSpecificNumber<
  K extends string | number,
  TSpecific extends number
>(value: object, property: K, specificValue: TSpecific): value is { [P in K]: TSpecific } {
  return !hasMissing(value, property) && isSpecificNumber((value as { [P in K]: unknown })[property], specificValue);
}

export function hasOptionalNumber<T extends object, K extends string | number>(value: T, property: K): value is T & { [P in K]: number | undefined } {
  return property in value ? isNumber((value as { [P in K]: unknown })[property]) : true;
}

export function hasBoolean<T extends object, K extends string | number>(value: T, property: K): value is T & { [P in K]: boolean } {
  return property in value && isBoolean((value as { [P in K]: unknown })[property]);
}

export function hasOptionalBoolean<T extends object, K extends string | number>(value: T, property: K): value is T & { [P in K]: boolean | undefined } {
  return property in value ? isBoolean((value as { [P in K]: unknown })[property]) : true;
}

export function hasArray<T extends object, K extends string | number, TItem>(
  value: T, property: K, isItem: (item: unknown) => item is TItem
): value is T & { [P in K]: TItem[] } {
  return property in value && isArray((value as { [P in K]: unknown })[property], isItem);
}

export function hasOptionalArray<T extends object, K extends string | number, TItem>(
  value: T, property: K, isItem: (item: unknown) => item is TItem
): value is T & { [P in K]: TItem[] | undefined } {
  return property in value ? isArray((value as { [P in K]: unknown })[property], isItem) : true;
}

export function hasObject<T extends object, K extends string | number>(
  value: T, property: K
): value is T & { [P in K]: object } {
  return property in value && isObject((value as { [P in K]: unknown })[property]);
}

export function hasOptionalObject<T extends object, K extends string | number>(value: T, property: K): value is T & { [P in K]: object | undefined } {
  return property in value ? isObject((value as { [P in K]: unknown })[property]) : true;
}

export function hasProperty<T extends object, K extends string | number, TProp>(
  value: T, property: K, typeCheck: (value: unknown) => value is TProp
): value is T & { [P in K]: TProp } {
  return property in value && typeCheck((value as { [P in K]: unknown })[property]);
}

export function hasOptionalProperty<T extends object, K extends string | number, TProp>(
  value: T, property: K, typeCheck: (value: unknown) => value is TProp
): value is T & { [P in K]: TProp | undefined } {
  return property in value ? typeCheck((value as { [P in K]: unknown })[property]) : true;
}

export function checkType<T>(_: T) {
  return true;
}

export function has<
  K extends string | number
>(value: object, property: K): value is { [P in K]: unknown } {
  return property in value;
}

export function hasMissing<
  K extends string | number
>(value: object, property: K): value is { [P in K]: undefined } {
  return !(property in value);
}

