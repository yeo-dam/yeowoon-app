export function FormatErrorMessage(error: any) {
  switch (error.type) {
    case "isNotEmpty":
      return "필수 입력 항목입니다.";
    default:
      return error.message;
  }
}

export const renderErrMsg = (error: any, msg?: string) => {
  // 에러메세지가 없으면, error 객체의 message를 발송해준다.
  if (!msg) {
    return FormatErrorMessage(error);
  }
  return msg;
};
