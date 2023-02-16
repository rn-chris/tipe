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
import TripList from "./TripList";

class SearchPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      depart_list: [],
      return_list: [],
      start: this.props.match.params.startdate,
      end: this.props.match.params.enddate,
      height: window.innerHeight
    }
    console.log(window.innerHeight);
  }
  componentDidMount() {
    document.body.classList.toggle("landing-page");
    localStorage.price = "0.00";
    localStorage.startdate = "";
    localStorage.enddate = "";
    fetch('http://localhost/booking/websiterestcontroller/trip_get', {
			method: 'POST',
			body: JSON.stringify({
				date: localStorage.start,
        place: "mersing",
        method: "start"
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		}).then(response => {
			return response.json();
		}).then(result => {
			console.log(result);
      
      this.setState({depart_list: result});
    });
    fetch('http://localhost/booking/websiterestcontroller/trip_get', {
			method: 'POST',
			body: JSON.stringify({
				date: localStorage.end,
        place: "tioman",
        method: "end"
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		}).then(response => {
			return response.json();
		}).then(result => {
			this.setState({return_list: result})
		});
  }
  componentWillUnmount() {
    document.body.classList.toggle("landing-page");
  }
  
  render() {
    return (
      <Page loader={"bubble-spin"} color={"#A9A9A9"} size={8}>
        <Row className="justify-content-between align-items-center search-page">
          <Col lg="12" className="initial pade-bottom">
            
            <TripList return={this.state.return_list} depart={this.state.depart_list} date={[this.state.start, this.state.end]}/>
            
          </Col>
          
        </Row>
      </Page>
    );
  }
}

export default SearchPage;
