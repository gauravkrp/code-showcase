import React, { useState } from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const UrlInput = (props: any) => {
  const [protocal, setProtocal] = useState('https://');
  const { ifLabel, label, name, placeholder, errors, defaultValue, disabled, inputRef, ...rest } =
    props;

  return (
    <>
      {ifLabel && (
        <label htmlFor={name} className="formLabel">
          {label}
        </label>
      )}
      <div className="urlInput-wrap">
        <Select
          labelId="url-select-label"
          id="url-select"
          value={protocal}
          onChange={(event: React.ChangeEvent<{ value: any }>) => setProtocal(event.target.value)}
        >
          <MenuItem value={'http://'}>http://</MenuItem>
          <MenuItem value={'https://'}>https://</MenuItem>
        </Select>
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          className={'formInput urlInput' + (errors ? ' is-invalid' : '')}
          defaultValue={defaultValue}
          disabled={disabled}
          ref={inputRef}
          {...rest}
        />
      </div>
    </>
  );
};

export default UrlInput;
