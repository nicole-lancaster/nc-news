import { render, screen, waitFor } from "@testing-library/react";
import UsersList from "../components/UsersList";
import { UserContext } from "../contexts/User";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../api.js", () => ({
  fetchUsers: () =>
    Promise.resolve([
      { name: "Rob", username: "robR" },
      { name: "Nicole", username: "nicoleL" },
    ]),
}));

describe("Users List component", () => {
  test("should match rendered snapshot", () => {
    const { asFragment } = render(<UsersList />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should display users", async () => {
    render(
      <UserContext.Provider
        value={{ currentUser: undefined, setCurrentUser: () => {} }}
      >
        <UsersList />
      </UserContext.Provider>
    );
    await waitFor(() => {
      expect(screen.getByText("Rob as robR")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Nicole as nicoleL")).toBeInTheDocument();
    });
  });
});
