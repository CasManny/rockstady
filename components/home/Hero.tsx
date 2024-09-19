import { Button } from "../ui/button";
import AnimateLogo from "./AnimateLogo";

const Hero = () => {
  return (
    <div className="container mt-10 min-h-[80vh] p-5 w-full">
      <div className="">
        <AnimateLogo />
        <h1 className="lg:text-4xl text-2xl font-semibold mb-4">
          Read, score, and keep rocking!
        </h1>
        <p>
          Turn reading into a game. Earn points, climb the leaderboard, and{" "}
          <br /> stay ahead in your career and life.
        </p>
      </div>
      <div className="mt-7 flex gap-4 flex-col md:flex-row">
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
