import "./App.css";
import ArticleList from "./components/ArticleList.jsx";
import SingleArticle from "./components/SingleArticle";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import UsersList from "./components/UsersList";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState();
  const [currentUser, setCurrentUser] = useState();

  return (
    <div className="flex flex-col items-center h-screen">
      <NavBar
        users={users}
        setSelectedTopic={setSelectedTopic}
        selectedTopic={selectedTopic}
      />
      <main className="flex flex-grow">
        <Routes className="">
          <Route
            path="/"
            element={
              <>
                <ArticleList
                  articles={articles}
                  setArticles={setArticles}
                  selectedTopic={selectedTopic}
                />
              </>
            }
          />
          <Route
            path="/articles/:article_id"
            element={
              <SingleArticle
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/users"
            element={
              <UsersList
                className="flex flex-col flex-grow"
                users={users}
                setUsers={setUsers}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
