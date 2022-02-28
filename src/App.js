import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import AlbumFeature from './features/Album';
import CartFeature from './features/Cart';
import ProductFeature from './features/Product';

function App() {
  
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Redirect from='/' to="/products" exact/>
        <Redirect from='/post-list/:postId' to="/posts/:postId" exact/>
        <Route path="/albums" component={AlbumFeature}/>
        <Route path="/products" component={ProductFeature}/>
        <Route path="/cart" component={CartFeature}/>
      </Switch>
    </div>
  );
}

export default App;
