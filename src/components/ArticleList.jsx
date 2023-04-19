import { useEffect, useState } from "react";
import { fetchArticles } from "../api.js";
import { Link } from "react-router-dom";
import { sqlDateFormatter } from "../utils.js";

const ArticleList = ({ articles, setArticles }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchArticles(setArticles).then((articlesList) => {
      setArticles(articlesList);
      setIsLoading(false);
    });
  }, [setArticles]);

  if (isLoading) return <p>Loading list of articles...</p>;

  return (
    <section>
      <ul className="list-flex-container">
        {articles.map((article) => {
          return (
            <Link
              key={article.article_id}
              to={`/articles/${article.article_id}`}
            >
              <li className="article-flex-item">
                <img
                  className="article-list-article-img"
                  src={article.article_img_url}
                  alt={article.title}
                />
                <h2 className="article-list-article-title">{article.title} </h2>
                <p className="article-list-article-date">
                  Written by {article.author} on
                  {sqlDateFormatter(article.created_at)}
                </p>
              </li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
};

export default ArticleList;
