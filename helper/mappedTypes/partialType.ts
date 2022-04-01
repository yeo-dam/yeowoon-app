import {
  applyIsOptionalDecorator,
  inheritPropertyInitializers,
  inheritTransformationMetadata,
  inheritValidationMetadata,
} from './_helper';
import { MappedType } from './_mappedTypeInterface';
import { Type } from './_type';

export function PartialType<T>(classRef: Type<T>): MappedType<Partial<T>> {
  abstract class PartialClassType {
    constructor() {
      inheritPropertyInitializers(this, classRef);
    }
  }

  const propertyKeys = inheritValidationMetadata(classRef, PartialClassType);
  inheritTransformationMetadata(classRef, PartialClassType);

  if (propertyKeys) {
    propertyKeys.forEach((key) => {
      applyIsOptionalDecorator(PartialClassType, key);
    });
  }

  Object.defineProperty(PartialClassType, 'name', {
    value: `Partial${classRef.name}`,
  });
  return PartialClassType as MappedType<Partial<T>>;
}
