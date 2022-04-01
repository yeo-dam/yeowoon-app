import {
  inheritMethods,
  inheritPropertyInitializers,
  inheritTransformationMetadata,
  inheritValidationMetadata,
} from "./_helper";
import { MappedType } from "./_mappedTypeInterface";
import { Type } from "./_type";

export function PickType<T, K extends keyof T>(
  classRef: Type<T>,
  keys: readonly K[]
): MappedType<Pick<T, typeof keys[number]>> {
  const isInheritedPredicate = (propertyKey: string) =>
    keys.includes(propertyKey as K);

  abstract class PickClassType {
    constructor() {
      inheritPropertyInitializers(this, classRef, isInheritedPredicate);
    }
  }
  inheritValidationMetadata(classRef, PickClassType, isInheritedPredicate);
  inheritTransformationMetadata(classRef, PickClassType, isInheritedPredicate);
  inheritMethods(classRef, PickClassType, isInheritedPredicate);

  return PickClassType as MappedType<Pick<T, typeof keys[number]>>;
}
