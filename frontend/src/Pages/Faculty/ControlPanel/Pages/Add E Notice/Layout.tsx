import React, { useState } from 'react';
import useStyles from './Style';
import {
  Snackbar,
  IconButton,
  Slide,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Box,
  Button,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { getFormattedString } from '../../../../../Helper';
import { useSelector } from 'react-redux';
import { AddNewENotice } from '../../../../../Store/actions';
import { selectAlerts } from '../../../../../Store/selectors';
const ProTraSys = require('../../../../../assets/ProTraSys_Logo.png');

const AddENotice = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    title: '',
    description: '',
  });

  const AlertState = useSelector(selectAlerts);

  const handleValueChange = (e: any) => {
    e.persist();
    setState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    await AddNewENotice(state);
    setOpen(true);
    setState({
      title: '',
      description: '',
    });
  };

  const handleSnackBarClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        transitionDuration={500}
        key={Math.random()}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        ContentProps={{
          classes: {
            root: AlertState.data !== null ? classes.success : classes.danger,
          },
        }}
        TransitionComponent={Slide}
        message={!AlertState.loading && getFormattedString(AlertState.data)}
        action={
          <React.Fragment>
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={handleSnackBarClose}
            >
              <Close fontSize='small' />
            </IconButton>
          </React.Fragment>
        }
      />
      <h1 style={{ marginBottom: '.5rem' }}>Upload E Notice</h1>
      <Box className={classes.root}>
        <Card className={classes.card}>
          <form onSubmit={handleFormSubmit}>
            <CardContent>
              <Box style={{ textAlign: 'center' }}>
                <img src={ProTraSys} alt='Logo' className={classes.img} />
                <Typography className={classes.text} color='inherit'>
                  Add New E-Notice
                </Typography>
              </Box>
              <TextField
                type='text'
                name='title'
                onChange={handleValueChange}
                value={state.title}
                placeholder='Notice Title'
                required
                fullWidth={true}
                label='Notice Title'
                variant='outlined'
                className={classes.formControl}
              ></TextField>
              <TextField
                type='text'
                onChange={handleValueChange}
                value={state.description}
                name='description'
                placeholder='Enter Notice Description'
                required
                fullWidth={true}
                multiline={true}
                rows='4'
                label='Notice Description'
                variant='outlined'
                className={classes.formControl}
              ></TextField>
            </CardContent>
            <CardActions>
              <Button
                type='submit'
                className={classes.btn}
                variant='contained'
                size='large'
              >
                Upload Notice
              </Button>
            </CardActions>
          </form>
        </Card>
      </Box>
    </div>
  );
};

export default AddENotice;
