import { ValidationError } from "class-validator";
import { FieldErrors } from "react-hook-form";

const parseErrors = (
  errors: ValidationError[],
  validateAllFieldCriteria: boolean,
  parsedErrors: FieldErrors = {},
  path = ""
) => {
  return errors.reduce((acc, error) => {
    const _path = path ? `${path}.${error.property}` : error.property;
    console.log("classValidatorResolver(): ", error);
    if (error.constraints) {
      const key = Object.keys(error.constraints)[0];
      acc[_path] = {
        type: key,
        message: error.constraints[key],
      };

      if (validateAllFieldCriteria && acc[_path]) {
        Object.assign(acc[_path], { types: error.constraints });
      }
    }

    if (error.children && error.children.length) {
      parseErrors(error.children, validateAllFieldCriteria, acc, _path);
    }

    return acc;
  }, parsedErrors);
};

export default parseErrors;
