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

  if (isLoading) return <p>Loading list of topics...</p>;

  return (
    <section className="topic-list-flex-container">
      <h2>Topics</h2>
      <ul>
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
