import CardsStack from "@/components/home/CardsStack";
import ChooseUs from "@/components/home/ChooseUs";
import Expertise from "@/components/home/Expertise";
import FAQS from "@/components/home/FAQS";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import Hero2 from "@/components/home/Hero2";
import LogoAnimation from "@/components/home/LogoAnimation";
import Navbar from "@/components/home/Navbar";
import Social from "@/components/home/Social";
import VideosStack from "@/components/home/VideosStack";
import { getBlogs } from "@/lib/services/blogService";

const page = async () => {
  const blogs = await getBlogs();

  const socialBlogs = blogs.slice(0, 5).map((blog) => ({
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    coverImage: blog.coverImage ?? "/assets/choose1.avif",
    tags: blog.tags,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero2 />
      <LogoAnimation />
      {/* <CardsFlipScrollAnimation /> */}
      <Expertise />
      <VideosStack />
      <CardsStack />
      <ChooseUs />
      <FAQS />
      <Social blogs={socialBlogs} />
      <Footer />
    </div>
  );
};

export default page;
