import "./App.css";
import ArticleList from "./components/ArticleList.jsx";
import SingleArticle from "./components/SingleArticle";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import UsersList from "./components/UsersList";
import NavBar from "./components/NavBar";

function App() {
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState();
  const [currentUser, setCurrentUser] = useState();

  return (
    <div className="App">
      <NavBar
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        users={users}
        setSelectedTopic={setSelectedTopic}
        selectedTopic={selectedTopic}
      />
      <Routes>
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
              users={users}
              setUsers={setUsers}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
