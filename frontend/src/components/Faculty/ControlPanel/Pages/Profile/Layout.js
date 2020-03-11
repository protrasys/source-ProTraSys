import React from 'react';
import useStyles from './Style';

import { Skeleton } from '@material-ui/lab';

import { getFormattedString } from '../../../../../Helper';
import { selectFaculty } from '../../../../../store/selectors';
import { useSelector } from 'react-redux';

function FacultyProfile() {
  const classes = useStyles();

  const FacultyDetails = useSelector(selectFaculty);
  const Faculty = { ...FacultyDetails.data };

  const RenderFacultyProfiles = () => (
    <div>
      <div>{getFormattedString(Faculty.name)}</div>
      <div>
        {' '}
        <img
          src={Faculty.profile}
          alt='Faculty Profile Image'
          height={110}
        />{' '}
      </div>
      <div>{getFormattedString(Faculty.enrollmentId)}</div>
      <div>{getFormattedString(Faculty.phone)}</div>
      <div>{getFormattedString(Faculty.email)}</div>
      <div>{getFormattedString(Faculty.designation)}</div>
      <div>{getFormattedString(Faculty.createdAt)}</div>
      <div>{getFormattedString(Faculty.updatedAt)}</div>
    </div>
  );

  return (
    <div>
      <h1>Faculty Profile</h1>
      {FacultyDetails.loading ? (
        <Skeleton height={400} variant='rect' animation='wave' />
      ) : (
        RenderFacultyProfiles()
      )}
    </div>
  );
}

export default FacultyProfile;
