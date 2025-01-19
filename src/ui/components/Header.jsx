// import React from 'react'
import { Howler } from "howler";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  CheckedInIcon,
  CheckIcon,
  CloseIcon,
  HomeIcon,
  MinimizeIcon,
  SoundOnIcon,
  Visbility,
} from "../assets/Icones";
import HeaderBackground from "../public/backgrounds/headerBackground.png";
import LobbyBg from "../public/backgrounds/lobbyBg.png";
import { useState } from "react";

function Header({ balance }) {
  const [toggle, setToggle] = useState(false);
  const [visibillity, setVisibillity] = useState(true)

  const muteFun = function () {
    Howler.mute(!toggle);
    setToggle(!toggle);
  };
  const handleMinimize = () => {
    window.electronAPI.minimize();
  };

  const handleClose = () => {
    window.electronAPI.close();
  };

  return (
    <Box
      sx={{
        background: "rgb(42,43,46)",
        fontSize: "16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundImage: `linear-gradient(0deg, rgba(42,43,46,1) 43%, rgba(112,117,125,1) 100%)`,
        position: "relative",
      }}
    >
      <img
        src={LobbyBg}
        alt=""
        style={{ position: "absolute", height: "100%" }}
      />
      <img
        src={HeaderBackground}
        alt=""
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
      <Button
        sx={{
          textTransform: "none",
          color: "white",
          height: "100%",
          width: "95px",
          borderRadius: "0px",
          fontSize: "16px",
          ml: 2,
        }}
        startIcon={<HomeIcon />}
      >
        Lobby
      </Button>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          p: 2,
          py: "0.5rem",
        }}
      >
        <FormGroup>
          <FormControlLabel
            sx={{
              "& .MuiTypography-root": { color: "#EEDE01", fontSize: "20px" },
            }}
            control={
              <Checkbox
                size="large"
                checkedIcon={<CheckedInIcon />}
                icon={<CheckIcon />}
              />
            }
            label="P"
          />
        </FormGroup>

        <FormGroup>
          <FormControlLabel
            sx={{
              "& .MuiTypography-root": { color: "#EEDE01", fontSize: "20px" },
            }}
            control={
              <Checkbox
                size="large"
                checkedIcon={<CheckedInIcon />}
                icon={<CheckIcon />}
              />
            }
            label="AC"
          />
        </FormGroup>

        <InputBase
          sx={{
            px: 1,
            backgroundColor: "white",
            fontSize: "16px",
            height: "35px",
            borderRadius: "6px",
            width: "152px",
          }}
        />

        <Button
          size="small"
          sx={{
            px: 2,
            backgroundColor: "#0BCC05",
            color: "white",
            fontSize: "16px",
            fontWeight: "600",
            borderRadius: "6px",
            mr: 4,
          }}
        >
          Clame
        </Button>

        <Typography sx={{ color: "#EEDE01", fontSize: "18px" }}>
          Welcome, Classic302
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: "2px",
            pr: "4px",
            background:
              "linear-gradient(180deg, rgba(255,237,189,1) 0%, rgba(198,146,2,1) 100%)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            width: 200,
          }}
        >
          <Box
            sx={{
              backgroundColor: "#1F242A",
              borderRadius: "4px",
              px: 1,
              py: "3px",
              display: "flex",
              alignItems: "center",
              gap: 2
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: "16px",
              }}
            >
              Balance
            </Typography>
            <Checkbox
              size="small"
              checkedIcon={<Visbility />}
              icon={<Visbility />}
              sx={{ py: "5px", px: 0 }}
              checked={visibillity}
              onChange={(e)=> setVisibillity(e.target.checked)}
            />
          </Box>
          <Typography
            sx={{
              fontSize: "16px",
            }}
          >
            { visibillity ? "***.**" : balance + ".00" }
          </Typography>
        </Paper>

        <Stack direction={"row"}>
          <IconButton size="small" onClick={() => muteFun()}>
            <SoundOnIcon sx={{ fontSize: "36px" }} />
          </IconButton>
          <IconButton size="small" onClick={() => handleMinimize()}>
            <MinimizeIcon sx={{ fontSize: "36px" }} />
          </IconButton>
          <IconButton size="small" onClick={() => handleClose()}>
            <CloseIcon sx={{ fontSize: "36px" }} />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}

export default Header;
