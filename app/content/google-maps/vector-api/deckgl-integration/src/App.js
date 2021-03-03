import { Suspense } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Routes from 'routes/Routes';
import { useContextInApp, AppContextProvider } from 'context/AppContext';
import LoadingPage from 'pages/Loading/Loading';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  '@global': {
    html: {
      height: '100%',
      width: '100%',
    },
    body: {
      height: '100%',
      fontSize: '.5rem !important',
    },
    '#root': {
      height: '100%',
    },
  },
});

const App = () => {
  const contextValues = useContextInApp();
  useStyles();

  return (
    <AppContextProvider value={contextValues}>
      <Router>
        <Suspense fallback={<LoadingPage />}>
          <Routes />
        </Suspense>
      </Router>
    </AppContextProvider>
  );
};

export default App;
