import { useEffect, useState } from "react";
import { fetchArticles } from "../api.js";
import { Link } from "react-router-dom";
import { NewspaperIcon } from "@heroicons/react/24/outline";

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
      <div className="flex flex-col h-screen justify-center items-center animate-pulse">
        <NewspaperIcon className="h-8 w-auto mr-2 animate-pulse" />
        <p className="font-mono">Loading list of articles...</p>
      </div>
    );

  return (
    <section>
      <article className="flex flex-row flex-wrap justify-evenly">
        {articles
          .filter(
            (article) => !selectedTopic || article.topic === selectedTopic
          )
          .map((article) => {
            return (
              <Link
                key={article.article_id}
                to={`/articles/${article.article_id}`}
                className="border-2 border-light-gray-700 shadow rounded-lg hover:border-pink-700 m-1 p-1"
              >
                <section className="content-around mx-1 my-2 w-32 md:w-48 lg:w-60 xl:w-100 2xl:w-110">
                  <img
                    src={article.article_img_url}
                    alt={article.title}
                    className="border rounded-lg"
                  />
                  <h2 className="text-center text-xs md:text-sm lg:text-base xl:text-lg font-mono mt-2">
                    {article.title}
                  </h2>
                </section>
              </Link>
            );
          })}
      </article>
    </section>
  );
};

export default ArticleList;
