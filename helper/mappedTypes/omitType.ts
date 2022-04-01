import {
  inheritMethods,
  inheritPropertyInitializers,
  inheritTransformationMetadata,
  inheritValidationMetadata,
} from './_helper';
import { MappedType } from './_mappedTypeInterface';
import { Type } from './_type';

export function OmitType<T, K extends keyof T>(
  classRef: Type<T>,
  keys: readonly K[]
): MappedType<Omit<T, typeof keys[number]>> {
  const isInheritedPredicate = (propertyKey: string) =>
    !keys.includes(propertyKey as K);

  abstract class OmitClassType {
    constructor() {
      inheritPropertyInitializers(this, classRef, isInheritedPredicate);
    }
  }

  inheritValidationMetadata(classRef, OmitClassType, isInheritedPredicate);
  inheritTransformationMetadata(classRef, OmitClassType, isInheritedPredicate);
  inheritMethods(classRef, OmitClassType, isInheritedPredicate);

  return OmitClassType as MappedType<Omit<T, typeof keys[number]>>;
}
