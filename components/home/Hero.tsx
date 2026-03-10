import Image from "next/image";
import Cards from "./Cards";
import logo from "@/public/assets/charLogo.svg"

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
    <section className="relative overflow-visible pt-8 min-h-[600px] h-screen">
      {/* Logos Container */}
      <div className="relative z-10 mx-auto flex w-full items-center justify-center -mt-8 sm:-mt-10 md:-mt-20 lg:-mt-24">
        {/* {logos.map((logo) => (
          <Image
            key={logo.src}
            src={logo.src}
            alt={logo.alt}
            width={184}
            height={184}
            className={`w-[184px] ${logo.className}`}
            priority={logo.src === "/assets/logo1.svg"}
          />
        ))} */}
        <Image src={logo} alt="Logo" width={500} height={500} className="w-[350px] sm:w-[500px] md:w-[700px] lg:w-[800px]" />
      </div>

      {/* Main Text Content (Left Side) */}
      {/* Is container ko humne absolute rakha hai taake ye image ke upar exact position ho sake */}
      <div className="absolute left-4 lg:left-10 bottom-[3%] z-40 flex flex-col pointer-events-none">
        {/* Agence text: weight bold aur position thodi closer */}
        <p className="font-clash text-lg sm:text-xl font-bold text-orange-300 opacity-90 mb-4">
          Agence social média
        </p>
        {/* Main Heading: line-height (leading) ko tight kiya hai for closer look */}
        <h1 className="font-beni text-[80px] sm:text-[100px] md:text-[80px] lg:text-[130px] font-black leading-[0.68] text-orange-500 uppercase">
          HUMAN <br /> <span className="text-orange-300">SOCIAL CLUB</span>
        </h1>
      </div>

      {/* Cards Container */}
      <div className="absolute left-0 right-0 z-30 px-4 sm:top-30 md:top-15 lg:top-0">
        <Cards />
      </div>
    </section>
  );
};

export default Hero;