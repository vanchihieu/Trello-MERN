import Button from "@mui/material/Button";
import { AccessAlarm, ThreeDRotation } from "@mui/icons-material";
import { useColorScheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import Stack from "@mui/material/Stack";

function ModeChange() {
    const { mode, setMode } = useColorScheme();

    const handleChange = (event) => {
        const selectMode = event.target.value;
        setMode(selectMode);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
            <Select
                labelId="label-select-dark-light-mode"
                id="label-select-dark-light-mode"
                value={mode}
                label="Mode"
                onChange={handleChange}
            >
                <MenuItem value="light">
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={8}
                    >
                        <LightModeIcon fontSize="small" /> Light
                    </Stack>
                </MenuItem>
                <MenuItem value="dark">
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={8}
                    >
                        <DarkModeIcon fontSize="small" />
                        Dark
                    </Stack>
                </MenuItem>
                <MenuItem value="System">
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={8}
                    >
                        <SettingsBrightnessIcon fontSize="small" /> System
                    </Stack>
                </MenuItem>
            </Select>
        </FormControl>
    );
}

function ModeToggle() {
    const { mode, setMode } = useColorScheme();
    return (
        <Button
            onClick={() => {
                setMode(mode === "light" ? "dark" : "light");
            }}
        >
            {mode === "light" ? "Turn dark" : "Turn light"}
        </Button>
    );
}

function App() {
    return (
        <>
            <ModeChange />
            <ModeToggle />
            <Button variant="contained">Hello world</Button>
            <AccessAlarm />
            <ThreeDRotation />
        </>
    );
}

export default App;
