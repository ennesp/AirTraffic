import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import App from "./App";
import Flight from "./Flight";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={App} exact />
      <Route path="/flight/:id" component={Flight} />
    </Switch>
  </BrowserRouter>
);

export default Router;
