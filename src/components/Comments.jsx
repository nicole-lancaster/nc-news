import { fetchCommentsByArticleID } from "../api";
import { useEffect, useState } from "react";
import { sqlDateFormatter } from "../utils.js";


const Comments = ({ article_id, comments, setComments }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    if (typeof article_id !== "undefined" && article_id !== "") {
      fetchCommentsByArticleID(article_id)
        .then((comments) => {
          setComments(comments);
          setIsLoading(false)
        })
        .catch(() => {
      setIsError(true) 
        })
    }
  }, [article_id, setComments]);

  if (isError) return <p>Unable to load comments</p>
  if (isLoading) return <p>Loading comments...</p>

  return (
    <section className="Comments">
      <h3>Comments</h3>
      {comments.comment_count=== 0 ? "No comments - be the first to post one!" : null }
      <ul className="comments-flex-container">
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id} className="comment-flex-item">
              <p>{comment.body}</p>
              <p className="comment-author-date">
                posted by {comment.author} at {sqlDateFormatter(comment.created_at)}
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
