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
      <article className="flex flex-col m-5 w-auto">
        <img
          src={singleArticle.article_img_url}
          alt={singleArticle.title}
          className="self-center rounded-lg p-2 w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2"
        />
        <h2 className="font-mono text-lg font-extrabold  mt-2">
          {singleArticle.title}
        </h2>
        <p className="font-mono text-sm self-center italic">
          Written by {singleArticle.author} on{" "}
          {sqlDateFormatter(singleArticle.created_at)}
        </p>
        <p className="font-mono text-sm">#{singleArticle.topic}</p>
        <p className="font-mono text-base self-center text-justify">
          {singleArticle.body}
        </p>
        <div className="flex flex-row flex-wrap">
          <p className="font-mono text-xs justify-start">
            {comments.length} comments
          </p>
          <p className="font-mono text-xs justify-end">
            {singleArticle.votes} likes
          </p>
          <button
            className="justify-end font-mono text-xs m-5 p-1 bg-pink-500 shadow rounded-lg"
            disabled={likeBtnDisabled}
            onClick={handleVoteClick}
          >
            <p>Like</p>
            <HandThumbUpIcon className="h-8 w-8 pl-1 fill-none hover:fill-pink-500" />
          </button>{" "}
        </div>
        {!currentUser && likeBtnDisabled === true ? (
          <p className="font-mono text-base"> You need to login first!</p>
        ) : null}{" "}
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
