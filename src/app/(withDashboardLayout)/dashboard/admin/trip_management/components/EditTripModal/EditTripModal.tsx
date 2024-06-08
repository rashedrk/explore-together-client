"use client";

import CSDatePicker from "@/components/Forms/CSDatePicker";
import CSForm from "@/components/Forms/CSForm";
import CSInput from "@/components/Forms/CSInput";
import CSSelect from "@/components/Forms/CSSelect";
import CSModal from "@/components/shared/CSModal/CSModal";
import { tripType } from "@/constants/trip";
import { useUpdateTripMutation } from "@/redux/features/trip/tripApi";
import { TTrip } from "@/types/trip";
import { Button, Grid } from "@mui/material";
import dayjs from "dayjs";
import { FieldValues } from "react-hook-form";

type TProps = {
  trip: TTrip | null;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditTripModal = ({ trip, open, setOpen }: TProps) => {
  const [updateTrip] = useUpdateTripMutation();

  const defaultValues = {
    destination: trip?.destination,
    startDate: dayjs(trip?.startDate),
    endDate: dayjs(trip?.endDate),
    budget: trip?.budget,
    type: trip?.type,
  };
  const handleUpdate = async (values: FieldValues) => {
    const updatedData = {
      id: trip?.id,
      data: values,
    };
    updateTrip(updatedData);
    setOpen(false)
  };
  return (
    <CSModal open={open} setOpen={setOpen} title="Edit Trip Details">
      <CSForm onSubmit={handleUpdate} defaultValues={defaultValues}>
        <Grid container spacing={2} sx={{ width: "500px", mb: 2 }}>
          <Grid item md={12}>
            <CSInput
              name="destination"
              label="Destination"
              type="text"
              fullWidth={true}
            />
          </Grid>
          <Grid item md={6}>
            <CSDatePicker
              name="startDate"
              label="Start Date"
              fullWidth={true}
            />
          </Grid>
          <Grid item md={6}>
            <CSDatePicker name="endDate" label="End Date" fullWidth={true} />
          </Grid>
          <Grid item md={6}>
            <CSInput
              name="budget"
              label="Budget"
              type="number"
              fullWidth={true}
            />
          </Grid>
          <Grid item md={6}>
            <CSSelect
              name="type"
              label="Trip Type"
              items={tripType}
              fullWidth={true}
            />
          </Grid>
        </Grid>
        <Button type="submit">Update</Button>
      </CSForm>
    </CSModal>
  );
};

export default EditTripModal;
