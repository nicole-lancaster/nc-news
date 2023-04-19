import { fetchCommentsByArticleID } from "../api";
import { useEffect } from "react";

const Comments = ({ article_id, comments, setComments }) => {
  useEffect(() => {
    if (typeof article_id !== "undefined" && article_id !== "") {
      fetchCommentsByArticleID(article_id)
        .then((comments) => {
          setComments(comments);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [article_id, setComments]);

  return (
    <section className="Comments">
      <h3>Comments</h3>
      <ul className="comments-flex-container">
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id} className="comment-flex-item">
              <p>{comment.body}</p>
              <p className="comment-author-date">
                posted by {comment.author} at {comment.created_at}
              </p>
              <p>{comment.votes} votes</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Comments;
