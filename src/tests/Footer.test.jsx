import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

describe("Footer", () => {
  test("should match rendered snapshot", () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });
  test("should open links in new tab", async () => {
    render(<Footer />);

    const anchorTags = await screen.findAllByRole("link");
    const doAllLinksOpenInNewTab = anchorTags
      .map((tag) => tag.getAttribute("target"))
      .every((targetAttribute) => targetAttribute === "_blank");
    expect(doAllLinksOpenInNewTab).toBe(true);
  });
});
