import { CodeBracketIcon } from "@heroicons/react/24/outline";
import gitHubLogo from "../assets/github-mark.png";
import linkedInLogo from "../assets/linkedInIcon.png";

const Footer = () => {
  return (
    <footer className="bg-pink-500 w-full flex flex-row p-2 justify-between mt-2">
      <div className="flex flex-row items-center">
        <CodeBracketIcon className="h-5 mr-2" />
        <p className="font-mono font-pink-500 font-bold text-xs">Created by Nicole Lancaster</p>
      </div>
      <div className="flex flex-row">
        <a href={"https://github.com/nicole-lancaster"} target="_blank" rel="noreferrer">
          <img
            src={gitHubLogo}
            alt="GitHub logo"
            className="h-5 text-xs mr-1"
          />
        </a>
        <a
          href={"https://www.linkedin.com/in/nicole-lancaster-614929142/"}
          target="_blank" rel="noreferrer"
        >
          <img
            src={linkedInLogo}
            alt="LinkedIn logo"
            className="text-xs h-5 ml-1"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
