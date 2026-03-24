import CardsStack from "@/components/home/CardsStack";
import ChooseUs from "@/components/home/ChooseUs";
import Expertise from "@/components/home/Expertise";
import FAQS from "@/components/home/FAQS";
import Hero2 from "@/components/home/Hero2";
import LogoAnimation from "@/components/home/LogoAnimation";
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
      <section id="home">
        <Hero2 />
      </section>

      <section id="our-expertise">
        <LogoAnimation />
      </section>

      {/* <HowToOrder /> */}
      {/* <CardsFlipScrollAnimation /> */}
      <section id="our-services">
        <Expertise />
      </section>

      <section>
        <VideosStack />
      </section>

      <section id="method-process">
        <CardsStack />
      </section>

      <section id="why-choose-us">
        <ChooseUs />
      </section>

      <section id="faqs">
        <FAQS />
      </section>

      <section id="blogs-preview">
        <Social blogs={socialBlogs} />
      </section>
    </div>
  );
};

export default page;
