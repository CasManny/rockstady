import { Button } from "../ui/button";
import AnimateLogo from "./AnimateLogo";

const Hero = () => {
  return (
    <div className="container mt-10 min-h-[80vh]">
      <div className="">
        <AnimateLogo />
        <h1 className="text-4xl font-semibold">
          Read, score, and keep rocking!
        </h1>
        <p>
          Turn reading into a game. Earn points, climb the leaderboard, and{" "}
          <br /> stay ahead in your career and life.
        </p>
      </div>
      <div className="mt-7 flex gap-4">
        <Button className="rounded-2xl bg-rs-yellow font-extrabold text-black hover:bg-rs-yellow/90 tracking-widest">
          Sign up for free
        </Button>
        <Button variant={"outline"} className="rounded-2xl ">
          Browse Books
        </Button>
      </div>
    </div>
  );
};

export default Hero;
