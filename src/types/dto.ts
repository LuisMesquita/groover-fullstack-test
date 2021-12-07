export type ArticleDetail = {
  web_url: string;
  pub_data: string;
  snippet: string;
  lead_paragraph: string;
  _id: string;
};
export type ArticleSearch = {
  headline: Headline;
  _id: string;
};

export type Headline = {
  main: string;
};
