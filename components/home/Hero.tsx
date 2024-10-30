import { auth } from "@clerk/nextjs/server";
import { Button } from "../ui/button";
import AnimateLogo from "./AnimateLogo";
import Link from "next/link";

const Hero = () => {
  const { userId } = auth();
  return (
    <div className="container mt-10 min-h-[80vh] p-5 w-full animate__animated animate__zoomInDown">
      <div className="">
        <AnimateLogo />
        <h2 className="lg:text-2xl mb-2 font-semibold dark:text-white">Learn faster. Get smarter.</h2>
        <h1 className="lg:text-6xl text-2xl font-bold mb-4 dark:text-white">
          Way more than <br /> book summaries
        </h1>
        <p className="dark:text-rs-text-dark">
        Learn key points and gain insights you won't find anywhere else. <br /> Understand the world’s best ideas.
        </p>
      </div>
      {userId ? (
        <Link href={"/choose-an-adventure"} className="">
          <Button className="mt-5 bg-rs-yellow hover:bg-rs-yellow/90 font-extrabold tracking-widest">
            Improve Today
          </Button>
        </Link>
      ) : (
        <div className="mt-7 flex gap-4 flex-col md:flex-row">
          <Link href={"/sign-up"}>
            <Button className="rounded-2xl bg-rs-yellow font-extrabold text-black hover:bg-rs-yellow/90 tracking-widest">
              Sign up for free
            </Button>
          </Link>
          <Link href={"/sign-in"}>
            <Button variant={"default"} className="rounded-2xl ">
              Browse Books
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Hero;
