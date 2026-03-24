"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, X, Phone, Mail } from "lucide-react";
import {
  FaWhatsapp,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaPinterestP,
} from "react-icons/fa";
import qrImage from "@/public/assets/qr.avif";
import Image from "next/image";

import echoLogo from "@/public/assets/echoverse-logo.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const HOME_SECTION_KEY = "echoverse-home-section";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const slideEase = [0.76, 0, 0.24, 1] as const;

  const socialIcons = [
    { id: 1, icon: <FaInstagram size={18} />, x: 25, y: -60, delay: 0.05 },
    { id: 2, icon: <FaLinkedinIn size={18} />, x: -30, y: -60, delay: 0.1 },
    { id: 3, icon: <FaWhatsapp size={18} />, x: -65, y: -20, delay: 0.15 },
    { id: 4, icon: <Mail size={18} />, x: -55, y: 30, delay: 0.2 },
  ];

  const leftPanelVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { duration: 0.8, ease: slideEase } },
    exit: { x: "-100%", transition: { duration: 0.8, ease: slideEase } },
  };

  const rightPanelVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { duration: 0.8, ease: slideEase } },
    exit: { x: "100%", transition: { duration: 0.8, ease: slideEase } },
  };

  const menuLinks = [
    { name: "HOME", type: "section", target: "home", active: false },
    {
      name: "OUR EXPERTISE",
      type: "section",
      target: "our-expertise",
      active: false,
    },
    {
      name: "OUR SERVICES",
      type: "section",
      target: "our-services",
      active: true,
    },
    {
      name: "METHOD & PROCESS",
      type: "section",
      target: "method-process",
      active: false,
    },
    {
      name: "WHY CHOOSE US",
      type: "section",
      target: "why-choose-us",
      active: false,
    },
    { name: "FAQ'S", type: "section", target: "faqs", active: false },
    { name: "BLOGS", type: "section", target: "blogs-preview", active: false },
    {
      name: "CONTACT US",
      type: "section",
      target: "contact-us",
      active: false,
    },
  ];

  const scrollToSection = (target: string) => {
    const section = document.getElementById(target);

    if (!section) {
      return false;
    }

    const performScroll = (behavior: ScrollBehavior) => {
      const updatedSection = document.getElementById(target);

      if (!updatedSection) {
        return;
      }

      const sectionTop =
        updatedSection.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: Math.max(0, sectionTop),
        behavior,
      });
    };

    performScroll("smooth");

    // Re-align after layout settles for long/sticky sections lower on the page.
    window.setTimeout(() => performScroll("auto"), 250);
    window.setTimeout(() => performScroll("auto"), 700);
    window.setTimeout(() => performScroll("auto"), 1200);

    window.history.replaceState(null, "", `/#${target}`);

    return true;
  };

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const pendingTarget =
      window.sessionStorage.getItem(HOME_SECTION_KEY) ??
      window.location.hash.replace("#", "");

    if (!pendingTarget) {
      return;
    }

    let attemptCount = 0;

    const scrollToHashSection = () => {
      const didScroll = scrollToSection(pendingTarget);

      if (didScroll) {
        window.sessionStorage.removeItem(HOME_SECTION_KEY);
        return;
      }

      attemptCount += 1;

      if (attemptCount < 20) {
        window.setTimeout(scrollToHashSection, 150);
      }
    };

    scrollToHashSection();
  }, [pathname]);

  const handleMenuNavigation = (
    target: string,
    type: "section" | "route",
  ) => {
    setIsOpen(false);

    if (type === "route") {
      router.push(target);
      return;
    }

    if (pathname === "/") {
      const didScroll = scrollToSection(target);

      if (!didScroll) {
        window.sessionStorage.setItem(HOME_SECTION_KEY, target);
        router.push("/");
      }

      return;
    }

    window.sessionStorage.setItem(HOME_SECTION_KEY, target);
    router.push("/");
  };

  return (
    <>
      {/* HEADER LOGO & MENU BUTTON */}
      <div className="absolute left-0 top-0 z-[100] w-full bg-transparent pointer-events-none -mt-18 sm:-mt-20">
        <div className="flex items-center justify-between pointer-events-auto mt-5">
          <div>
            <Link href={"/"}>
              <Image
                className="w-50 sm:w-60 h-full"
                src={echoLogo}
                alt="Echo Verse Logo"
              />
            </Link>
          </div>
          <button
            onClick={toggleMenu}
            className={`rounded-full p-5 sm:p-6 transition-all duration-300 mr-7 cursor-pointer hover:scale-110 ${
              isOpen
                ? "bg-orange-400 text-[#00522D]"
                : "bg-orange-300 text-black"
            }`}
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.4 }}
            >
              {isOpen ? <X size={18} /> : <MenuIcon size={18} />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* FULLSCREEN MENU */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex overflow-hidden">
            <motion.div
              variants={leftPanelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-1/2 h-full bg-[#00522D] flex flex-col justify-center pl-[4%] sm:pl-[8%] lg:pl-[10%] pt-20"
            >
              <nav className="flex flex-col mb-6">
                {menuLinks.map((link, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      handleMenuNavigation(
                        link.target,
                        link.type as "section" | "route",
                      )
                    }
                    className={`font-beni font-black text-[2rem] sm:text-[3rem] lg:text-[4rem] leading-[0.8] cursor-pointer uppercase transition-colors duration-300 hover:text-orange-400 ${
                      link.active ? "text-orange-400" : "text-white"
                    } text-left`}
                  >
                    {link.name}
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-1 sm:gap-2">
                {[FaInstagram, FaTiktok, FaPinterestP, FaLinkedinIn].map(
                  (Icon, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="text-white border-2 border-white rounded-full p-1.5 lg:p-2.5 hover:bg-white hover:text-[#00522D] transition-colors duration-300"
                    >
                      <Icon size={20} />
                    </a>
                  ),
                )}
              </div>
            </motion.div>
            <motion.div
              variants={rightPanelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-1/2 h-full bg-[#00522D] flex flex-col justify-center items-center px-8 pl-[12%] pt-10"
            >
              <Image src={qrImage} alt="QR Image" />
              <h2 className="font-beni font-black text-[30px] md:text-[50px] lg:text-[70px] leading-[0.7] text-white text-center uppercase sm:pt-0 pt-4">
                <span className="block">SHALL WE</span>
                <span className="block">CONNECT ON</span>
                <span className="block">WHATSAPP?</span>
              </h2>
              <p className="font-clash font-bold sm:block hidden text-white text-center md:text-lg lg:text-xl leading-snug w-full max-w-[350px] mt-6">
                Because we prefer genuine, quick, and straightforward exchanges.
              </p>
              <button className="mt-4 lg:mt-10 bg-orange-500 transition-all duration-300 text-white font-clash font-semibold text-xs sm:text-sm px-4 sm:px-6 py-3 sm:py-4 rounded-lg cursor-pointer hover:scale-95">
                Chat With Us
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* COMPACT SOCIAL SLIDING BUBBLES */}
      <div className="fixed bottom-5 sm:bottom-7 right-6 sm:right-7 z-[120] flex items-center justify-center">
        <AnimatePresence>
          {isSocialOpen &&
            socialIcons.map((item) => (
              <motion.a
                key={item.id}
                href="#"
                // SLIDING LOGIC: Start from 0,0 and slide back to 0,0 on exit
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{ x: item.x, y: item.y, opacity: 1, scale: 1 }}
                exit={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  // Faster return: all icons fly back together instantly when closing
                  delay: isSocialOpen ? item.delay : 0,
                }}
                // REMOVED 'transition-all duration-300' to prevent conflict with Framer Motion
                className="absolute w-11 h-11 bg-[#00522D] rounded-full flex items-center justify-center text-white shadow-sm hover:scale-110"
              >
                {item.icon}
              </motion.a>
            ))}
        </AnimatePresence>

        {/* MAIN BUTTON */}
        <button
          onClick={() => setIsSocialOpen(!isSocialOpen)}
          className="relative z-[130] p-5 sm:p-6 rounded-full bg-orange-300 text-[#00522D] flex items-center justify-center transition-transform duration-300 cursor-pointer hover:scale-105 active:scale-95"
        >
          <motion.div
            key={isSocialOpen ? "close" : "whatsapp"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isSocialOpen ? (
              <X size={22} strokeWidth={2} />
            ) : (
              <Phone size={20} />
            )}
          </motion.div>
        </button>
      </div>
    </>
  );
};

export default Navbar;
