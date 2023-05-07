import { fetchTopics } from "../api.js";
import { useEffect, useState } from "react";

const TopicList = ({ setSelectedTopic }) => {
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
    <section>
      <ul>
        <li onClick={() => handleAllClick()}>all</li>
        {topics.map((topic) => {
          return (
            <li onClick={() => handleTopicClick(topic)} key={topic.slug}>
              {topic.slug}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default TopicList;
