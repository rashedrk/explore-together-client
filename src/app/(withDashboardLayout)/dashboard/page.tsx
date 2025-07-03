"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Stack,
  IconButton,
  Button,
  LinearProgress,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import {
  TrendingUp,
  People,
  TravelExplore,
  DateRange,
  Add,
  Visibility,
  Edit,
  MoreVert,
  Notifications,
  LocationOn,
  CalendarToday,
  AttachMoney,
  PersonAdd,
  FlightTakeoff,
  Person,
  PendingActions,
  CheckCircle,
} from "@mui/icons-material";
import {
  useGetAllTripsQuery,
  useMyTripPostsQuery,
} from "@/redux/features/trip/tripApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import Loader from "@/components/shared/Loader/Loader";
import Link from "next/link";
import dayjs from "dayjs";
import { TTrip } from "@/types/trip";
import { getUserInfo } from "@/services/auth.services";
import { USER_ROLE } from "@/constants/role";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

const DashboardPage = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const user = getUserInfo();
    setUserInfo(user);
  }, []);

  // Conditional queries based on user role
  const { data: allTripsData, isLoading: allTripsLoading } =
    useGetAllTripsQuery([], {
      skip: !userInfo || userInfo.role !== USER_ROLE.ADMIN,
    });

  const { data: myTripsData, isLoading: myTripsLoading } = useMyTripPostsQuery(
    undefined,
    {
      skip: !userInfo || userInfo.role !== USER_ROLE.USER,
    }
  );

  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery(
    undefined,
    {
      skip: !userInfo || userInfo.role !== USER_ROLE.ADMIN,
    }
  );

  if (!isClient || !userInfo) {
    return <Loader />;
  }

  const isAdmin = userInfo.role === USER_ROLE.ADMIN;
  const isUser = userInfo.role === USER_ROLE.USER;

  // Handle loading states
  if (
    (isAdmin && (allTripsLoading || usersLoading)) ||
    (isUser && myTripsLoading)
  ) {
    return <Loader />;
  }

  // Get appropriate trips data based on role
  const trips = isAdmin ? allTripsData?.data || [] : myTripsData?.data || [];
  const users = isAdmin ? usersData?.data || [] : [];

  // Calculate statistics
  const totalTrips = trips.length;
  const totalUsers = users.length;
  const activeTrips = trips.filter((trip: TTrip) =>
    dayjs(trip.endDate).isAfter(dayjs())
  ).length;
  const completedTrips = totalTrips - activeTrips;

  // Recent activities
  const recentTrips = trips.slice(0, 5);
  const recentUsers = users.slice(0, 5);

  const StatCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    color,
    trend,
  }: {
    title: string;
    value: number;
    subtitle: string;
    icon: React.ComponentType;
    color: string;
    trend?: number;
  }) => (
    <Card
      sx={{
        height: "100%",
        background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
        border: `1px solid ${color}30`,
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Typography color="text.secondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography
              variant="h4"
              component="h2"
              fontWeight="bold"
              color={color}
            >
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: `${color}20`, color: color }}>
            <Icon />
          </Avatar>
        </Stack>
        {trend && (
          <Box sx={{ mt: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <TrendingUp fontSize="small" color="success" />
              <Typography variant="body2" color="success.main">
                +{trend}% this month
              </Typography>
            </Stack>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  const ActivityItem = ({ trip }: { trip: TTrip }) => (
    <ListItem
      sx={{
        border: "1px solid #f0f0f0",
        borderRadius: 1,
        mb: 1,
        transition: "background-color 0.2s",
        "&:hover": { bgcolor: "action.hover" },
      }}
    >
      <ListItemAvatar>
        <Avatar src={trip.photos?.[0]} sx={{ bgcolor: "primary.light" }}>
          <TravelExplore />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="subtitle2" fontWeight={600}>
            {trip.destination}
          </Typography>
        }
        secondary={
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ mt: 0.5 }}
          >
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <CalendarToday fontSize="small" color="action" />
              <Typography variant="caption">
                {dayjs(trip.startDate).format("MMM DD")} -{" "}
                {dayjs(trip.endDate).format("MMM DD")}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <AttachMoney fontSize="small" color="action" />
              <Typography variant="caption">${trip.budget}</Typography>
            </Stack>
          </Stack>
        }
      />
      <ListItemSecondaryAction>
        <Chip
          label={dayjs(trip.endDate).isAfter(dayjs()) ? "Active" : "Completed"}
          size="small"
          color={dayjs(trip.endDate).isAfter(dayjs()) ? "success" : "default"}
          variant="outlined"
        />
      </ListItemSecondaryAction>
    </ListItem>
  );

  const UserItem = ({ user }: { user: User }) => (
    <ListItem
      sx={{
        border: "1px solid #f0f0f0",
        borderRadius: 1,
        mb: 1,
        transition: "background-color 0.2s",
        "&:hover": { bgcolor: "action.hover" },
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "secondary.light" }}>
          {user.name?.charAt(0).toUpperCase()}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="subtitle2" fontWeight={600}>
            {user.name}
          </Typography>
        }
        secondary={
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ mt: 0.5 }}
          >
            <Typography variant="caption" color="text.secondary">
              {user.email}
            </Typography>
            <Chip
              label={user.role}
              size="small"
              variant="outlined"
              color={user.role === "admin" ? "primary" : "default"}
            />
          </Stack>
        }
      />
      <ListItemSecondaryAction>
        <Chip
          label={user.isActive ? "Active" : "Inactive"}
          size="small"
          color={user.isActive ? "success" : "error"}
          variant="filled"
        />
      </ListItemSecondaryAction>
    </ListItem>
  );

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, pt: 0 }}>
      {/* Header */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          {isAdmin ? "Admin Dashboard" : "My Dashboard"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome back, {userInfo.name}! Here&apos;s your{" "}
          {isAdmin ? "platform" : "personal"} overview.
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={isAdmin ? 3 : 4}>
          <StatCard
            title={isAdmin ? "Total Trips" : "My Trips"}
            value={totalTrips}
            subtitle={isAdmin ? "All time trips" : "Created by you"}
            icon={TravelExplore}
            color="#1976d2"
            trend={12}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={isAdmin ? 3 : 4}>
          <StatCard
            title="Active Trips"
            value={activeTrips}
            subtitle="Currently ongoing"
            icon={FlightTakeoff}
            color="#2e7d32"
            trend={8}
          />
        </Grid>
        {isAdmin && (
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard
              title="Total Users"
              value={totalUsers}
              subtitle="Registered members"
              icon={People}
              color="#ed6c02"
              trend={15}
            />
          </Grid>
        )}
        <Grid item xs={12} sm={6} lg={isAdmin ? 3 : 4}>
          <StatCard
            title="Completed"
            value={completedTrips}
            subtitle="Finished trips"
            icon={isAdmin ? DateRange : CheckCircle}
            color="#9c27b0"
            trend={5}
          />
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom fontWeight={600}>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={isAdmin ? 3 : 4}>
            <Button
              variant="contained"
              startIcon={<Add />}
              component={Link}
              href="/post_trip"
              fullWidth
              sx={{
                borderRadius: 2,
                py: 1.5,
                fontSize: { xs: "0.875rem", sm: "0.875rem" },
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Create New Trip
            </Button>
          </Grid>
          {isAdmin && (
            <>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="outlined"
                  startIcon={<PersonAdd />}
                  component={Link}
                  href="/dashboard/admin/user_management"
                  fullWidth
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    fontSize: { xs: "0.875rem", sm: "0.875rem" },
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: "primary.main",
                  }}
                >
                  Manage Users
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="outlined"
                  startIcon={<TravelExplore />}
                  component={Link}
                  href="/dashboard/admin/trip_management"
                  fullWidth
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    fontSize: { xs: "0.875rem", sm: "0.875rem" },
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: "primary.main",
                  }}
                >
                  Manage Trips
                </Button>
              </Grid>
            </>
          )}
          {isUser && (
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="outlined"
                startIcon={<TravelExplore />}
                component={Link}
                href="/dashboard/user/travel_post"
                fullWidth
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  fontSize: { xs: "0.875rem", sm: "0.875rem" },
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: "primary.main",
                }}
              >
                My Travel Posts
              </Button>
            </Grid>
          )}
          <Grid item xs={12} sm={6} md={isAdmin ? 3 : 4}>
            <Button
              variant="outlined"
              startIcon={<Visibility />}
              component={Link}
              href="/travel"
              fullWidth
              sx={{
                borderRadius: 2,
                py: 1.5,
                fontSize: { xs: "0.875rem", sm: "0.875rem" },
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: "primary.main",
              }}
            >
              {isAdmin ? "View All Trips" : "Explore Trips"}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Recent Activities */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={isAdmin ? 6 : 12}>
          <Paper sx={{ p: 3, height: "fit-content" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Typography variant="h6" fontWeight={600}>
                {isAdmin ? "Recent Trips" : "My Recent Trips"}
              </Typography>
              <Button
                variant="text"
                size="small"
                component={Link}
                href={isAdmin ? "/travel" : "/dashboard/user/travel_post"}
                endIcon={<Visibility />}
              >
                View All
              </Button>
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <List sx={{ p: 0 }}>
              {recentTrips.length > 0 ? (
                recentTrips.map((trip: TTrip, index: number) => (
                  <ActivityItem key={trip.id || index} trip={trip} />
                ))
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                  py={3}
                >
                  {isAdmin
                    ? "No trips available"
                    : "You haven't created any trips yet"}
                </Typography>
              )}
            </List>
          </Paper>
        </Grid>

        {isAdmin && (
          <Grid item xs={12} lg={6}>
            <Paper sx={{ p: 3, height: "fit-content" }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Typography variant="h6" fontWeight={600}>
                  Recent Users
                </Typography>
                <Button
                  variant="text"
                  size="small"
                  component={Link}
                  href="/dashboard/admin/user_management"
                  endIcon={<People />}
                >
                  Manage
                </Button>
              </Stack>
              <Divider sx={{ mb: 2 }} />
              <List sx={{ p: 0 }}>
                {recentUsers.length > 0 ? (
                  recentUsers.map((user: User, index: number) => (
                    <UserItem key={user.id || index} user={user} />
                  ))
                ) : (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                    py={3}
                  >
                    No users available
                  </Typography>
                )}
              </List>
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* Progress Section */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight={600}>
          {isAdmin ? "Platform Growth" : "Your Progress"}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={isAdmin ? 4 : 6}>
            <Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Typography variant="body2" color="text.secondary">
                  Trip Completion Rate
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {totalTrips > 0
                    ? Math.round((completedTrips / totalTrips) * 100)
                    : 0}
                  %
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={totalTrips > 0 ? (completedTrips / totalTrips) * 100 : 0}
                sx={{ height: 8, borderRadius: 4, bgcolor: "grey.200" }}
              />
            </Box>
          </Grid>
          {isAdmin && (
            <Grid item xs={12} md={4}>
              <Box>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Active Users
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {users.filter((u: User) => u.isActive).length}/{totalUsers}
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={
                    totalUsers > 0
                      ? (users.filter((u: User) => u.isActive).length /
                          totalUsers) *
                        100
                      : 0
                  }
                  sx={{ height: 8, borderRadius: 4, bgcolor: "grey.200" }}
                  color="success"
                />
              </Box>
            </Grid>
          )}
          <Grid item xs={12} md={isAdmin ? 4 : 6}>
            <Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Typography variant="body2" color="text.secondary">
                  {isAdmin ? "Current Month Activity" : "Active vs Total"}
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {activeTrips}/{totalTrips}
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={totalTrips > 0 ? (activeTrips / totalTrips) * 100 : 0}
                sx={{ height: 8, borderRadius: 4, bgcolor: "grey.200" }}
                color="warning"
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default DashboardPage;
