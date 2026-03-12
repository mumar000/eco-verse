"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, X } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaTiktok, FaPinterestP, FaLinkedinIn } from "react-icons/fa";
import qrImage from "@/public/assets/qr.avif";
import Image from "next/image";

import echoLogo from "@/public/assets/echoverse-logo.png";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen || isWhatsAppOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, isWhatsAppOpen]);

  const slideEase = [0.76, 0, 0.24, 1] as const;

  const leftPanelVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { duration: 0.8, ease: slideEase } },
    exit: { x: "-100%", transition: { duration: 0.8, ease: slideEase } }
  };

  const rightPanelVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { duration: 0.8, ease: slideEase } },
    exit: { x: "100%", transition: { duration: 0.8, ease: slideEase } }
  };

  const logoVariants = {
    hidden: { x: "-100%", opacity: 0, scale: 0.8 },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: slideEase }
    },
    exit: {
      x: "-100%",
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.6, ease: slideEase }
    }
  };

  const menuLinks = [
    { name: "HOME", active: false },
    { name: "AGENCY", active: true },
    { name: "PROJECTS", active: false },
    { name: "EXPERTISE", active: false },
    { name: "FAQ", active: false },
    { name: "CONTACT", active: false }
  ];

  return (
    <>
      {/* HEADER BUTTONS */}
      <div className="fixed left-0 top-0 z-[100] w-full bg-transparent -mt-20 pointer-events-none">
        <div className="flex items-center justify-between pointer-events-auto mt-5">
          <Link href={"/"}>
            <Image className="w-60 h-full" src={echoLogo} alt="Echo Verse Logo"/>
          </Link>
          {/* MENU BUTTON */}
          <button
            onClick={toggleMenu}
            className={`rounded-full p-6 transition-all duration-300 mr-7 cursor-pointer hover:scale-110 ${isOpen ? "bg-orange-300 text-[#00522D]" : "bg-orange-200 text-black"
              }`}
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.4 }}>
              {isOpen ? <X size={18} strokeWidth={2} /> : <MenuIcon size={18} strokeWidth={2} />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* FULLSCREEN MENU */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex overflow-hidden">

            {/* CENTER LOGO (slides with left panel) */}
            <motion.div
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-[70]"
            >
              <Image src={echoLogo} alt="Echo Logo" className="w-[600px]" priority />
            </motion.div>

            {/* LEFT PANEL */}
            <motion.div
              variants={leftPanelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-1/2 h-full bg-[#00522D] flex flex-col justify-center pl-[8%] lg:pl-[10%]"
            >
              <nav className="flex flex-col mb-6">
                {menuLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={`#${link.name.toLowerCase()}`}
                    onClick={toggleMenu}
                    className={`font-beni font-black text-[4rem] lg:text-[5.5rem] leading-[0.8] uppercase transition-colors duration-300 hover:text-orange-400 ${link.active ? "text-orange-400" : "text-white"
                      }`}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              {/* SOCIAL ICONS */}
              <div className="flex items-center gap-2">
                {[FaInstagram, FaTiktok, FaPinterestP, FaLinkedinIn].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="text-white border-2 border-white rounded-full p-1.5 lg:p-2.5 hover:bg-white hover:text-[#00522D] transition-colors duration-300"
                  >
                    <Icon size={22} />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* RIGHT PANEL */}
            <motion.div
              variants={rightPanelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-1/2 h-full bg-[#00522D] flex flex-col justify-center items-center px-8 pl-[12%]"
            >
              <Image src={qrImage} alt="QR Image" />

              <h2 className="font-beni font-black text-[80px] leading-[0.7] text-white text-center uppercase">
                <span className="block">SHALL WE</span>
                <span className="block">CONNECT ON</span>
                <span className="block">WHATSAPP?</span>
              </h2>

              <p className="font-clash font-bold text-white text-center text-xl leading-snug w-full max-w-[350px] mt-6">
                Because we prefer genuine, quick, and straightforward exchanges.
                Scan the QR code, send your message, and we&apos;ll reply (very quickly).
              </p>

              <button className="mt-10 bg-orange-500 transition-all duration-300 text-white font-clash font-semibold text-sm px-6 py-4 rounded-lg cursor-pointer hover:scale-95">
                Chat With Us
              </button>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

      {/* FLOATING WHATSAPP BUTTON */}
      {!isOpen && !isWhatsAppOpen && (
        <button
          onClick={() => setIsWhatsAppOpen(true)}
          className="fixed bottom-7 right-7 z-[100] rounded-full bg-orange-200 p-5 text-[#00522D] transition-transform duration-300 cursor-pointer hover:scale-110"
          type="button"
          aria-label="Open WhatsApp"
        >
          <FaWhatsapp size={24} />
        </button>
      )}

      {/* WHATSAPP POPUP */}
      <AnimatePresence>
        {isWhatsAppOpen && (
          <>
            <div className="fixed inset-0 z-[105]" onClick={() => setIsWhatsAppOpen(false)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20, x: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20, x: 20 }}
              style={{ transformOrigin: "bottom right" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="fixed bottom-7 right-7 z-[110] w-[380px] bg-[#00522D] rounded-[2.5rem] p-8 flex flex-col items-center overflow-hidden"
            >
              <button
                onClick={() => setIsWhatsAppOpen(false)}
                className="absolute top-5 right-5 bg-orange-200 text-[#00522D] p-3 rounded-full hover:scale-110 transition-transform duration-300 shadow-sm cursor-pointer"
              >
                <X size={20} strokeWidth={2} />
              </button>

              <div className="mt-6 mb-6">
                <Image src={qrImage} alt="QR Image" className="w-30 h-30" />
              </div>

              <h2 className="font-beni font-black text-[70px] leading-[0.7] text-white text-center uppercase">
                <span className="block">SHALL WE</span>
                <span className="block">CONNECT ON</span>
                <span className="block">WHATSAPP?</span>
              </h2>

              <p className="font-clash font-medium text-white text-center text-base leading-snug w-full mt-4">
                Because we prefer genuine, quick, and straightforward exchanges.
                Scan the QR code, send your message, and we&apos;ll reply (very quickly).
              </p>

              <button className="mt-6 bg-orange-500 transition-all duration-300 text-white font-clash font-semibold text-base px-8 py-3 rounded-lg shadow-sm w-full hover:scale-95 cursor-pointer">
                Chat With Us
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
