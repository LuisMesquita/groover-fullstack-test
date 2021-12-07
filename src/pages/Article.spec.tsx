import { screen } from "@testing-library/react";
import { ArticleDetail } from "../mockserver/fixtures/detail";
import { render } from "../__test__/customRender";
import Article from "./Article";

const articleDetail = ArticleDetail.response.docs[0];

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => ({
    articleId: "articleIdHased",
  }),
}));

describe("<Article />", () => {
  it("should display loading and update products on list", async () => {
    render(<Article />);

    await screen.findByRole("link", { name: /go to results page/i });

    screen.getByRole("heading", { name: articleDetail.headline.main });

    screen.getByText(articleDetail.lead_paragraph);

    const readFullArticleLink = screen.getByRole("link", {
      name: /read the full article/i,
    });

    expect(readFullArticleLink).toHaveAttribute("href", articleDetail.web_url);
  });
});
