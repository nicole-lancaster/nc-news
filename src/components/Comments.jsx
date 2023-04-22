import { fetchCommentsByArticleID } from "../api";
import { useEffect, useState } from "react";
import { sqlDateFormatter } from "../utils.js";
import { postComment } from "../api.js";

const Comments = ({
  article_id,
  comments,
  setComments,
  currentUser,
  setCurrentUser,
}) => {
  const [isLoading, setIsLoading] = useState(true);
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
    setIsLoading(true);
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

        setIsLoading(false);
      })
      .catch((err) => {
        setPostingError(true);
      });
  };

  if (isError)
    return <p>Sorry, we are unable to load comments at the moment</p>;

  if (isPostingError)
    return <p>Sorry, we are unable to post your comment at the moment</p>;

  if (isLoading) return <p>Loading comments...</p>;

  return (
    <section className="Comments">
      <h3>Comments</h3>
      <form onSubmit={handleCommentSubmit} className="postCommentForm">
        <label htmlFor="comment-input-box">Post your comment!</label>
        <textarea
          required
          type="text"
          value={commentBody}
          placeholder="Write your comment here..."
          onChange={(event) => {
            setCommentBody(event.target.value);
          }}
        />

        <button type="submit">Post</button>
        {isLoading ? <p>Posting comment...</p> : null}
        {hasPosted ? <p>Comment added!</p> : null}
      </form>
      <ul className="comments-flex-container">
        {comments.length === 0
          ? "No comments - be the first to post one!"
          : comments.map((comment) => {
              return (
                <li key={comment.comment_id} className="comment-flex-item">
                  <p>{comment.body}</p>
                  <p className="comment-author-date">
                    posted by {comment.author} at{" "}
                    {sqlDateFormatter(comment.created_at)}
                  </p>
                  <p>{comment.votes} likes</p>
                </li>
              );
            })}
      </ul>
    </section>
  );
};

export default Comments;
