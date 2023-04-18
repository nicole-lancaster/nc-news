import axios from "axios";

export const fetchArticles = () => {
  return axios
    .get("https://nc-news-portfolio.onrender.com/api/articles")
    .then(({ data }) => {
      return data.articles;
    });
};

export const fetchSingleArticle = (article_id) => {
  return axios
    .get(`https://nc-news-portfolio.onrender.com/api/articles/${article_id}`)
    .then(({ data }) => {
      return data.article;
    });
};

export const fetchCommentsByArticle = (article_id) => {
  return axios
    .get(
      `https://nc-news-portfolio.onrender.com//api/articles/${article_id}/comments`
    )
    .then(({ response }) => {
      return response;
    });
};
