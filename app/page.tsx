import Hero from "@/components/home/Hero";
import Navbar from "@/components/home/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
    </div>
  );
}
