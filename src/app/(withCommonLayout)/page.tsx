import HeroSection from "@/components/UI/Home/HeroSection/HeroSection";
import TopCategories from "@/components/UI/Home/TopCategories/TopCategories";
import TravelPosts from "@/components/UI/Home/TravelPosts/TravelPosts";

const HomePage = () => {
    return (
        <div>
            <HeroSection/>
            {/* <TopCategories/> */}
            <TravelPosts/>
        </div>
    );
};

export default HomePage;