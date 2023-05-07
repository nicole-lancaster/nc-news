import { fetchTopics } from "../api.js";
import { useEffect, useState } from "react";

const TopicList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchTopics(setTopics).then((topicsList) => {
      setTopics(topicsList);
      setIsLoading(false);
    });
  }, [setTopics]);

  if (isLoading)
    return (
      <div>
        <p>Loading list of topics...</p>
      </div>
    );

  return <></>;
};

export default TopicList;
