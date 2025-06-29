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
import dayjs from "dayjs";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type TParams = {
  params: {
    tripId: string;
  };
};

const TripDetailsPage = ({ params }: TParams) => {
  const id = params?.tripId;
  const { data, isLoading } = useGetSingleTripQuery(id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const totalPhotos = data?.photos?.length || 0;

  const nextSlide = () => {
    if (currentIndex + 3 < totalPhotos) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const getVisiblePhotos = () => {
    if (!data?.photos) return [];
    // Ensure we always show up to 3 photos if available
    const endIndex = Math.min(currentIndex + 3, totalPhotos);
    return data.photos.slice(currentIndex, endIndex);
  };

  const canGoNext = () => {
    return currentIndex + 3 < totalPhotos;
  };

  const canGoPrev = () => {
    return currentIndex > 0;
  };

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
                display: "flex",
                gap: 2,
                overflow: "hidden",
                borderRadius: "12px",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{
                    display: "flex",
                    gap: "8px",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {getVisiblePhotos().map((photo: string, index: number) => (
                    <Box
                      key={currentIndex + index}
                      sx={{
                        position: "relative",
                        flex: 1,
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
                        setCurrentIndex(currentIndex + index);
                        setShowAllPhotos(true);
                      }}
                    >
                      <Image
                        src={photo}
                        alt={`Trip photo ${currentIndex + index + 1}`}
                        fill
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Custom Navigation Buttons */}
              {canGoPrev() && (
                <IconButton
                  onClick={prevSlide}
                  sx={{
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 1)",
                    },
                    width: 48,
                    height: 48,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                >
                  <ArrowBackIosIcon />
                </IconButton>
              )}

              {canGoNext() && (
                <IconButton
                  onClick={nextSlide}
                  sx={{
                    position: "absolute",
                    right: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 1)",
                    },
                    width: 48,
                    height: 48,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              )}

              {/* Photo Counter */}
              <Chip
                label={`${Math.min(
                  currentIndex + 2,
                  totalPhotos
                )} / ${totalPhotos}`}
                sx={{
                  position: "absolute",
                  bottom: 16,
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 10,
                  backgroundColor: "rgba(0, 0, 0, 0.85)",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "0.875rem",
                  backdropFilter: "blur(8px)",
                  borderRadius: "20px",
                  px: 2,
                  py: 0.5,
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              />

              {/* All Photos Button */}
              <Button
                variant="contained"
                startIcon={<AppsIcon sx={{ fontSize: 18 }} />}
                onClick={() => setShowAllPhotos(true)}
                sx={{
                  position: "absolute",
                  bottom: 16,
                  right: 16,
                  zIndex: 10,
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  color: "rgba(0, 0, 0, 0.8)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "25px",
                  px: 3,
                  py: 1,
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  textTransform: "none",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    color: "rgba(0, 0, 0, 0.9)",
                    transform: "translateY(-1px)",
                    boxShadow: "0 6px 25px rgba(0, 0, 0, 0.2)",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                All photos
              </Button>
            </Box>

            {/* Photo Grid Modal */}
            {showAllPhotos && (
              <Box
                sx={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.9)",
                  zIndex: 1300,
                  display: "flex",
                  flexDirection: "column",
                  padding: 2,
                  overflow: "auto",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" color="white">
                    All Photos ({totalPhotos})
                  </Typography>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => setShowAllPhotos(false)}
                    sx={{ color: "white", borderColor: "white" }}
                  >
                    Close
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "repeat(2, 1fr)",
                      md: "repeat(3, 1fr)",
                      lg: "repeat(4, 1fr)",
                    },
                    gap: 2,
                    maxWidth: 1200,
                    margin: "0 auto",
                  }}
                >
                  {data?.photos?.map((photo: string, index: number) => (
                    <Box
                      key={index}
                      sx={{
                        position: "relative",
                        aspectRatio: "1",
                        borderRadius: "8px",
                        overflow: "hidden",
                        cursor: "pointer",
                        "&:hover": {
                          transform: "scale(1.02)",
                          transition: "transform 0.2s ease-in-out",
                        },
                      }}
                      onClick={() => {
                        setCurrentIndex(Math.max(0, index - 1));
                        setShowAllPhotos(false);
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
                  ))}
                </Box>
              </Box>
            )}
          </Box>

          <Box sx={{ my: 2 }}>
            <Typography variant="h5" mb={1}>
              Description
            </Typography>
            <Typography variant="body1" mb={1}>
              {data?.description}
            </Typography>
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography variant="h5" mb={1}>
              Activities
            </Typography>
            <List>
              {data?.activities.map((activity, index) => (
                <Box key={index} component="span" sx={{ display: "flex" }}>
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                  <ListItemText primary={activity} />
                </Box>
              ))}
            </List>
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography variant="h5" mb={1}>
              Duration
            </Typography>
            <Typography variant="body1" mb={1}>
              {dayjs(data?.startDate).format("DD/MM/YYYY")} -{" "}
              {dayjs(data?.endDate).format("DD/MM/YYYY")}
            </Typography>
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography variant="h5" mb={1}>
              Destination
            </Typography>
            <Typography variant="body1" mb={1}>
              {data?.destination}
            </Typography>
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography variant="h5" mb={1}>
              Travel Type
            </Typography>
            <Typography variant="body1" mb={1}>
              {data?.type}
            </Typography>
          </Box>
          <Box sx={{ my: 2 }}>
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
            >
              <Button>Request to Join</Button>
            </Link>
          </Box>
        </>
      )}
    </Container>
  );
};

export default TripDetailsPage;
