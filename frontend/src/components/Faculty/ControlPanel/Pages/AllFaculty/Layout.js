import React, { useEffect } from 'react';
import useStyles from './Style';

import { selectAllFaculties } from '../../../../../store/selectors';
import { GetAllFaculties } from '../../../../../store/actions';
import { useSelector } from 'react-redux';

function AllFaculty() {
  const classes = useStyles();

  useEffect(() => {
    GetAllFaculties();
  }, []);

  const AllFacultyState = useSelector(selectAllFaculties);
  AllFaculty = AllFacultyState.data;

  return (
    <div>
      <h1>Get All Faculty</h1>
      {AllFaculty && AllFaculty.map((data) => console.log(data))}
    </div>
  );
}

export default AllFaculty;
