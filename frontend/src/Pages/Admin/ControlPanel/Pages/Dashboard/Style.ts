import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  studentChartsRow: {
    flex: 1,
    background: 'linear-gradient(to right, #fc5c7d, #6a82fb)',
    color: 'white',
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    boxShadow: '0px 0px 4px 0px',
  },
  facultyChartsRow: {
    flex: 1,
    background: 'linear-gradient(to right, #43cea2, #185a9d)',
    color: 'white',
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    boxShadow: '0px 0px 4px 0px',
  },
  groupChartsRow: {
    flex: 1,
    background: 'linear-gradient(to left, #16a085, #f4d03f)',
    color: 'white',
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    boxShadow: '0px 0px 4px 0px',
  },
  noticeRow: {
    flex: 1,
    background: 'linear-gradient(to right, #ec008c, #fc6767)',
    color: 'white',
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    boxShadow: '0px 0px 4px 0px',
  },
  reportingsRow: {
    flex: 1,
    background: 'linear-gradient(to right, #be93c5, #7bc6cc)',
    color: 'white',
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    boxShadow: '0px 0px 4px 0px',
  },
  filesUploadedRow: {
    flex: 1,
    background: 'linear-gradient(to right, #f12711, #f5af19)',
    color: 'white',
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    boxShadow: '0px 0px 4px 0px',
  },
  mongodbCharts: {
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default useStyles;
