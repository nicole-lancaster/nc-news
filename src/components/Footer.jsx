import { CodeBracketIcon } from "@heroicons/react/24/outline";
import gitHubLogo from "../assets/github-mark.png";
import linkedInLogo from "../assets/linkedInIcon.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-pink-500 w-full flex flex-row p-2 justify-between mt-2">
      <div className="flex flex-row items-center">
        <CodeBracketIcon className="h-5 mr-2" />
        <p className="font-mono font-pink-500 font-bold text-xs">Created by Nicole Lancaster</p>
      </div>
      <div className="flex flex-row">
        <Link to={"https://github.com/nicole-lancaster"} target="_blank">
          <img
            src={gitHubLogo}
            alt="GitHub logo"
            className="h-5 text-xs mr-1"
          />
        </Link>
        <Link
          to={"https://www.linkedin.com/in/nicole-lancaster-614929142/"}
          target="_blank"
        >
          <img
            src={linkedInLogo}
            alt="LinkedIn logo"
            className="text-xs h-5 ml-1"
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
