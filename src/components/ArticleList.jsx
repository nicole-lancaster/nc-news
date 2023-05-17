import { useEffect, useState } from "react";
import { fetchArticles } from "../api.js";
import { Link } from "react-router-dom";

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
      <ul className="flex flex-row flex-wrap justify-evenly">
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
                <li className="content-around mx-1 my-2 w-32 md:w-48 lg:w-60 xl:w-100 2xl:w-110">
                  <img src={article.article_img_url} alt={article.title} />
                  <p className="text-sm md:text-base lg:text-lg xl:text-xl">
                    {article.title}
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
