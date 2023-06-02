import { render, screen } from "@testing-library/react";
import UsersList from "../components/UsersList";
import { UserContext } from "../contexts/User";

jest.mock("../api.js", () => ({
  fetchUsers: () =>
    Promise.resolve([
      { name: "Rob", username: "robR" },
      { name: "Nicole", username: "nicoleL" },
    ]),
}));

describe("Users List component", () => {
  test("should match rendered snapshot", () => {
    const { asFragment } = render(
      <UsersList />
    );
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

    await screen.findByText("Rob as robR");
    await screen.findByText("Nicole as nicoleL");
  });
});
