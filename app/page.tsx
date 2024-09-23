import BooksCategory from "@/components/home/BooksCategory";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import WhyRockStaddy from "@/components/home/WhyRockStaddy";
import 'animate.css'


export default function Home() {
  
  return (
    <>
      <section className="container bg-white text-black">
        <Header />
        <Hero />
        <WhyRockStaddy />
        <BooksCategory />
        <Footer />
      </section>
    </>
  );
}
