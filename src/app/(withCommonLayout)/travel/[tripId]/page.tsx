"use client";

import Loader from "@/components/shared/Loader/Loader";
import { useGetSingleTripQuery } from "@/redux/features/trip/tripApi";
import {
  Box,
  Button,
  Container,
  List,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  IconButton,
  Chip,
} from "@mui/material";
import Image from "next/image";
import CheckIcon from "@mui/icons-material/Check";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import AppsIcon from "@mui/icons-material/Apps";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TourIcon from "@mui/icons-material/Tour";
import GroupIcon from "@mui/icons-material/Group";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import dayjs from "dayjs";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

type TParams = {
  params: {
    tripId: string;
  };
};

const TripDetailsPage = ({ params }: TParams) => {
  const id = params?.tripId;
  const { data, isLoading } = useGetSingleTripQuery(id);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [currentModalIndex, setCurrentModalIndex] = useState(0);
  const swiperRef = useRef<SwiperType>();

  const totalPhotos = data?.photos?.length || 0;

  const goToNextImage = () => {
    setCurrentModalIndex((prev) => (prev + 1) % totalPhotos);
  };

  const goToPrevImage = () => {
    setCurrentModalIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (!showAllPhotos) return;

    if (event.key === "ArrowRight") {
      goToNextImage();
    } else if (event.key === "ArrowLeft") {
      goToPrevImage();
    } else if (event.key === "Escape") {
      setShowAllPhotos(false);
    }
  };

  // Add keyboard event listeners
  useEffect(() => {
    if (showAllPhotos) {
      document.addEventListener("keydown", handleKeyPress);
      return () => document.removeEventListener("keydown", handleKeyPress);
    }
  }, [showAllPhotos, currentModalIndex]);

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* Photo Gallery Section */}
          <Box sx={{ position: "relative", mb: 4 }}>
            <Box
              sx={{
                position: "relative",
                height: { xs: 300, md: 400 },
                borderRadius: "12px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "& .swiper": {
                  width: "100%",
                  height: "100%",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                },
                "& .swiper-wrapper": {
                  alignItems: "center",
                  display: "flex",
                },
                "& .swiper-slide": {
                  transition: "all 0.3s ease",
                  transform: "scale(0.75)",
                  opacity: 0.6,
                  filter: "brightness(0.7)",
                  width: "auto !important",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
                "& .swiper-slide-active": {
                  transform: "scale(1)",
                  opacity: 1,
                  filter: "brightness(1)",
                  zIndex: 2,
                },
                "& .swiper-slide-next, & .swiper-slide-prev": {
                  transform: "scale(0.85)",
                  opacity: 0.8,
                  filter: "brightness(0.85)",
                },
                "& .swiper-button-next, & .swiper-button-prev": {
                  width: "48px",
                  height: "48px",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "50%",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  "&:after": {
                    fontSize: "20px",
                    color: "#000",
                    fontWeight: "bold",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 1)",
                  },
                },
                "& .swiper-button-prev": {
                  left: "16px",
                },
                "& .swiper-button-next": {
                  right: "16px",
                },
                "& .swiper-pagination": {
                  bottom: "16px",
                  "& .swiper-pagination-bullet": {
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    opacity: 1,
                  },
                  "& .swiper-pagination-bullet-active": {
                    backgroundColor: "white",
                  },
                },
              }}
            >
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView="auto"
                centeredSlides={true}
                centerInsufficientSlides={true}
                initialSlide={0}
                breakpoints={{
                  320: {
                    slidesPerView: 1.5,
                    spaceBetween: 15,
                  },
                  640: {
                    slidesPerView: 2.1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2.5,
                    spaceBetween: 25,
                  },
                  1024: {
                    slidesPerView: 2.8,
                    spaceBetween: 30,
                  },
                }}
                navigation
                pagination={{ clickable: true }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                loop={totalPhotos > 2}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                {data?.photos?.map((photo: string, index: number) => (
                  <SwiperSlide key={index}>
                    <Box
                      sx={{
                        position: "relative",
                        width: { xs: "280px", md: "350px", lg: "400px" },
                        height: "100%",
                        borderRadius: "12px",
                        overflow: "hidden",
                        cursor: "pointer",
                        "&:hover": {
                          transform: "scale(1.02)",
                          transition: "transform 0.3s ease",
                        },
                      }}
                      onClick={() => {
                        setCurrentModalIndex(index);
                        setShowAllPhotos(true);
                      }}
                    >
                      <Image
                        src={photo}
                        alt={`Trip photo ${index + 1}`}
                        fill
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* All Photos Button */}
              <Chip
                label="All photos"
                icon={<AppsIcon sx={{ fontSize: 18 }} />}
                onClick={() => {
                  setCurrentModalIndex(0);
                  setShowAllPhotos(true);
                }}
                sx={{
                  position: "absolute",
                  bottom: 16,
                  right: 16,
                  zIndex: 10,
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  color: "rgba(0, 0, 0, 0.8)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "25px",
                  px: 1,
                  py: 0.5,
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    color: "rgba(0, 0, 0, 0.9)",
                    transform: "translateY(-1px)",
                    boxShadow: "0 6px 25px rgba(0, 0, 0, 0.2)",
                  },
                  transition: "all 0.2s ease-in-out",
                  "& .MuiChip-label": {
                    fontWeight: "600",
                    fontSize: "0.875rem",
                  },
                }}
              />
            </Box>

            {/* Photo Carousel Modal */}
            {showAllPhotos && data?.photos && data.photos.length > 0 && (
              <Box
                sx={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.95)",
                  zIndex: 9999,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 3,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
                    zIndex: 10,
                  }}
                >
                  <Typography variant="h6" color="white">
                    {currentModalIndex + 1} / {totalPhotos}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => setShowAllPhotos(false)}
                    sx={{
                      color: "white",
                      borderColor: "white",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    Close
                  </Button>
                </Box>

                {/* Main Image Container */}
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 8,
                  }}
                >
                  {/* Previous Button */}
                  <IconButton
                    onClick={goToPrevImage}
                    sx={{
                      position: "absolute",
                      left: 24,
                      zIndex: 10,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      color: "white",
                      width: 56,
                      height: 56,
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                      },
                    }}
                    disabled={totalPhotos <= 1}
                  >
                    <ArrowBackIosIcon sx={{ fontSize: 24 }} />
                  </IconButton>

                  {/* Image */}
                  <Box
                    sx={{
                      position: "relative",
                      maxWidth: "80%",
                      maxHeight: "80%",
                      width: "fit-content",
                      height: "fit-content",
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8)",
                    }}
                  >
                    <Image
                      src={data.photos[currentModalIndex]}
                      alt={`Trip photo ${currentModalIndex + 1}`}
                      width={1200}
                      height={800}
                      style={{
                        width: "auto",
                        height: "auto",
                        maxWidth: "80vw",
                        maxHeight: "80vh",
                        objectFit: "contain",
                      }}
                    />
                  </Box>

                  {/* Next Button */}
                  <IconButton
                    onClick={goToNextImage}
                    sx={{
                      position: "absolute",
                      right: 24,
                      zIndex: 10,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      color: "white",
                      width: 56,
                      height: 56,
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                      },
                    }}
                    disabled={totalPhotos <= 1}
                  >
                    <ArrowForwardIosIcon sx={{ fontSize: 24 }} />
                  </IconButton>
                </Box>

                {/* Bottom indicators */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 24,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    borderRadius: "20px",
                    px: 2,
                    py: 1,
                  }}
                >
                  {data.photos.map((_, index) => (
                    <Box
                      key={index}
                      onClick={() => setCurrentModalIndex(index)}
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor:
                          index === currentModalIndex
                            ? "white"
                            : "rgba(255, 255, 255, 0.4)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor:
                            index === currentModalIndex
                              ? "white"
                              : "rgba(255, 255, 255, 0.7)",
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>

          {/* Rating Section */}
          <Box
            sx={{
              mb: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <StarIcon sx={{ color: "#FFD700", fontSize: 20 }} />
                <Typography variant="h6" fontWeight="600">
                  5
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  (3 Reviews)
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                •
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {data?.destination}
              </Typography>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                sx={{
                  width: 48,
                  height: 48,
                  border: "1px solid #e0e0e0",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    borderColor: "#d0d0d0",
                  },
                }}
              >
                <ShareIcon sx={{ fontSize: 20, color: "text.secondary" }} />
              </IconButton>
              <IconButton
                sx={{
                  width: 48,
                  height: 48,
                  border: "1px solid #e0e0e0",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    borderColor: "#d0d0d0",
                  },
                }}
              >
                <FavoriteBorderIcon
                  sx={{ fontSize: 20, color: "text.secondary" }}
                />
              </IconButton>
            </Box>
          </Box>

          {/* Information Cards */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr 1fr",
                md: "repeat(4, 1fr)",
              },
              gap: 2,
              mb: 4,
            }}
          >
            {/* Start Date Card */}
            <Box
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <CalendarTodayIcon sx={{ color: "#FF6B35", fontSize: 20 }} />
              <Typography
                variant="subtitle2"
                fontWeight="600"
                color="text.primary"
              >
                Start Date
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {dayjs(data?.startDate).format("MMM DD, YYYY")}
              </Typography>
            </Box>

            {/* Duration Card */}
            <Box
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <AccessTimeIcon sx={{ color: "#4A90E2", fontSize: 20 }} />
              <Typography
                variant="subtitle2"
                fontWeight="600"
                color="text.primary"
              >
                Duration
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {dayjs(data?.endDate).diff(dayjs(data?.startDate), "day")} days
              </Typography>
            </Box>

            {/* Tour Type Card */}
            <Box
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <TourIcon sx={{ color: "#8E44AD", fontSize: 20 }} />
              <Typography
                variant="subtitle2"
                fontWeight="600"
                color="text.primary"
              >
                Tour Type
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {data?.type}
              </Typography>
            </Box>

            {/* Group Size Card */}
            <Box
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <GroupIcon sx={{ color: "#27AE60", fontSize: 20 }} />
              <Typography
                variant="subtitle2"
                fontWeight="600"
                color="text.primary"
              >
                Group Size
              </Typography>
              <Typography variant="body2" color="text.secondary">
                10 people
              </Typography>
            </Box>
          </Box>

          {/* About this tour */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" fontWeight="600" mb={2}>
              About this tour
            </Typography>
            <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
              {data?.description}
            </Typography>
          </Box>

          {/* Highlights */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" fontWeight="600" mb={2}>
              Highlights
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {data?.activities?.map((activity, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                >
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      backgroundColor: "#e8f5e8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      mt: 0.2,
                    }}
                  >
                    <CheckIcon sx={{ fontSize: 12, color: "#4caf50" }} />
                  </Box>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    lineHeight={1.7}
                  >
                    {activity}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              mt: 6,
              mb: 4,
              display: "flex",
              justifyContent: "center",
              pt: 4,
              borderTop: "1px solid #f0f0f0",
            }}
          >
            <Link
              href={{
                pathname: "/travel_request",
                query: {
                  tripId: data?.id,
                  destination: data?.destination,
                  startDate: data?.startDate,
                  endDate: data?.endDate,
                },
              }}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  color: "white",
                  fontWeight: "700",
                  fontSize: "1.1rem",
                  py: 2,
                  px: 6,
                  borderRadius: "30px",
                  textTransform: "none",
                  boxShadow: (theme) =>
                    `0 8px 30px ${theme.palette.primary.main}40`,
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: (theme) =>
                      `0 12px 40px ${theme.palette.primary.main}60`,
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Request to Join This Adventure
              </Button>
            </Link>
          </Box>
        </>
      )}
    </Container>
  );
};

export default TripDetailsPage;
