import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    margin: '2rem',
    fontSize: '2rem',
  },
}));

function Loading() {
  const classes = useStyles();

  return <div className={classes.root}>Loading...</div>;
}

export default Loading;
