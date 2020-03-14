import React, { useState, useEffect } from 'react';
import useStyles from './Style';
import { Skeleton } from '@material-ui/lab';
import { getFormattedString } from '../../../../../Helper';
import { useSelector } from 'react-redux';
import {
  GetAllStudents,
  AddNewProjectGroup
} from '../../../../../store/actions';
import {
  selectAllStudents,
  selectAlerts
} from '../../../../../store/selectors';
import { Snackbar, IconButton, Slide } from '@material-ui/core';
import { Close } from '@material-ui/icons';

const AddProjectGroup = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    GetAllStudents();
  }, []);

  const AllStudentState = useSelector(selectAllStudents);
  const AlertState = useSelector(selectAlerts);
  const isStudentsLoading = AllStudentState.loading;
  const StudentsData = AllStudentState.data;

  const [state, setState] = useState({
    projectName: '',
    definition: '',
    stu01: '',
    stu02: '',
    stu03: '',
    stu04: '',
    technology: '',
    teamLeader: ''
  });

  const handleValueChange = (e) => {
    e.persist();
    setState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await AddNewProjectGroup(state);
    setOpen(true);
    setState({
      projectName: '',
      definition: '',
      stu01: '',
      stu02: '',
      stu03: '',
      stu04: '',
      technology: '',
      teamLeader: ''
    });
  };

  const handleSnackBarClose = () => {
    setOpen(false);
  };

  return isStudentsLoading ? (
    <Skeleton variant='rect' animation='wave' height={500} />
  ) : (
    <div>
      <Snackbar
        open={open}
        transitionDuration={500}
        key={Math.random()}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        ContentProps={{
          classes: {
            root: AlertState.data !== null ? classes.success : classes.danger
          }
        }}
        TransitionComponent={Slide}
        message={!AlertState.loading && AlertState.data}
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
      <h1>Add New Project Group</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type='text'
          name='projectName'
          onChange={handleValueChange}
          value={state.projectName}
          placeholder='Enter Project Name'
          required
        />
        <input
          type='text'
          onChange={handleValueChange}
          value={state.definition}
          name='definition'
          placeholder='Enter Project Defintion'
          required
        />
        <input
          type='text'
          onChange={handleValueChange}
          value={state.technology}
          name='technology'
          placeholder='Enter Project Technologies sepreated by Coma ","'
          required
        />
        <select
          name='stu01'
          onChange={handleValueChange}
          defaultChecked={0}
          required
        >
          <option disabled selected>
            --Select Student 01--
          </option>
          {StudentsData &&
            StudentsData.map((data, index) => (
              <option key={index} name='stu01' value={data._id}>
                {getFormattedString(data.name)}
              </option>
            ))}
        </select>
        <select
          name='stu02'
          onChange={handleValueChange}
          defaultChecked={0}
          required
        >
          <option disabled selected>
            --Select Student 02--
          </option>
          {StudentsData &&
            StudentsData.map((data, index) => (
              <option key={index} name='stu02' value={data._id}>
                {getFormattedString(data.name)}
              </option>
            ))}
        </select>
        <select
          name='stu03'
          onChange={handleValueChange}
          defaultChecked={0}
          required
        >
          <option disabled selected>
            --Select Student 03--
          </option>
          {StudentsData &&
            StudentsData.map((data, index) => (
              <option key={index} name='stu03' value={data._id}>
                {getFormattedString(data.name)}
              </option>
            ))}
        </select>
        <select
          name='stu04'
          onChange={handleValueChange}
          defaultChecked={0}
          required
        >
          <option disabled selected>
            --Select Student 04--
          </option>
          {StudentsData &&
            StudentsData.map((data, index) => (
              <option key={index} name='stu04' value={data._id}>
                {getFormattedString(data.name)}
              </option>
            ))}
        </select>
        <select
          name='teamLeader'
          onChange={handleValueChange}
          defaultChecked={0}
        >
          <option disabled selected>
            --Select TeamLeader--
          </option>
          {StudentsData &&
            StudentsData.map((data, index) => (
              <option key={index} name='teamLeader' value={data._id}>
                {getFormattedString(data.name)}
              </option>
            ))}
        </select>
        <input type='submit' value='Add Group' />
      </form>
    </div>
  );
};

export default AddProjectGroup;
