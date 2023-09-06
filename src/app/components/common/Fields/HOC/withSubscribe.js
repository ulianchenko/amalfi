import React, { useCallback, useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const withSubscribe = (Component) => (props) => {
    const [data, setData] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    // const [focused, setFocused] = useState(false);

    const handleSubscribe = (event) => {
      setData('');
      setSubscribed(true);
      event.currentTarget.focus();
      // setFocused(false);
      // target.closest('.MuiOutlinedInput-root').firstChild.blur();
      // target.closest('button').focus();
      // document.activeElement.blur();
      setTimeout(() => {
        setSubscribed(false);
      }, 1000);
    };

    // const handleFocus = () => {
    //   setFocused(true);
    // };

    // const handleBlur= () => {
    //   setFocused(false);
    // };

    const handleChange = useCallback(({target}) => {
      setData(target.value);
    }, []);

    const handleMouseDown = (e) => {
      e.preventDefault();
    };

    return (
      <Component
        {...props}
        onChange={handleChange}
        // onFocus={handleFocus}
        // onBlur={handleBlur}
        value={data}
        helperText={subscribed ? 'Thank you' : null}
        // focused={focused}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='subscribe'
                onClick={handleSubscribe}
                onMouseDown={handleMouseDown}
                edge='end'
                color='primary'
              >
                <SendIcon color='primary' />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  };

export default withSubscribe;
