import { Box, Popover, Typography } from "@mui/material";

function MessageModal({ open, handleClose, anchorEl, id }) {
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      sx={{
        top: -20,
        left: -10,
        ".MuiPopover-paper": {
          width: 670,
          backgroundImage:
            "linear-gradient(191deg, rgba(238,222,1,1) 0%, rgba(249,140,7,1) 100%)",
          p: "2px",
          borderRadius: 2,
        },
      }}
    >
      <Box sx={{ bgcolor: "#232446", borderRadius: 2, py: 2 }}>
        <Typography
          sx={{ textAlign: "center", color: "white", fontSize: "26px" }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          PLACE YOUR BET
        </Typography>
      </Box>
    </Popover>
  );
}

export default MessageModal;
