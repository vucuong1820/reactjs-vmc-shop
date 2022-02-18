import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import AlbumFeature from './features/Album';
import Counter from './features/Counter';
import TodoFeature from './features/Todo';

function App() {
  
  return (
    <div className="App">
      <Header/>
      <p>
        <NavLink to="/albums" activeClassName="active">
          Albums
        </NavLink>
      </p>
      <Switch>
        <Redirect from='/home' to="/" exact/>
        <Redirect from='/post-list/:postId' to="/posts/:postId" exact/>
        <Route path="/" exact component={Counter}/>
        <Route path="/todos" component={TodoFeature}/>
        <Route path="/albums" component={AlbumFeature}/>

      </Switch>
    </div>
  );
}

export default App;
