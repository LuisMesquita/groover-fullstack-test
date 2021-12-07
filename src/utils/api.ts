export const queryString = (params: Record<string, any>) =>
  Object.keys(params)
    .filter((key) => !!params[key])
    .map((key) => {
      return key + "=" + params[key];
    })
    .join("&");

export const facetQueryBuilder = (facets: Record<string, string[]>) =>
  Object.keys(facets)
    .reduce<string[]>(
      (query, key) => [...query, `${key}:(${facets[key].join(" ")})`],
      []
    )
    .join(" AND ");
