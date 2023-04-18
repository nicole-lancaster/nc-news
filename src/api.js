import axios from "axios";

export const fetchArticles = () => {
  return axios
    .get("https://nc-news-portfolio.onrender.com/api/articles")
    .then((response) => {
      return response;
    })
    .then(({ data }) => {
      return data.articles;
    });
};

export const fetchSingleArticle = (article_id) => {
  return axios
    .get(`https://nc-news-portfolio.onrender.com/api/articles/${article_id}`)
    .then((response) => {
      return response;
    })
    .then(({ data }) => {
      return data.article;
    });
};
