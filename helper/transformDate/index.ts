import { Transform } from "class-transformer";

export default function TransformDate() {
  const toPlain = Transform(
    (v) => {
      if (!v.value) {
        return undefined;
      }
      return (v.value as Date).toISOString();
    },
    {
      toPlainOnly: true,
    }
  );

  const toClass = Transform(
    ({ value }) => {
      if (!value) {
        return undefined;
      }
      return new Date(value);
    },
    {
      toClassOnly: true,
    }
  );

  return function (target: any, key: string) {
    toPlain(target, key);
    toClass(target, key);
  };
}
