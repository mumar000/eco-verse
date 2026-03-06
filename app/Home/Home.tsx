import CardsFlipScrollAnimation from '@/components/home/CardsFlipScrollAnimation'
import CardsStack from '@/components/home/CardsStack'
import ChooseUs from '@/components/home/ChooseUs'
import Expertise from '@/components/home/Expertise'
import FAQS from '@/components/home/FAQS'
import Hero from '@/components/home/Hero'
import Navbar from '@/components/home/Navbar'

const page = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <Hero />
            {/* <CardsFlipScrollAnimation /> */}
            <Expertise />
            <CardsStack />
            <ChooseUs />
            <FAQS />
        </div>
    )
}

export default page
