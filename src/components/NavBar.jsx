import { useEffect } from "react";
import { fetchTopics } from "../api.js";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import UserLogin from "./UserLogin.jsx";
import {
  HomeIcon,
  UsersIcon,
  ArrowLongRightIcon,
  ArrowLongLeftIcon,
  NewspaperIcon,
  Bars3Icon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

const NavBar = ({ currentUser, users, setCurrentUser, setSelectedTopic }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics(setTopics).then((topicsList) => {
      setTopics(topicsList);
    });
  }, [setTopics]);

  const handleLogoutClick = () => {
    if (currentUser) {
      setCurrentUser(undefined);
    }
  };

  const handleAllClick = () => {
    setSelectedTopic("");
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic.slug);
  };

  return (
    <header>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <NewspaperIcon className="h-8 w-auto" />
          <h1 className="text-3xl font-bold">Nicole's NC-News</h1>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Link
              className="text-sm font-semibold leading-6 text-gray-900"
              to="/"
            >
              {/* <HomeIcon className="h-8 w-8 text-black-500" /> */}
              Home
            </Link>
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Topics
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  <ul>
                    <li onClick={() => handleAllClick()}>all</li>
                    {topics.map((topic) => {
                      return (
                        <li
                          onClick={() => handleTopicClick(topic)}
                          key={topic.slug}
                        >
                          {topic.slug}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
          <Link
            className="text-sm font-semibold leading-6 text-gray-900"
            to="/users"
          >
            {/* <UsersIcon className="h-8 w-8 text-black-500" /> */}
            Users
          </Link>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <UserLogin currentUser={currentUser} users={users} />
          {!currentUser ? (
            <>
              <Link
                className="text-sm font-semibold leading-6 text-gray-900"
                to={`/users`}
              >
                Login
                <ArrowLongRightIcon className="h-8 w-8 text-black-500" />
              </Link>
            </>
          ) : (
            <p
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={handleLogoutClick}
            >
              Logout
              <ArrowLongLeftIcon className="h-8 w-8 text-black-500" />
            </p>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
