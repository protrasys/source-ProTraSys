import React from 'react';
import useStyles from './Style';
import { Skeleton } from '@material-ui/lab';
import { getFormattedString } from '../../../../../Helper';
import { selectFaculty } from '../../../../../store/selectors';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';

function FacultyProfile() {
  const classes = useStyles();

  const FacultyDetails = useSelector(selectFaculty);
  const Faculty = { ...FacultyDetails.data };

  const RenderFacultyProfiles = () => (
    <div>
      <div>Faculty Name : {getFormattedString(Faculty.name)}</div>
      <div>
        Faculty Profile Image :
        <img src={Faculty.profile} alt='Faculty Profile Image' height={110} />
      </div>
      <div>
        Faculty Enrollment ID : {getFormattedString(Faculty.enrollmentId)}
      </div>
      <div>Faculty Phone Number : {getFormattedString(Faculty.phone)}</div>
      <div>Faculty Email ID : {getFormattedString(Faculty.email)}</div>
      <div>Faculty Designation : {getFormattedString(Faculty.designation)}</div>
      <div>
        Faculty Joining Date :
        <Moment format='DD/MM/YYYY HH:MM:SS'>
          {getFormattedString(Faculty.createdAt)}
        </Moment>
      </div>
      <div>
        Faculty Updated At :
        <Moment format='DD/MM/YYYY HH:MM:SS'>
          {getFormattedString(Faculty.updatedAt)}
        </Moment>
      </div>
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
