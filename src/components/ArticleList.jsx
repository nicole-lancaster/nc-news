import { useEffect, useState } from "react";
import { fetchArticles } from "../api.js";
import { Link } from "react-router-dom";
import { sqlDateFormatter } from "../utils.js";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";

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
        <Spinner animation="border" role="status"></Spinner>
        <p>Loading list of articles...</p>
      </div>
    );

  return (
    <section>
      <ul className="list-flex-container">
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
                <li className="article-flex-item">
                  <Card style={{ width: "30rem" }}>
                    <Card.Img
                      variant="top"
                      src={article.article_img_url}
                      alt={article.title}
                    />
                    <Card.Body>
                      <Card.Title> {article.title}</Card.Title>
                      <Card.Text>
                        Written by {article.author} on
                        {sqlDateFormatter(article.created_at)}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </li>
              </Link>
            );
          })}
      </ul>
    </section>
  );
};

export default ArticleList;
