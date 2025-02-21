import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default React.memo(function TakeInput({open,setOpen,action}) {
  let [once,setOnce] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            event.stopPropagation()
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const url = formJson.url;
          action(url);
            handleClose();
          },
        }}
      >
        <DialogTitle> Add Image URL </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please pase link 
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="url"
            label="Image URL"
            type='url'
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
})
