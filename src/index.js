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
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store/index";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.0.0";
import "assets/demo/demo.css";

import App from "./App";
import { setDefaultTranslations, setDefaultLanguage } from 'react-multi-lang'
import ru from './translations/ru.json';
import en from './translations/en.json';

setDefaultTranslations({ru, en})
setDefaultLanguage('en')

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById("root"));

