import { toNestError, validateFieldsNatively } from "@hookform/resolvers";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { ValidatorOptions, validate } from "class-validator";
import { ResolverOptions } from "react-hook-form";
import parseErrors from "../ParseError";

const classValidatorResolver =
  (schema: ClassConstructor<unknown>, schemaOptions?: ValidatorOptions) =>
  async (values: any[], _: any, options: ResolverOptions<any>) => {
    const user = plainToInstance(schema, values);

    const rawErrors = await validate(user, schemaOptions);

    if (rawErrors.length) {
      return {
        values,
        errors: toNestError(
          parseErrors(
            rawErrors,
            !options.shouldUseNativeValidation && options.criteriaMode === "all"
          ),
          options
        ),
      };
    }

    options.shouldUseNativeValidation && validateFieldsNatively({}, options);

    return { values: user, errors: {} };
  };

export default classValidatorResolver;
