import React, { useEffect } from 'react';
import useStyles from './Style';
import { fetchMineProjectGroups } from '../../../../../store/actions';
import { useSelector } from 'react-redux';
import { selectMineProjectGroups } from '../../../../../store/selectors';
import Moment from 'react-moment';
import { getFormattedString } from '../../../../../Helper';
const MineProjectGroups = () => {
  const classes = useStyles();

  // Select state from Redux
  const MineProjectGroupsState = useSelector(selectMineProjectGroups);

  const isLoading = MineProjectGroupsState.loading;

  const GroupData = MineProjectGroupsState.data;

  const RenderMineProjectGroups = () => {
    return (
      GroupData &&
      GroupData.map((data, index) => (
        <div>
          <p> Sr. No {getFormattedString(index + 1)} </p>
          <p> Project Name: {getFormattedString(data.projectName)} </p>
          <p> Defination : {getFormattedString(data.definition)} </p>
          <p> Stu01 Name : {getFormattedString(data.stu01.name)} </p>
          <p> Stu01 Sem : {getFormattedString(data.stu01.sem)} </p>
          <p> Teamleader Name: {getFormattedString(data.teamLeader.name)} </p>
          <p> TeamLeader Sem : {getFormattedString(data.teamLeader.sem)} </p>
          <p> Faculty Name: {getFormattedString(data.faculty.name)} </p>
          <p> Faculty Phone : {getFormattedString(data.faculty.phone)} </p>
          <p>
            {' '}
            Faculty Skill :{' '}
            {getFormattedString(
              data.technology.map((value) => <span> {value} </span>)
            )}{' '}
          </p>
          <p>
            Faculty Designation : {getFormattedString(data.faculty.designation)}
          </p>
          <p>
            Date :
            <Moment format='DD/MMM/YYYY'>
              {getFormattedString(data.createdAt)}
            </Moment>
          </p>
        </div>
      ))
    );
  };

  useEffect(() => {
    fetchMineProjectGroups();
  }, []);
  return (
    <div>
      <h1>Mine Project Group</h1>
      {RenderMineProjectGroups()}
    </div>
  );
};

export default MineProjectGroups;
