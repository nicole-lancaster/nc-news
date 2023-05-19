import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSingleArticle, updateArticleVote } from "../api";
import { sqlDateFormatter } from "../utils.js";
import Comments from "../components/Comments.jsx";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";

function SingleArticle({ currentUser, setCurrentUser }) {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [likeBtnDisabled, setLikeBtnDisabled] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchSingleArticle(article_id).then((singleArticle) => {
      setSingleArticle(singleArticle);
      setIsLoading(false);
    });
  }, [article_id]);

  const handleVoteClick = () => {
    if (currentUser) {
      setSingleArticle({
        ...singleArticle,
        votes: singleArticle.votes + 1,
      });
      setLikeBtnDisabled(true);
      updateArticleVote(article_id).catch(() => {
        setIsError(true);
        setSingleArticle({
          ...singleArticle,
          votes: singleArticle.votes - 1,
        });
      });
    }
    setLikeBtnDisabled(true);
  };

  if (isLoading)
    return (
      <div>
        <p className="font-mono">Loading article...</p>
      </div>
    );

  if (isError)
    return <p className="font-mono">Unable to like article at this time 🙁 </p>;

  return (
    <div>
      <article className="flex flex-col max-w-full">
        <h2 className="font-mono font-extrabold self-center">
          {singleArticle.title}
        </h2>
        <img
          src={singleArticle.article_img_url}
          alt={singleArticle.title}
          className="max-w-full self-center rounded-lg"
        />
        <p className="font-mono self-center italic">
          Written by {singleArticle.author} on{" "}
          {sqlDateFormatter(singleArticle.created_at)}
        </p>
        <p className="font-mono">#{singleArticle.topic}</p>
        <p className="font-mono max-w-fit self-center">{singleArticle.body}</p>
        <div className="">
          <p className="font-mono">{singleArticle.votes} likes</p>
          <button
            className="font-mono"
            disabled={likeBtnDisabled}
            onClick={handleVoteClick}
          >
            Like this article
            <HandThumbUpIcon className="h-8 w-8 fill-none hover:fill-cyan-200" />
          </button>
          {!currentUser && likeBtnDisabled === true ? (
            <p className="font-mono"> You need to login first!</p>
          ) : null}
          <p className="font-mono">{comments.length} comments</p>
        </div>
      </article>
      <Comments
        comments={comments}
        setComments={setComments}
        article_id={article_id}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
    </div>
  );
}

export default SingleArticle;
