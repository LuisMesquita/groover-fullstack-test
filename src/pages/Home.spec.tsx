import { render } from "../__test__/customRender";
import Home from "./Home";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ArticleList } from "../mockserver/fixtures/search";

const searchText = "brooklyn";
const articleList = ArticleList.response.docs;

const loadArticles = async () => {
  const skeletonLoading = await screen.findAllByTestId(/skeleton/i);
  expect(skeletonLoading[0]).toBeInTheDocument();

  const firstArticle = await screen.findByText(articleList[0].headline.main);
  expect(firstArticle).toBeInTheDocument();
};

describe("<Home />", () => {
  it("should render List of articles with pagination", async () => {
    render(<Home />);

    const searchInput = screen.getByLabelText(
      /Type search query terms in here:/i
    );
    userEvent.type(searchInput, searchText);

    await loadArticles();

    const previousButton = screen.getByRole("button", {
      name: /previous page/i,
    });
    const nextButton = screen.getByRole("button", { name: /next page/i });

    expect(previousButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    userEvent.click(nextButton);

    await loadArticles();
    expect(previousButton).not.toBeDisabled();

    userEvent.click(previousButton);
    await loadArticles();
    expect(previousButton).toBeDisabled();
  });
});
