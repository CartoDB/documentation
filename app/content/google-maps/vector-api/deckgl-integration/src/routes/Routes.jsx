import { lazy } from 'react';
import { Switch, Route } from 'react-router';
import { DefaultPath } from './paths';
import Error404Page from 'pages/Error404/Error404';

const HomePage = lazy(() => import('pages/Home/Home'));

function Routes() {
  return (
    <Switch>
      <Route exact path={DefaultPath} component={HomePage} />
      <Route component={Error404Page} />
    </Switch>
  );
}

export default Routes;
