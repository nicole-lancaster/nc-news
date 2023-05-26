import { AtSymbolIcon, NewspaperIcon } from "@heroicons/react/24/outline";
// import /home/nicole/dev/northcoders/frontend/nc-news/src/assets/github-mark-white.png
import gitHubLogo from "../assets/github-mark.png"
import linkedInLogo from "../assets/linkedInIcon.png"

const Footer = () => {
  return (
    <footer className="fixed bottom-0 bg-pink-500 w-full h-1/12 flex flex-row p-2">
      <div className="flex flex-row">
        <NewspaperIcon className="h-5 mr-2 ml-1" />
        <p className="font-mono text-xs">Created by Nicole Lancaster</p>
      </div>
      <div className="flex flex-row">
        <img
          src={gitHubLogo}
          alt="GitHub logo"
          className="h-5 text-xs mr-1"
        />
        <img
          src={linkedInLogo}
          alt="LinkedIn logo"
          className="text-xs h-5 ml-1"
        />
        <AtSymbolIcon className="h-5 ml-1" />
      </div>
    </footer>
  );
};

export default Footer;
