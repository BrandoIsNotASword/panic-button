import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import { root } from 'baobab-react/higher-order';
import tree from './tree';

import Main from './views/Main';
import Login from './views/Login';
import Home from './views/Home';

const { Component } = React;
const history = useRouterHistory(createHashHistory)({ queryKey: false });

/* eslint-disable */
import styles from '../styles/main.scss';
/* eslint-enable */

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Route path="/" component={Main}>
          <IndexRoute component={Login} />
          <Route path="/home" component={Home} />
        </Route>
      </Router>
    );
  }
}

const RootedApp = root(App, tree);

ReactDOM.render(<RootedApp />, document.getElementById('app'));
