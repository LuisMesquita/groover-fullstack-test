import { GetArticleByIdResponse, SearchApiResponse } from "../../api";

export const ArticleDetail: SearchApiResponse<GetArticleByIdResponse> = {
  status: "OK",
  copyright:
    "Copyright (c) 2021 The New York Times Company. All Rights Reserved.",
  response: {
    docs: [
      {
        web_url:
          "https://www.nytimes.com/2021/11/14/nyregion/brooklyn-eric-adams-elections.html",
        lead_paragraph:
          "When she took the stage at a recent reception for the Brooklyn Democratic Party, Gov. Kathy Hochul could not ignore the evidence gathered before her.",
        headline: {
          main: "Is Brooklyn in the House? Its Politicians Certainly Are.",
          print_headline:
            "Is Brooklyn in the House, and City Hall? Its Politicians Certainly Are.",
        },
        pub_date: "2021-11-14T18:30:22+0000",
        _id: "nyt://article/d4687390-3486-53b4-af12-b23d460fd7f3",
      },
    ],
    meta: {
      hits: 1,
      offset: 0,
      time: 18,
    },
  },
};
