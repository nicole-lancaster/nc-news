import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSingleArticle } from "../api";

function SingleArticle({ title, topic, body }) {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  useEffect(() => {
    fetchSingleArticle(article_id).then((singleArticle) => {
      setSingleArticle(singleArticle);
    });
  }, [article_id]);

  return (
    <div>
      <article className="SingleArticle">
        <h2>{singleArticle.title}</h2>
        <img src={singleArticle.article_img_url} alt={singleArticle.title} />
        <p>
          Written by {singleArticle.author} on {singleArticle.created_at}
        </p>
        <p>{singleArticle.votes} likes</p>
        <p>{singleArticle.comment_count} comments</p>
        <p>{singleArticle.body}</p>
      </article>
    </div>
  );
}

export default SingleArticle;
