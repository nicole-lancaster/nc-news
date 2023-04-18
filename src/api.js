import axios from "axios";

export const fetchArticles = () => {
  return axios
    .get("https://nc-news-portfolio.onrender.com/api/articles")
    .then((response) => {
      console.log(response);
      return response
    })
    .then(({data}) => {
      return data.articles
    })
};
