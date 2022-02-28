import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Notification = ({ open, setOpen, type }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <MuiAlert
          onClose={handleClose}
          style={{
            backgroundColor: "#110f12",
            marginTop: "80px",
          }}
          severity={type === "remove" ? "error" : "success"}
          variant="filled"
        >
          {type === "add"
            ? "Successfully added!"
            : type === "update"
            ? "Successfully updated!"
            : type === "remove"
            ? "Successfully removed!"
            : null}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Notification;
