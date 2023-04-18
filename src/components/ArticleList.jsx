import { useEffect } from "react";
import { fetchArticles } from "../api.js";
import { Link } from "react-router-dom";

const ArticleList = ({ articles, setArticles }) => {
  useEffect(() => {
    fetchArticles(setArticles).then((articlesList) => {
      setArticles(articlesList);
    });
  }, [setArticles]);

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
                  Written by {article.author} on {article.created_at}
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
