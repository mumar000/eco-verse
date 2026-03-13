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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false);

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
    { name: "HOME", active: false },
    { name: "AGENCY", active: true },
    { name: "PROJECTS", active: false },
    { name: "EXPERTISE", active: false },
    { name: "FAQ", active: false },
    { name: "CONTACT", active: false },
  ];

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
              className="w-1/2 h-full bg-[#00522D] flex flex-col justify-center pl-[8%] lg:pl-[10%] pt-20"
            >
              <nav className="flex flex-col mb-6">
                {menuLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={`#${link.name.toLowerCase()}`}
                    onClick={toggleMenu}
                    className={`font-beni font-black text-[4rem] lg:text-[5.5rem] leading-[0.8] uppercase transition-colors duration-300 hover:text-orange-400 ${
                      link.active ? "text-orange-400" : "text-white"
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              <div className="flex items-center gap-2">
                {[FaInstagram, FaTiktok, FaPinterestP, FaLinkedinIn].map(
                  (Icon, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="text-white border-2 border-white rounded-full p-1.5 lg:p-2.5 hover:bg-white hover:text-[#00522D] transition-colors duration-300"
                    >
                      <Icon size={22} />
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
              <Image src={qrImage} alt="QR Image"/>
              <h2 className="font-beni font-black md:text-[60px] lg:text-[80px] leading-[0.7] text-white text-center uppercase">
                <span className="block">SHALL WE</span>
                <span className="block">CONNECT ON</span>
                <span className="block">WHATSAPP?</span>
              </h2>
              <p className="font-clash font-bold text-white text-center md:text-lg lg:text-xl leading-snug w-full max-w-[350px] mt-6">
                Because we prefer genuine, quick, and straightforward exchanges.
              </p>
              <button className="mt-4 lg:mt-10 bg-orange-500 transition-all duration-300 text-white font-clash font-semibold text-sm px-6 py-4 rounded-lg cursor-pointer hover:scale-95">
                Chat With Us
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* COMPACT SOCIAL SLIDING BUBBLES */}
      <div className="fixed bottom-7 right-7 z-[120] flex items-center justify-center">
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