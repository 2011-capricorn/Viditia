import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core'
import {Visibility, VisibilityOff} from '@material-ui/icons'
import React from 'react'

const ConfirmPassword = ({
  title1,
  title2,
  password,
  confirmPassword,
  showPassword,
  showConfirmPassword,
  setPassword,
  setConfirmPassword,
  setShowPassword,
  setShowConfirmPassword,
}) => {
  return (
    <div>
      <FormControl variant="outlined" id="mgt" fullWidth={true}>
        <InputLabel htmlFor={title1}>{title1}</InputLabel>
        <OutlinedInput
          id={title1}
          labelWidth={75}
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl variant="outlined" id="mgt" fullWidth={true}>
        <InputLabel htmlFor={title2}>{title2}</InputLabel>
        <OutlinedInput
          id={title2}
          labelWidth={135}
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
              >
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  )
}

export default ConfirmPassword
