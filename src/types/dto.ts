export type ArticleDetail = {
  web_url: string;
  pub_date: string;
  lead_paragraph: string;
  headline: Headline;
  _id: string;
};
export type ArticleSearch = {
  headline: Headline;
  _id: string;
};

export type Headline = {
  main: string;
};
