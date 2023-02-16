/*!

=========================================================
* BLK Design System React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Index from "views/Index.jsx";
import SearchPage from "views/result/SearchPage.jsx";
import Payment from "views/payment/Index.jsx";
class App extends React.Component {

    render() {
      return (
        <BrowserRouter>
            <Switch>
                <Route path="/home" render={props => <Index {...props} />} />
                <Route
                    path="/search"
                    render={props => <SearchPage {...props} />}
                />
                <Route
                    path="/payment"
                    render={props => <Payment {...props} />}
                />
                <Redirect from="/" to="/home" />
            </Switch>
        </BrowserRouter>
      );
    }
  }
export default App;



