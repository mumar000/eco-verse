import Image from "next/image";
import Cards from "./Cards";

const logos = [
  { src: "/assets/logo1.svg", alt: "Logo 1", className: "-mr-6" },
  { src: "/assets/logo2.svg", alt: "Logo 2", className: "" },
  { src: "/assets/logo3.svg", alt: "Logo 3", className: "-mr-1" },
  { src: "/assets/logo4.svg", alt: "Logo 4", className: "-mr-1" },
  { src: "/assets/logo5.svg", alt: "Logo 5", className: "-mr-5" },
  { src: "/assets/logo6.svg", alt: "Logo 6", className: "" },
];

const Hero = () => {
  return (
    <section className="relative overflow-visible pt-8">
      <div className="relative z-10 mx-auto flex w-full items-center justify-center">
        {logos.map((logo) => (
          <Image
            key={logo.src}
            src={logo.src}
            alt={logo.alt}
            width={184}
            height={184}
            className={`w-[184px] ${logo.className}`}
            priority={logo.src === "/assets/logo1.svg"}
          />
        ))}
      </div>
      <div className="absolute left-0 right-0 top-0 z-30 px-4 md:top-0">
        <Cards />
      </div>
    </section>
  );
};

export default Hero;
