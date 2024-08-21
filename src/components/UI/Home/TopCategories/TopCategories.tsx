"use client";

import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import {
  Pagination,
  Navigation,
  EffectCoverflow,
  Autoplay,
} from "swiper/modules";
import "./topCategories.css";
import Image from "next/image";
import CategoryCard from "@/components/Cards/CategoryCard/CategoryCard";

const TopCategories = () => {
  return (
    <>
      <SectionTitle
        title="Top Categories"
        description="Find the top categories here"
      />

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 2.5,
          slideShadows: true,
        }}
        // pagination={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {[0, 1, 2, 3, 4, 5, 6].map((category, index) => (
          <SwiperSlide key={index}>
            <CategoryCard />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default TopCategories;
