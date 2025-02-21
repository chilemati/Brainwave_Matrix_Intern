import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atoms/user";
const baseUrl = import.meta.env.VITE_baseUrl;

export default React.memo(function AddImage({
  open,
  setOpen,
  image,
  setImage,
  info,
  success,
  error,
  dismissAll,
}) {
  let user = useRecoilValue(userAtom)
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
            if (!user.isLoggedIn) {
              error("Please login first!");
              setTimeout(() => {
                dismissAll()
              }, 5000);
            } else {
              const formData1 = new FormData(event.currentTarget);
              const formData = new FormData();
              const formJson = Object.fromEntries(formData1.entries());
              const file = formJson.file;
              formData.append('img',file)
              formData.append('email',user.data.email)
              formData.append('token',user.data.token)
              axios
                .post(
                  baseUrl + "/img",
                  formData,
                  {
                    headers: { "Access-Control-Allow-Origin": "*",'Content-Type': 'multipart/form-data' },
                  }
                )
                .then((resp) => {
                  if (resp.data.status) {
                    success("Added!");
                    setImage(resp.data.data);
                    setTimeout(() => {
                      dismissAll()
                      handleClose();
                    }, 1000);
                  }else{
                    error(resp.data.err)
                  }
                })
                .catch((err) => {
                  console.log(err)
                  error("An Error occured! | "+ err);
                });
            }
          },
        }}
      >
        <DialogTitle>Add New Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Select an Image 
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="file"
            name="file"
            label="New Image"
            type="file"
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
