import { screen } from "@testing-library/react";
import { ArticleDetail } from "../mockserver/fixtures/detail";
import { render } from "../__test__/customRender";
import Article from "./Article";

const articleDetail = ArticleDetail.response.docs[0];

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => ({
    articleId: "invalidinput",
  }),
}));

describe("<Article />", () => {
  it("should display empty state", async () => {
    render(<Article />);
    await screen.findByRole("heading", { name: /404/i });
  });
});
