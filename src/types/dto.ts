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
  kicker?: string;
  content_kicker?: string;
  print_headline?: string;
  name?: string;
  seo?: string;
  sub?: string;
};
