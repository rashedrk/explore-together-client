import HeroSection from "@/components/UI/Home/HeroSection/HeroSection";
import PlanTrip from "@/components/UI/Home/PlanTrip/PlanTrip";
import TopCategories from "@/components/UI/Home/TopCategories/TopCategories";
import TopDestinations from "@/components/UI/Home/TopDestinations/TopDestinations";
import TravelPosts from "@/components/UI/Home/TravelPosts/TravelPosts";
import Subscribe from "@/components/UI/Home/Subscribe/Subscribe";

const HomePage = () => {
    return (
        <div>
            <HeroSection/>
            <TopDestinations/>
            {/* <TopCategories/> */}
            <TravelPosts/>
            <PlanTrip/>
            <Subscribe/>
        </div>
    );
};

export default HomePage;