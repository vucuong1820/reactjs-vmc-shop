import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import AlbumFeature from './features/Album';
import ProductFeature from './features/Product';

function App() {
  
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Redirect from='/home' to="/" exact/>
        <Redirect from='/post-list/:postId' to="/posts/:postId" exact/>
        <Route path="/albums" component={AlbumFeature}/>
        <Route path="/products" component={ProductFeature}/>

      </Switch>
    </div>
  );
}

export default App;
