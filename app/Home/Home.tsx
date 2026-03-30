import CardsStack from "@/components/home/CardsStack";
import ChooseUs from "@/components/home/ChooseUs";
import Expertise from "@/components/home/Expertise";
import FAQS from "@/components/home/FAQS";
import Hero2 from "@/components/home/Hero2";
import LogoAnimation from "@/components/home/LogoAnimation";
import Social from "@/components/home/Social";
import TeamPartners from "@/components/home/TeamPartners";
import VideosStack from "@/components/home/VideosStack";
import { getPublishedBlogs } from "@/lib/services/blogService";

const page = async () => {
  const blogs = await getPublishedBlogs();

  const socialBlogs = blogs.slice(0, 5).map((blog) => ({
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    coverImage: blog.coverImage ?? "/assets/choose1.avif",
    tags: blog.tags,
  }));

  return (
    <div className="min-h-screen bg-background">
      <section id="home" className="scroll-mt-24">
        <Hero2 />
      </section>

      <section id="our-services" className="scroll-mt-24">
        <LogoAnimation />
      </section>

      <section id="our-expertise" className="scroll-mt-24">
        <Expertise />
      </section>

      <section className="scroll-mt-24">
        <VideosStack />
      </section>

      <section id="method-process" className="scroll-mt-24">
        <CardsStack />
      </section>

      <section id="why-choose-us" className="scroll-mt-24">
        <ChooseUs />
      </section>
      <section id="team-partners" className="scroll-mt-24">
        <TeamPartners />
      </section>

      <section id="faqs" className="scroll-mt-24">
        <FAQS />
      </section>

      <section id="blogs-preview" className="scroll-mt-24">
        <Social blogs={socialBlogs} />
      </section>
    </div>
  );
};

export default page;
