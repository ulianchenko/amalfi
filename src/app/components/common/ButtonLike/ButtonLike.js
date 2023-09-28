import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../../../store/users';

const ButtonLike = ({ displayCount, status, onToggle }) => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  return (
    <IconButton
      aria-label='like'
      onClick={onToggle}
      className={status ? 'like-button like-button--active' : 'like-button'}
      disableRipple
      disabled={!isLoggedIn}
    >
      <div className='like-button__wrapper'>
        <span className='visually-hidden'>Likes:</span>
        {status ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        {displayCount}
      </div>
    </IconButton>
  );
};

export default ButtonLike;
