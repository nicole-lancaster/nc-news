import './App.css';
import ArticleList from './components/ArticleList.jsx';
import Header from './components/Header';
import { useState } from "react";


function App() {
  const [articles, setArticles] = useState([])
  return (
    <div className="App">
     <Header/>
     <ArticleList articles={articles} setArticles={setArticles}/>
    </div>
  );
}

export default App;
