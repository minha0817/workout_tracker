import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

//Create a confirmatin component for deletion.
export default function Confirmation(props) {
  //Set ConfirmationOpen to false
  const handleClose = () => {
    props.setConfirmOpen(false);
  };

  //Close confirmation and delete
  const confirmDelete = () => {
    handleClose();
    props.confirmDelete();
  };

  return (
    <div>
      <Dialog
        open={props.confirmOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to delete this ${props.resource}?`}
        </DialogTitle>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            size="small"
            sx={{ ml: "10px" }}
            onClick={confirmDelete}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
