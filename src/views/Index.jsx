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
import { withRouter } from 'react-router-dom';
import Page from 'react-page-loading';
// core components
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";



// sections for this page/view
import JavaScript from "views/IndexSections/JavaScript.jsx";


class Index extends React.Component {
  
  componentDidMount() {
    document.body.classList.toggle("index-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("index-page");
  }
  render() {
    
    return (
      <Page loader={"bubble-spin"} color={"#A9A9A9"} size={8}>
        <div>
          <IndexNavbar />
          <div className="wrapper">
            
            <div className="main">
              <JavaScript />
            </div>
            {/* <Footer /> */}
          </div>
        </div>
      </Page>
    );
  }
}
Index = withRouter(Index);
export default Index;

