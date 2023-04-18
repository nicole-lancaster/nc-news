import { fetchCommentsByArticle } from "../api";
import { useEffect } from "react";

const Comments = ({ article_id, comments, setComments }) => {
  useEffect(() => {
    fetchCommentsByArticle(article_id).then((comments) => {
      setComments(comments);
    });
  }, [article_id, comments, setComments]);

  return (
    <section className="Comments">
      <h3>Comments</h3>
    
    </section>
  );
};

export default Comments;
