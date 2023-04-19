import { fetchCommentsByArticleID } from "../api";
import { useEffect } from "react";

const Comments = ({ article_id, comments, setComments }) => {
  useEffect(() => {
    if (typeof article_id !== "undefined" && article_id !== "") {
      fetchCommentsByArticleID(article_id)
        .then((comments) => {
          setComments(comments);
          console.log("comments: -->", {comments});
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [article_id, setComments]);

  return (
    <section className="Comments">
      <h3>Comments</h3>
      <p>Hello</p>
      <ul>
         {comments[2].body}
      </ul>
     
    </section>
  );
};

export default Comments;
