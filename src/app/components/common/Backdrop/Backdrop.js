import { Backdrop as MuiBackdrop } from '@mui/material';
import Loader from '../Loader';

const Backdrop = ({ open }) => {
  return (
    <MuiBackdrop open={open || false}>
      <Loader />
    </MuiBackdrop>
  );
};

export default Backdrop;
