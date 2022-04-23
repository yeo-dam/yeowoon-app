import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { ClassConstructor } from "unsafe-class-transformer";
import React from "react";
import { useEffect } from "react";
import {
  useForm,
  FormProvider,
  FieldValues,
  UnpackNestedValue,
  DeepPartial,
  Mode,
} from "react-hook-form";

export type Props<T extends FieldValues> = React.PropsWithChildren<{
  schema: ClassConstructor<T>;
  updatedObject?: any;
  defaultValues?: UnpackNestedValue<DeepPartial<T>>;
  mode?: Mode;
}>;

const Component = <T extends FieldValues>({
  schema,
  mode = "all",
  defaultValues,
  updatedObject,
  children,
}: Props<T>) => {
  const resolver = classValidatorResolver(schema);
  const methods = useForm<T>({
    resolver,
    defaultValues,
    mode,
    reValidateMode: "onChange",
  });

  useEffect(() => {
    methods.reset(defaultValues);
  }, [updatedObject]);

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default Component;
