import Cards from '@/components/home/Cards'
import Hero from '@/components/home/Hero'
import Navbar from '@/components/home/Navbar'

const page = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <Hero />
            <Cards />
        </div>
    )
}

export default page