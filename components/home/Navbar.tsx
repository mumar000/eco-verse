import { MenuIcon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="fixed left-0 top-0 z-50 w-full bg-transparent p-7">
      <div className="flex items-center justify-between">
        <button
          className="rounded-full bg-primary p-6 text-black transition-transform duration-300 cursor-pointer hover:scale-110"
          type="button"
          aria-label="Open menu"
        >
          <MenuIcon size={15} />
        </button>
        <button
          className="rounded-full bg-primary p-5 text-green transition-transform duration-300 cursor-pointer hover:scale-110"
          type="button"
          aria-label="Open WhatsApp"
        >
          <FaWhatsapp size={20} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
