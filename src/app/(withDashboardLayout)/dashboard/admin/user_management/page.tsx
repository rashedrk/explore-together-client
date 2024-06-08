"use client";

import Loader from "@/components/shared/Loader/Loader";
import {
  useGetAllUsersQuery,
  useUpdateUserRoleStatusMutation,
} from "@/redux/features/user/userApi";
import {
  Button,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Tooltip,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";

const UserManagementPage = () => {
  const { data, isLoading } = useGetAllUsersQuery(undefined);
  const [updateUser] = useUpdateUserRoleStatusMutation();

  //menu items for role:
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (id: string, role: string) => {
    updateUser({
      id,
      data: {
        role,
      },
    });

    setAnchorEl(null);
  };

  const updateStatus = (row: any) => {
    const update = {
      id: row.id,
      data: {
        isActive: !row.isActive,
      },
    };
    updateUser(update);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },

    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    {
      field: "isActive",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row }) => <Switch size="small" checked={row.isActive} onClick={() => updateStatus(row)} />,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <>
            <Tooltip title="Edit Role">
              <IconButton
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <DriveFileRenameOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => handleMenuItemClick(row.id, "admin")}>
                Admin
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick(row.id, "user")}>
                User
              </MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <DataGrid
          rows={data?.data}
          columns={columns}
          hideFooterPagination
          disableColumnMenu
          disableColumnSorting
          disableRowSelectionOnClick
        />
      )}
    </>
  );
};

export default UserManagementPage;
