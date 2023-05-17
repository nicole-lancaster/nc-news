import { useEffect, useState } from "react";
import { fetchArticles } from "../api.js";
import { Link } from "react-router-dom";
import { sqlDateFormatter } from "../utils.js";

const ArticleList = ({ articles, setArticles, selectedTopic }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchArticles(setArticles).then((articlesList) => {
      setArticles(articlesList);
      setIsLoading(false);
    });
  }, [setArticles]);

  if (isLoading)
    return (
      <div>
        <p>Loading list of articles...</p>
      </div>
    );

  return (
    <section>
      <ul>
        {articles
          .filter(
            (article) => !selectedTopic || article.topic === selectedTopic
          )
          .map((article) => {
            return (
              <Link
                key={article.article_id}
                to={`/articles/${article.article_id}`}
              >
                <li className="w-32 md:w-48 lg:w-60 xl:w-100 2xl:w-110">
                  <img
                    src={article.article_img_url}
                    alt={article.title}
                  />
                  <div>
                  <p className="text-sm md:text-base lg:text-lg"> {article.title}</p>
                  <p className="text-xs md:text-sm lg:text-base italic">
                    Written by {article.author} on 
                    {sqlDateFormatter(article.created_at)}
                  </p>
                  </div>
                </li>
              </Link>
            );
          })}
      </ul>
    </section>
  );
};

export default ArticleList;
