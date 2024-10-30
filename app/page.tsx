import BooksCategory from "@/components/home/BooksCategory";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import WhyRockStaddy from "@/components/home/WhyRockStaddy";
import "animate.css";

export default function Home() {
  return (
    <>
      <section className="">
        <div className="container sm:px-4">
          <Header />
          <Hero />
          <WhyRockStaddy />
          <BooksCategory />
          <Footer />
        </div>
      </section>
    </>
  );
}
