import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSingleArticle, updateArticleVote } from "../api";
import { sqlDateFormatter } from "../utils.js";
import Comments from "../components/Comments.jsx";

function SingleArticle({currentUser}) {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchSingleArticle(article_id).then((singleArticle) => {
      setSingleArticle(singleArticle);
      setIsLoading(false);
    });
  }, [article_id]);

  const handleVoteClick = () => {
    setSingleArticle({
      ...singleArticle,
      votes: singleArticle.votes + 1,
    });
    setDisabled(true);
    updateArticleVote(article_id).catch(() => {
      setIsError(true);
      setSingleArticle({
        ...singleArticle,
        votes: singleArticle.votes - 1,
      });
      setDisabled(false);
    });
  };

  if (isLoading) return <p>Loading article...</p>;
  if (isError) return <p>Unable to like article at this time 🙁</p>;

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
          <button
            className="single-article-like-btn"
            disabled={disabled}
            onClick={handleVoteClick}
          >
            Like this article
          </button>
          <p className="single-article-comments">{comments.length} comments</p>
        </div>
      </article>
      <Comments
        comments={comments}
        setComments={setComments}
        article_id={article_id}
        currentUser={currentUser}
      />
    </div>
  );
}

export default SingleArticle;
