import HeroSection from "@/components/UI/Home/HeroSection/HeroSection";
import PlanTrip from "@/components/UI/Home/PlanTrip/PlanTrip";
import TopCategories from "@/components/UI/Home/TopCategories/TopCategories";
import TopDestinations from "@/components/UI/Home/TopDestinations/TopDestinations";
import TravelPosts from "@/components/UI/Home/TravelPosts/TravelPosts";

const HomePage = () => {
    return (
        <div>
            <HeroSection/>
            <TopDestinations/>
            {/* <TopCategories/> */}
            <TravelPosts/>
            <PlanTrip/>
        </div>
    );
};

export default HomePage;