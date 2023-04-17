export const fetchArticles = () => {
  return fetch("https://nc-news-portfolio.onrender.com/api/articles")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.articles;
    });
};
