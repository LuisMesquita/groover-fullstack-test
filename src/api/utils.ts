export const queryString = (params: Record<string, any>) =>
  Object.keys(params)
    .filter((key) => !!params[key])
    .map((key) => {
      return key + "=" + params[key];
    })
    .join("&");
