import { GithubIcon } from "lucide-react";
import { Button } from "./ui/button";

function Github() {
  return (
    <a
      href="https://github.com/acdpdev/nuclear-simulator"
      target="_blank"
      rel="noreferrer"
    >
      <Button variant={"outline"}>
        <GithubIcon />
      </Button>
    </a>
  );
}

export { Github };
