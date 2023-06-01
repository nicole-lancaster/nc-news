import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { fetchSingleArticle, updateArticleVote } from "../api";
import { sqlDateFormatter } from "../utils.js";
import Comments from "../components/Comments.jsx";
import {
  HandThumbUpIcon,
  TagIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";
import { UserContext } from "../contexts/User.js";

function SingleArticle() {
  const { article_id } = useParams();
  const { currentUser, setCurrentUser } = useContext(UserContext);
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
      <div className="flex flex-col h-screen justify-center items-center animate-pulse">
        <NewspaperIcon className="h-8 w-auto mr-2 animate-pulse" />
        <p className="font-mono">Loading article...</p>
      </div>
    );

  if (isError)
    return <p className="font-mono">Unable to like article at this time 🙁 </p>;

  return (
    <div className="flex flex-col items-center">
      <article className="flex flex-col items-center m-5 p-5 w-auto border shadow rounded-lg md:w-3/4 xl:w-1/2">
        <section className="w-auto flex flex-col justify-center">
          <img
            src={singleArticle.article_img_url}
            alt={singleArticle.title}
            className="self-center border rounded-lg w-full"
          />
          <h2 className="font-mono text-lg md:text-xl 2xl:text-3xl font-extrabold my-2 w-full">
            {singleArticle.title}
          </h2>
          <p className="font-mono text-xs md:text-sm 2xl:text-xl italic mb-2">
            Written by {singleArticle.author} on{" "}
            {sqlDateFormatter(singleArticle.created_at)}
          </p>
          <div className="flex flex-row  items-center font-mono font-bold text-xs py-1 w-1/3">
            <TagIcon className="w-5 h-5 fill-pink-500" />
            <p className="font-mono text-xs 2xl:text-lg pl-1">
              {singleArticle.topic}
            </p>
          </div>
          <p className="font-mono text-sm lg:text-lg 2xl:text-2xl text-justify my-2">
            {singleArticle.body}
          </p>
          <div className="flex flex-row justify-between py-2 font-bold">
            <p className="font-mono text-xs 2xl:text-lg">
              {comments.length} comments
            </p>
            <p className="font-mono text-xs 2xl:text-lg">
              {singleArticle.votes} likes
            </p>
          </div>{" "}
          <button
            className="flex flex-row items-center font-mono font-bold text-xs 2xl:text-lg my-2 p-1 w-1/4 bg-pink-500 shadow rounded-lg justify-center self-center"
            disabled={likeBtnDisabled}
            onClick={handleVoteClick}
          >
            <p className="items-center">Like</p>
            <HandThumbUpIcon className="h-5 w-5 pl-1 fill-none hover:fill-pink-500" />
          </button>
          {!currentUser && likeBtnDisabled === true ? (
            <p className="font-mono text-base"> You need to login first!</p>
          ) : null}{" "}
        </section>
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
