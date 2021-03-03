import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    margin: '2rem',
    fontSize: '2rem',
  },
}));

function Error404() {
  const classes = useStyles();

  return <div className={classes.root}>Error 404</div>;
}

export default Error404;
