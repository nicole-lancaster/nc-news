import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSingleArticle, updateArticleVote } from "../api";
import { sqlDateFormatter } from "../utils.js";
import Comments from "../components/Comments.jsx";
import { HandThumbUpIcon, TagIcon } from "@heroicons/react/24/outline";

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
    <div className="flex flex-col items-center">
      <article className="flex flex-col items-center m-5 p-5 w-auto border shadow rounded-lg md:w-3/4 xl:3/4">
        <div className="w-auto flex flex-col justify-center xl:w-3/4">
          <img
            src={singleArticle.article_img_url}
            alt={singleArticle.title}
            className="self-center border rounded-lg w-full"
          />
          <h2 className="font-mono text-lg font-extrabold my-2 w-full">
            {singleArticle.title}
          </h2>
          <p className="font-mono text-xs italic mb-2 xl:w-3/4">
            Written by {singleArticle.author} on{" "}
            {sqlDateFormatter(singleArticle.created_at)}
          </p>
          <div className="flex flex-row  items-center font-mono font-bold text-xs py-1 w-1/3">
            <TagIcon className="w-5 h-5 fill-pink-500" />
            <p className="font-mono text-xs pl-1">{singleArticle.topic}</p>
          </div>
          <p className="font-mono text-sm self-center text-justify my-2">
            {singleArticle.body}
          </p>
          <div className="flex flex-row justify-between py-2 font-bold">
            <p className="font-mono text-xs">{comments.length} comments</p>

            <p className="font-mono text-xs">{singleArticle.votes} likes</p>
          </div>{" "}
          <button
            className="flex flex-row items-center font-mono font-bold text-xs my-2 p-1 w-1/4 bg-pink-500 shadow rounded-lg justify-center self-center"
            disabled={likeBtnDisabled}
            onClick={handleVoteClick}
          >
            <p className="items-center">Like</p>
            <HandThumbUpIcon className="h-5 w-5 pl-1 fill-none hover:fill-pink-500" />
          </button>
          {!currentUser && likeBtnDisabled === true ? (
            <p className="font-mono text-base"> You need to login first!</p>
          ) : null}{" "}
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
