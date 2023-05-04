import { fetchTopics } from "../api.js";
import { useEffect, useState } from "react";

const TopicList = ({ selectedTopic, setSelectedTopic }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchTopics(setTopics).then((topicsList) => {
      setTopics(topicsList);
      setIsLoading(false);
    });
  }, [setTopics]);

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic.slug);
  };

  const handleAllClick = () => {
    setSelectedTopic("");
  };

  if (isLoading)
    return (
      <div>
        <p>Loading list of topics...</p>
      </div>
    );

  return (
    <section className="topic-list-flex-container">
      <h2>Topics</h2>
      <ul>
        <li
          onClick={() => handleAllClick()}
          className={`single-topic ${
            !selectedTopic ? "single-topic-currently-selected" : ""
          }`}
        >
          all
        </li>
        {topics.map((topic) => {
          return (
            <li
              onClick={() => handleTopicClick(topic)}
              key={topic.slug}
              className={`single-topic ${
                topic.slug === selectedTopic
                  ? "single-topic-currently-selected"
                  : ""
              }`}
            >
              {topic.slug}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default TopicList;
