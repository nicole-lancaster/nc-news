import { fetchCommentsByArticleID } from "../api";
import { useEffect, useState } from "react";
import { sqlDateFormatter } from "../utils.js";
import { postComment } from "../api.js";
import { NewspaperIcon } from "@heroicons/react/24/outline";

const Comments = ({
  article_id,
  comments,
  setComments,
  currentUser,
  setCurrentUser,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isPostingError, setPostingError] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const [hasPosted, setHasPosted] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchCommentsByArticleID(article_id)
      .then((comments) => {
        setComments(comments);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [article_id, setComments]);

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    setIsCommentLoading(true);
    const newComment = {
      article_id: article_id,
      username: currentUser?.username,
      body: commentBody,
    };
    postComment(newComment)
      .then((response) => {
        setHasPosted(true);
        setComments([response.data.comment, ...comments]);
        setCurrentUser(currentUser);
        setIsCommentLoading(false);
        setCommentBody("");
      })
      .catch(() => {
        setIsCommentLoading(false);
        setHasPosted(false);
        setPostingError(true);
      });
  };

  if (isError) return <p>Unable to load comments at this time</p>;

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center animate-pulse">
        <NewspaperIcon className="h-8 w-auto mr-2 animate-pulse" />
        <p className="font-mono">Loading comments...</p>
      </div>
    );

  return (
    <section className="flex flex-col items-center m-5 p-5 w-auto md:w-3/4 xl:w-1/2">
      <h3 className="font-mono text-base 2xl:text-xl m-5 font-bold">Comments</h3>
      <form
        onSubmit={handleCommentSubmit}
        className="flex flex-col p-5 m-5 border-2 border-pink-500 shadow rounded-lg w-auto md:w-3/4 xl:w-1/2 "
      >
        <label className="font-mono" htmlFor="comment-input-box"></label>
        <textarea
          required
          type="text"
          value={commentBody}
          placeholder="Write your comment here..."
          className="font-mono"
          onChange={(event) => {
            setCommentBody(event.target.value);
          }}
        />
        <button className="font-mono" type="submit">
          Post
        </button>
      </form>
      {isCommentLoading && currentUser ? (
        <p className="font-mono text-center font-bold">Posting comment...</p>
      ) : null}
      {hasPosted && currentUser ? (
        <p className="font-mono text-center font-bold">Comment added!</p>
      ) : null}{" "}
      {isPostingError && !currentUser ? (
        <p className="font-mono font-bold text-center w-auto md:w-3/4 xl:w-1/2 ">
          Sorry, we are unable to post your comment. Check you are logged in
          then try again!
        </p>
      ) : null}
      <ul className="font-mono flex flex-col">
        {comments.length === 0
          ? "No comments - be the first to post one!"
          : comments.map((comment) => {
              return (
                <li
                  key={comment.comment_id}
                  className="flex flex-col p-5 self-center m-5 border-2 border-black shadow rounded-lg w-auto md:w-3/4 xl:w-1/2 "
                >
                  <p className="font-mono text-xs 2xl:text-base italic ml-1">
                    by {comment.author} at{" "}
                    {sqlDateFormatter(comment.created_at)}
                  </p>
                  <p className="font-mono text-sm 2xl:text-lg my-3">{comment.body}</p>
                  <p className="font-mono font-bold text-xs 2xl:text-lg flex flex-row justify-end mr-1">{comment.votes} likes</p>
                </li>
              );
            })}
      </ul>
    </section>
  );
};

export default Comments;
