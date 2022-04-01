type FetchMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
type AnyObject = {
  [key: string]: any;
};

export type ResponseChecker<T> = T extends { items: T[] } ? ListFormat<T> : T;

export type ListFormat<T> = {
  items: T[];
  currentItemCount: number;
  itemsPerPage: number;
  pageIndex: number;
  startIndex: number;
  totalItems: number;
  totalPages: number;
};

export type FetcherRequest = Pick<RequestInit, "body"> & {
  method?: FetchMethod;
  accessToken?: string;
  querystring?: AnyObject;
  pagination?: {
    page: number | undefined;
    limit: number | undefined;
  };
};

const Fetcher = async <T>(
  url: string,
  options?: FetcherRequest
): Promise<ResponseChecker<T>> => {
  const mergedOpt: RequestInit = { method: "GET" };

  if (options?.method !== undefined) {
    mergedOpt.method = options.method;
  }

  // 바디 체크
  if (options?.body !== undefined && options?.body instanceof FormData) {
    mergedOpt.headers = {
      "Content-type": "multipart/form-data; charset=UTF-8",
      Expires: "-1",
      Pragma: "no-cache",
    };
  } else {
    mergedOpt.headers = {
      "Content-type": "application/json; charset=UTF-8",
      Expires: "-1",
      Pragma: "no-cache",
    };
  }
  // 바디 체크[E]
  if (options?.body !== undefined) {
    mergedOpt.body = options?.body;
  }

  // 토큰 확인 후 삽입
  if (options?.accessToken !== undefined) {
    mergedOpt.headers = Object.assign(
      {},
      { "x-auth-token": options.accessToken },
      mergedOpt.headers
    );
  }

  const requestUrl = `${process.env.HOSTNAME}${url}`;

  console.log("Input >>>>> ", requestUrl);
  console.log("headers >>>>> ", mergedOpt.headers);
  console.trace("query string >>>>> ", options?.querystring);

  const response = await fetch(requestUrl, mergedOpt);
  const responseJson = await response.json();

  console.log(responseJson);

  if (!response.ok) {
    throw new Error(responseJson.error);
  }

  return responseJson.data;
};

export default Fetcher;
