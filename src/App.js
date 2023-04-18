import "./App.css";
import ArticleList from "./components/ArticleList.jsx";
import SingleArticle from "./components/SingleArticle";
import Header from "./components/Header";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  const [articles, setArticles] = useState([]);
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <ArticleList articles={articles} setArticles={setArticles} />
          }
        />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="/articles/:article_id/comments" element={<SingleArticle />} />

      </Routes>
    </div>
  );
}

export default App;
