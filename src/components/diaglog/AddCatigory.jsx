import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
const baseUrl = import.meta.env.VITE_baseUrl;

export default React.memo(function AddCatigory({
  open,
  setOpen,
  catiList,
  setCatiList,
  info,
  success,
  error,
  dismissAll,
  type
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            info("Please Wait...");
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const cati = formJson.text;
            let list = catiList.toString().toLowerCase();
            if (list.includes(String(cati).toLowerCase())) {
              error("This Catigory Already Exist");
              setTimeout(() => {
                dismissAll();
              }, 5000);
            } else {
              let typeUrl = "";
              if (type === "blog") {
                typeUrl = "/blog_category";
              } else if (type === "shop") {
                typeUrl = "/shop_category";
              } else if (type === "portfolio") {
                typeUrl = "/portfolio_category";
              }
              axios
                .post(
                  baseUrl + typeUrl,
                  { category: cati },
                  {
                    headers: { "Access-Control-Allow-Origin": "*" },
                  }
                )
                .then((resp) => {
                  if (resp.data.status) {
                    success("Added!");
                    setCatiList(resp.data.data.categories);
                    setTimeout(() => {
                      dismissAll();
                      handleClose();
                    }, 1000);
                  }
                })
                .catch((err) => {
                  error("An Error occured!");
                });
            }
          },
        }}
      >
        <DialogTitle>Add New Categroy</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Enter Your desired Category
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="text"
            name="text"
            label="New Category"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
});
