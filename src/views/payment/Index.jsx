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
a
*/
import React from "react";
// react plugin used to create charts

// reactstrap components
import {
  
  Row,
  Col
} from "reactstrap";
import Page from 'react-page-loading';
// import {browserHistory} from "react-router";
// core components
import PersonalPage from "./PersonalPage";

class Index extends React.Component {
  render() {
    return (
      <Page loader={"bubble-spin"} color={"#A9A9A9"} size={8}>
        <Row className="justify-content-between align-items-center search-page">
          <Col lg="12" className="initial pade-bottom">
            
            <PersonalPage />
            
          </Col>
          
        </Row>
      </Page>
    );
  }
}

export default Index;
