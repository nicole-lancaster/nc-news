import { render, screen, waitFor } from "@testing-library/react";
import { UserContext } from "../contexts/User";
import SingleUser from "../components/SingleUser";
import "@testing-library/jest-dom";

jest.mock("../api.js", () => ({
  fetchUsers: () =>
    Promise.resolve([
      { name: "Rob", username: "robR" },
      { name: "Nicole", username: "nicoleL" },
    ]),
}));

describe("SingleUser component", () => {
  // test("should match rendered snapshot", () => {
  //   const { asFragment } = render(<SingleUser />);
  //   expect(asFragment()).toMatchSnapshot();
  // });
  test("should display single user", async () => {
    const user = {
      name: "Nicole",
      username: "nicoleL",
      avatar_url: "path/to/img",
    };

    render(
      <UserContext.Provider
        value={{ currentUser: null, setCurrentUser: () => {} }}
      >
        <SingleUser user={user} />
      </UserContext.Provider>
    );
    await waitFor(() => {
      expect(screen.getByText("Nicole as nicoleL")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByAltText("nicoleL")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByAltText("nicoleL")).toHaveAttribute(
        "src",
        "path/to/img"
      );
    });
  });
});
