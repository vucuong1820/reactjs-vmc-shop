import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import NotFound from './components/NotFound';
import CartFeature from './features/Cart';
import ProductFeature from './features/Product';
import Search from './features/Search';

function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Redirect from='/' to="/products" exact/>
        <Route path="/products" component={ProductFeature}/>
        <Route path="/cart" component={CartFeature}/>
        <Route path="/search"  component={Search}/>
        <Route component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
