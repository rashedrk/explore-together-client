"use client";
import TravelCard from "@/components/TravelCard/TravelCard";
import Loader from "@/components/shared/Loader/Loader";
import { useGetAllTripsQuery } from "@/redux/features/trip/tripApi";
import { TQueryParams } from "@/types/common";
import NextLink from "next/link";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  InputAdornment,
  Link,
  Pagination,
  Paper,
  Slider,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const TravelPage = () => {
  const [page, setPage] = useState(1);
  const [params, setParams] = useState<TQueryParams[]>([]);
  const limit = 12; // Define limit as a constant

  // Filter states
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    []
  );
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([99, 359]);
  const [durationRange, setDurationRange] = useState<number[]>([1, 14]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Available options (you can make these dynamic by fetching unique values)
  const availableDestinations = [
    "Italy",
    "France",
    "Iceland",
    "Japan",
    "Spain",
    "USA",
  ];
  const availableTypes = ["adventure", "leisure", "business", "camping"];

  const { data: tripData, isLoading } = useGetAllTripsQuery([
    { name: "page", value: page },
    { name: "limit", value: limit },
    ...params,
  ]);

  const metaData = tripData?.meta;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Filter handlers
  const handleDestinationChange = (destination: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(destination)
        ? prev.filter((d) => d !== destination)
        : [...prev, destination]
    );
  };

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handleDurationChange = (event: Event, newValue: number | number[]) => {
    setDurationRange(newValue as number[]);
  };

  const clearAllFilters = () => {
    setSelectedDestinations([]);
    setSelectedTypes([]);
    setPriceRange([99, 359]);
    setDurationRange([1, 14]);
    setSearchQuery("");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Apply filters to params
  const applyFilters = () => {
    const newParams: TQueryParams[] = [];

    if (searchQuery.trim()) {
      newParams.push({ name: "search", value: searchQuery.trim() });
    }

    if (selectedDestinations.length > 0) {
      selectedDestinations.forEach((dest) => {
        newParams.push({ name: "destination", value: dest });
      });
    }

    if (selectedTypes.length > 0) {
      selectedTypes.forEach((type) => {
        newParams.push({ name: "type", value: type });
      });
    }

    newParams.push({ name: "minBudget", value: priceRange[0] });
    newParams.push({ name: "maxBudget", value: priceRange[1] });
    newParams.push({ name: "minDuration", value: durationRange[0] });
    newParams.push({ name: "maxDuration", value: durationRange[1] });

    setParams(newParams);
    setPage(1); // Reset to first page when filters change
  };

  let pageCount: number = 0;

  if (metaData?.total) {
    pageCount = Math.ceil(metaData.total / limit); // Use the same limit value
  }

  //   console.log(tripData);

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url("/assets/header4.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          position: "relative",
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "2rem", md: "3rem" },
            mb: 2,
            textAlign: "center",
          }}
        >
          All Tours
        </Typography>
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            color: "white",
            "& .MuiBreadcrumbs-separator": {
              color: "white",
            },
          }}
        >
          <Link
            component={NextLink}
            href="/"
            sx={{
              color: "white",
              textDecoration: "none",
              fontSize: "1.1rem",
              opacity: 0.9,
              "&:hover": {
                opacity: 1,
                textDecoration: "underline",
              },
            }}
          >
            Home
          </Link>
          <Typography
            sx={{
              color: "white",
              fontSize: "1.1rem",
              opacity: 0.9,
            }}
          >
            All Tours
          </Typography>
        </Breadcrumbs>
      </Box>

      <Container maxWidth="xl" sx={{ my: 4 }}>
        <Grid container spacing={3}>
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <Paper
              elevation={1}
              sx={{
                p: 3,
                height: "fit-content",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h6" fontWeight="600">
                  Criteria
                </Typography>
                <Button
                  variant="text"
                  size="small"
                  onClick={clearAllFilters}
                  sx={{
                    color: "#1CA8CB",
                    backgroundColor: "#E3F2FD",
                    borderRadius: "20px",
                    px: 2,
                    textTransform: "none",
                    fontSize: "0.875rem",
                    "&:hover": {
                      backgroundColor: "#BBDEFB",
                    },
                  }}
                >
                  Clear all
                </Button>
              </Box>

              {/* Destination Filter */}
              <Accordion defaultExpanded disableGutters elevation={0}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ px: 0, minHeight: 48 }}
                >
                  <Typography variant="subtitle1" fontWeight="600">
                    Destination
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0, pt: 0 }}>
                  {availableDestinations.map((destination) => (
                    <Box
                      key={destination}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedDestinations.includes(destination)}
                            onChange={() =>
                              handleDestinationChange(destination)
                            }
                            size="small"
                          />
                        }
                        label={destination}
                        sx={{ flex: 1 }}
                      />
                      <Chip
                        label="5"
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: "0.75rem", height: 20 }}
                      />
                    </Box>
                  ))}
                  <Button
                    variant="text"
                    size="small"
                    sx={{
                      color: "#1CA8CB",
                      textTransform: "none",
                      p: 0,
                      mt: 1,
                      fontSize: "0.875rem",
                    }}
                  >
                    Show all 2 ▼
                  </Button>
                </AccordionDetails>
              </Accordion>

              {/* Price Filter */}
              <Accordion defaultExpanded disableGutters elevation={0}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ px: 0, minHeight: 48 }}
                >
                  <Typography variant="subtitle1" fontWeight="600">
                    Price
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0, pt: 0 }}>
                  <Slider
                    value={priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={99}
                    max={999}
                    sx={{
                      color: "#1CA8CB",
                      "& .MuiSlider-thumb": {
                        backgroundColor: "#1CA8CB",
                      },
                      "& .MuiSlider-track": {
                        backgroundColor: "#1CA8CB",
                      },
                    }}
                  />
                  <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography variant="body2" color="text.secondary">
                      ${priceRange[0]}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${priceRange[1]}
                    </Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>

              {/* Duration Filter */}
              <Accordion defaultExpanded disableGutters elevation={0}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ px: 0, minHeight: 48 }}
                >
                  <Typography variant="subtitle1" fontWeight="600">
                    Duration
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0, pt: 0 }}>
                  <Slider
                    value={durationRange}
                    onChange={handleDurationChange}
                    valueLabelDisplay="auto"
                    min={1}
                    max={30}
                    sx={{
                      color: "#1CA8CB",
                      "& .MuiSlider-thumb": {
                        backgroundColor: "#1CA8CB",
                      },
                      "& .MuiSlider-track": {
                        backgroundColor: "#1CA8CB",
                      },
                    }}
                  />
                  <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography variant="body2" color="text.secondary">
                      {durationRange[0]} day{durationRange[0] > 1 ? "s" : ""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {durationRange[1]} day{durationRange[1] > 1 ? "s" : ""}
                    </Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>

              {/* Trip Type Filter */}
              <Accordion defaultExpanded disableGutters elevation={0}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ px: 0, minHeight: 48 }}
                >
                  <Typography variant="subtitle1" fontWeight="600">
                    Trip Type
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0, pt: 0 }}>
                  {availableTypes.map((type) => (
                    <Box
                      key={type}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedTypes.includes(type)}
                            onChange={() => handleTypeChange(type)}
                            size="small"
                          />
                        }
                        label={type.charAt(0).toUpperCase() + type.slice(1)}
                        sx={{ flex: 1 }}
                      />
                      <Chip
                        label="3"
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: "0.75rem", height: 20 }}
                      />
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>

              {/* Apply Filters Button */}
              <Button
                fullWidth
                variant="contained"
                onClick={applyFilters}
                sx={{
                  mt: 3,
                  backgroundColor: "#1CA8CB",
                  "&:hover": {
                    backgroundColor: "#1496B5",
                  },
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Apply Filters
              </Button>
            </Paper>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9}>
            {/* Search Input */}
            <Box mb={3}>
              <TextField
                fullWidth
                placeholder="Search destinations, activities, or descriptions..."
                value={searchQuery}
                onChange={handleSearchChange}
                variant="outlined"
                size="medium"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#1CA8CB" }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: "12px",
                    backgroundColor: "#f8f9fa",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e0e0e0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#1CA8CB",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#1CA8CB",
                    },
                  },
                }}
                sx={{
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#1CA8CB",
                  },
                }}
              />
            </Box>

            {isLoading ? (
              <Loader />
            ) : (
              <>
                <Grid container spacing={3}>
                  {tripData?.data?.map((trip: any) => (
                    <Grid item key={trip.id} xs={12} sm={6} lg={4}>
                      <TravelCard trip={trip} />
                    </Grid>
                  ))}
                </Grid>

                <Box display="flex" justifyContent="center" sx={{ my: 4 }}>
                  <Pagination
                    count={pageCount}
                    page={page}
                    onChange={handleChange}
                    variant="outlined"
                    shape="rounded"
                    sx={{
                      "& .MuiPaginationItem-root": {
                        border: "1px solid #e0e0e0",
                        margin: "0 2px",
                        backgroundColor: "white",
                        "&:hover": {
                          backgroundColor: "#f5f5f5",
                        },
                      },
                      "& .Mui-selected": {
                        backgroundColor: "primary.main",
                        color: "white",
                        border: "1px solid",
                        borderColor: "primary.main",
                        "&:hover": {
                          backgroundColor: "primary.dark",
                        },
                      },
                      "& .MuiPaginationItem-previousNext": {
                        border: "1px solid #e0e0e0",
                        backgroundColor: "white",
                        "&:hover": {
                          backgroundColor: "#f5f5f5",
                        },
                      },
                    }}
                  />
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default TravelPage;
