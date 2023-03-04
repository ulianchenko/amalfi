import React, { useCallback, useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const withSubscribe = (Component) => (props) => {
    const [data, setData] = useState('');
    const handleSubscribe = () => {
      setData('');
    };

    const handleChange = useCallback(event => {
      setData(event.target.value);
    }, []);

    const handleMouseDown = (e) => {
      e.preventDefault();
    };

    return (
      <Component
        {...props}
        onChange={handleChange}
        value={data}
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
