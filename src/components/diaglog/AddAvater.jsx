import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useRecoilState } from "recoil";
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
  let [user,setUser] = useRecoilState(userAtom)
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
              const file = formJson.url;
            
              axios
                .patch(
                  baseUrl + "/img",
                  {avater:file,token:user.data.token,email: user.data.email},
                  {
                    headers: { "Access-Control-Allow-Origin": "*" },
                  }
                )
                .then((resp) => {
                  if (resp.data.status) {
                    success("Updated!");
                    setUser({isLoggedIn:true, data:resp.data.data})
                    setTimeout(() => {
                      dismissAll()
                     handleClose()
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
        <DialogTitle>Update Profile Pics</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Paste Image URL below
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="url"
            name="url"
            label="New Image"
            type="url"
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
