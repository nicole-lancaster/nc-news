import { useEffect } from "react";
import { fetchTopics } from "../api.js";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import UserLogin from "./UserLogin.jsx";
import {
  ArrowLongRightIcon,
  ArrowLongLeftIcon,
  NewspaperIcon,
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
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

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
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
          
            <Link
              className="text-sm font-semibold rounded-lg leading-6 text-gray-900  hover:bg-pink-500"
              to="/"
            >
              Home
            </Link>
            <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold rounded-lg leading-6 text-gray-900  hover:bg-pink-500">
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
                  <div onClick={() => handleAllClick()}>all</div>
                  {topics.map((topic) => (
                    <div
                      onClick={() => handleTopicClick(topic)}
                      key={topic.slug}
                    >
                      <div className="flex-auto">{topic.slug}</div>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
          <Link
            className="text-sm font-semibold rounded-lg leading-6 text-gray-900  hover:bg-pink-500"
            to="/users"
          >
            Users
          </Link>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <UserLogin currentUser={currentUser} users={users} />
          {!currentUser ? (
            <>
              <Link
                className="text-sm font-semibold rounded-lg leading-6 text-gray-900  hover:bg-pink-500"
                to={`/users`}
              >
                Login
                <ArrowLongRightIcon className="h-8 w-8 text-black-500  hover:bg-pink-500" />
              </Link>
            </>
          ) : (
            <p
              className="text-sm font-semibold rounded-lg leading-6 text-gray-900  hover:bg-pink-500"
              onClick={handleLogoutClick}
            >
              Logout
              <ArrowLongLeftIcon className="h-8 w-8 text-black-500" />
            </p>
          )}
        </div>
      </nav>

      {/* mobile menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <p className="-m-1.5 p-1.5"></p>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Link
                          className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-pink-500"
                          to="/"
                        >
                          Home
                        </Link>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-pink-500">
                          Topics
                          <ChevronDownIcon
                            className={classNames(
                              open ? "rotate-180" : "",
                              "h-5 w-5 flex-none"
                            )}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {[...topics].map((topic) => (
                            <Disclosure.Button
                              onClick={() => handleTopicClick(topic)}
                              key={topic.slug}
                              as="a"
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-medium leading-7 text-gray-900  hover:bg-pink-500"
                            >
                              {topic.slug}
                            </Disclosure.Button>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <Link
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-pink-500"
                    to="/users"
                  >
                    Users
                  </Link>
                  <div className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900  hover:bg-pink-500">
                    <UserLogin currentUser={currentUser} users={users} />
                    {!currentUser ? (
                      <div className="py-6">
                        <Link
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-pink-500"
                          to={`/users`}
                        >
                          Login
                          <ArrowLongRightIcon className="h-8 w-8 text-black-500" />
                        </Link>
                      </div>
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
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default NavBar;
