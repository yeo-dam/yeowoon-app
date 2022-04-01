import { Type } from './_type';

export interface MappedType<T> extends Type<T> {
  new (): T;
}
