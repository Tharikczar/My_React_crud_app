
import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';



  
  function CustomSnackbar({ open, handleClose }) {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Successfully Submitted!
        </Alert>
      </Snackbar>
    );
  }

export default CustomSnackbar;
