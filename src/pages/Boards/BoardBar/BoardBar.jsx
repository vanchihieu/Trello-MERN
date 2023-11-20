import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const MENU_STYLES = {
    color: "white",
    bgcolor: "transparent",
    border: "none",
    paddingX: "5px",
    borderRadius: "5px",
    ".MuiSvgIcon-root": {
        color: "white",
    },
    "&:hover": {
        bgcolor: "primary.50",
    },
};

const BoardBar = () => {
    return (
        <Box
            sx={{
                // backgroundColor: "primary.dark",
                width: "100%",
                height: (theme) => theme.trello.boardBarHeight,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                overflow: "auto",
                paddingX: { xs: 0, md: 2 },
                bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Chip
                    sx={MENU_STYLES}
                    icon={<DashboardIcon />}
                    label="ChiHieu Dev MERN Stack Board"
                    clickable
                    
                />
                <Chip
                    sx={MENU_STYLES}
                    icon={<VpnLockIcon />}
                    label="Public/Private Workspace"
                    clickable
                />

                <Chip
                    sx={MENU_STYLES}
                    icon={<AddToDriveIcon />}
                    label="Add to Google Drive"
                    clickable
                />
                <Chip
                    sx={MENU_STYLES}
                    icon={<BoltIcon />}
                    label="Automation"
                    clickable
                    onClick={() => {}}
                />
                <Chip
                    sx={MENU_STYLES}
                    icon={<BoltIcon />}
                    label="Filter"
                    clickable
                    onClick={() => {}}
                />
                <Chip
                    sx={MENU_STYLES}
                    icon={<FilterListIcon />}
                    label="Filter"
                    clickable
                    onClick={() => {}}
                />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Button
                    variant="outlined"
                    startIcon={<PersonAddIcon />}
                    sx={{
                        color: "white",
                        borderColor: "white",
                        "&:hover": { borderColor: "white" },
                    }}
                >
                    Invite
                </Button>

                <AvatarGroup
                    max={5}
                    sx={{
                        gap: "10px",
                        "& .MuiAvatar-root": {
                            width: "34px",
                            height: "34px",
                            fontSize: 16,
                            border: "none",
                            color: "white",
                            cursor: "pointer",
                            "&:first-of-type": { bgcolor: "#a4b0de" },
                        },
                    }}
                >
                    <Tooltip title="chihieudev">
                        <Avatar
                            alt="chihieudev"
                            src="https://images.unsplash.com/photo-1699563070885-8e955e11735b?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        />
                    </Tooltip>
                    <Tooltip title="chihieudev">
                        <Avatar
                            alt="chihieudev"
                            src="https://images.unsplash.com/photo-1700219042631-e0fb71e0c7fb?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        />
                    </Tooltip>
                    <Tooltip title="chihieudev">
                        <Avatar
                            alt="chihieudev"
                            src="https://images.unsplash.com/photo-1700223173652-819d8268be60?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        />
                    </Tooltip>
                    <Tooltip title="chihieudev">
                        <Avatar
                            alt="chihieudev"
                            src="https://plus.unsplash.com/premium_photo-1681530700755-e8079add58ef?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        />
                    </Tooltip>
                    <Tooltip title="chihieudev">
                        <Avatar
                            alt="chihieudev"
                            src="https://images.unsplash.com/photo-1699793822444-092628799108?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        />
                    </Tooltip>
                    <Tooltip title="chihieudev">
                        <Avatar
                            alt="chihieudev"
                            src="https://images.unsplash.com/photo-1700234272458-cdad09b6b7ba?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        />
                    </Tooltip>
                </AvatarGroup>
            </Box>
        </Box>
    );
};

export default BoardBar;
