import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserData, logOut } from '../../../store/users';
import Avatar from '../../common/Avatar';
import Tooltip from '../../common/Tooltip';

const NavProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUserData());

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickSettingsMenu = (path) => {
    navigate(path);
    handleCloseUserMenu();
  };

  const handleLogOut = () => {
    dispatch(logOut());
    navigate('/');
  };

  if (currentUser) {
    const { avatarPhoto, firstName, secondName } = currentUser;
    return (
      <div className='profile-wrapper'>
        <Tooltip title='Open menu' placement='bottom'>
          <IconButton onClick={handleOpenUserMenu} className='profile-avatar__btn'>
            <Avatar alt='user-photo' src={avatarPhoto || ''} />
          </IconButton>
        </Tooltip>
        <div className='profile-username__wrapper'>
          <span className='profile-username__greeting'>Welcome!</span>
          <div className='profile-username__name'>{`${firstName} ${secondName}`}</div>
        </div>
        <Menu
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
          className='profile-menu'
        >
          <MenuItem
            className='profile-menu__item'
            onClick={() => handleClickSettingsMenu(`/profile/${currentUser._id}`)}
          >
            <AccountCircleIcon />
            Profile
          </MenuItem>
          {currentUser.role === 'admin' && (
            <MenuItem
              className='profile-menu__item'
              onClick={() => handleClickSettingsMenu(`/profile/${currentUser._id}/dashboard`)}
            >
              <AdminPanelSettingsIcon />
              Admin panel
            </MenuItem>
          )}
          <MenuItem
            className='profile-menu__item'
            onClick={() => handleClickSettingsMenu(`/profile/${currentUser._id}/booking`)}
          >
            <StarBorderIcon />
            Bookings
          </MenuItem>
          <MenuItem
            className='profile-menu__item'
            onClick={() => handleClickSettingsMenu(`/profile/${currentUser._id}/likes`)}
          >
            <FavoriteBorderIcon />
            Likes
          </MenuItem>
          <MenuItem
            className='profile-menu__item'
            onClick={() => handleClickSettingsMenu(`/profile/${currentUser._id}/favorites`)}
          >
            <BookmarkBorderIcon />
            Favorites
          </MenuItem>
          <MenuItem className='profile-menu__item' onClick={handleLogOut}>
            <ExitToAppIcon />
            Exit
          </MenuItem>
        </Menu>
      </div>
    );
  }
  return <>Loading...</>;
};

export default NavProfile;
