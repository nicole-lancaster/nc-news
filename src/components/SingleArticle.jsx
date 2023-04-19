import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSingleArticle } from "../api";
import { sqlDateFormatter } from "../utils.js";
import Comments from "../components/Comments.jsx";

function SingleArticle() {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchSingleArticle(article_id).then((singleArticle) => {
      setSingleArticle(singleArticle);
      setIsLoading(false);
    });
  }, [article_id]);

  if (isLoading) return <p>Loading article...</p>

  return (
    <div>
      <article className="SingleArticle">
        <h2 className="single-article-title">{singleArticle.title}</h2>
        <img src={singleArticle.article_img_url} alt={singleArticle.title} />
        <p className="single-article-author-date">
          Written by {singleArticle.author} on{" "}
          {sqlDateFormatter(singleArticle.created_at)}
        </p>
        <p className="single-article-topic">#{singleArticle.topic}</p>
        <p className="single-article-body">{singleArticle.body}</p>
        <div className="single-article-likes-and-comments">
          <p className="single-article-votes">{singleArticle.votes} likes</p>
          <p className="single-article-comments">
            {singleArticle.comment_count} comments
          </p>
        </div>
      </article>
      <Comments
        comments={comments}
        setComments={setComments}
        article_id={article_id}
      />
    </div>
  );
}

export default SingleArticle;
