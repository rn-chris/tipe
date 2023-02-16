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
import ReactDOM from 'react-dom'; 
import { connect } from "react-redux";
import ReactDatetime from "react-datetime";

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { translate, setLanguage } from 'react-multi-lang';
// reactstrap components
import {
  Button,
  Row,
  Col,
  FormGroup
} from "reactstrap";
import { NavLink } from "react-router-dom";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.jsx";
import server from "../../server_con/index.jsx";
const mapStateToProps = state => {
  console.log(state.articles);
  return { articles: state.articles };
};

class TripList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "",
      to: "",
      price: "0.00",
      direction_flg: localStorage.direction_flg,
      title: "",
      trip_time: "0",
      depart_list: [],
      return_list: [],
      select_index: "",
      select_index1: "",
      jetty: "Tekek",
      jetty_open: false,
      start_date: localStorage.start,
      end_date: localStorage.end
    }
    this.tripe_time = this.tripe_time.bind(this);
    this.next_page = this.next_page.bind(this);
    this.real_time_total_ticket = this.real_time_total_ticket.bind(this);
    this.jetty_change = this.jetty_change.bind(this);
    this.jetty_open = this.jetty_open.bind(this);
    this.date_picker = this.date_picker.bind(this);
    this.set_start_date = this.set_start_date.bind(this);
    this.set_end_date = this.set_end_date.bind(this);
    this.date_valid1 = this.date_valid1.bind(this);
    this.date_valid2 = this.date_valid2.bind(this);
  }
  componentDidMount() {
    this.tripe_time();
    this.real_time_total_ticket();
    var dt = new Date();
    console.log(dt);
         dt.setHours(dt.getHours() + 2);
         dt.setMinutes(dt.getMinutes() + 60);
    console.log(dt);
    localStorage.jetty_type = "Tekek";
    console.log(server);
    localStorage.start_id = "0";
    localStorage.end_id = "0";
    localStorage.price = "0.00";
    
  }
  date_valid1(current) {
    
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    return current.isAfter(yesterday);
    // return current.day() !== 0 && current.day() !== 3;
  }
  date_valid2(current) {
    var start_date = this.state.start_date + " 00:00:00";
    
    var yesterday = new Date(start_date);
    console.log(yesterday);
    yesterday.setDate(yesterday.getDate() - 1);
    
    return current.isAfter(yesterday);
    // return current.day() !== 0 && current.day() !== 3;
  }
  jetty_open() {
    this.setState({jetty_open: true});
    
  }
  jetty_change(type) {
    this.setState({jetty: type});
    localStorage.jetty_type=type;
    this.setState({jetty_open: false});
  }
  real_time_total_ticket() {
    var from = localStorage.from_to_flg==="true" ? "tioman" : "mersing";
    var to = localStorage.from_to_flg==="true" ? "mersing" : "tioman";
    fetch(server+'websiterestcontroller/trip_get', {
			method: 'POST',
			body: JSON.stringify({
				date: localStorage.start,
        place: from,
        method: "start"
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		}).then(response => {
			return response.json();
		}).then(result => {
      
			this.setState({depart_list: result});
    });
    fetch(server+'websiterestcontroller/trip_get', {
			method: 'POST',
			body: JSON.stringify({
				date: localStorage.end,
        place: to,
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
    setTimeout(this.real_time_total_ticket, 1000);
  }
  changeLang (lang) {
    setLanguage(lang)
  }
  tripe_time() {
    var a = parseInt(this.state.trip_time);
    a++;
    this.setState({trip_time: a});
    setTimeout(this.tripe_time, 1000);
  }
  date_format(date) {
    const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    var date1 = date+" 00:00:00";
    let current_datetime = new Date(date1);
    let formatted_date = current_datetime.getDate() + " " + months[current_datetime.getMonth()] + " " + current_datetime.getFullYear()
    return formatted_date;
  }
  two_hours(date) {
    var dt = new Date(date);
    dt.setHours(dt.getHours() + 2);
    dt.setMinutes(dt.getMinutes() + 10);
    return(this.formatAMPM(dt));
  }
  formatAMPM(date) {
    
    var hours = new Date(date).getHours();
    var minutes = new Date(date).getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  selectFrom(date, time, id, key) {
    
    var date1 = date+" "+time;
    this.setState({from: date1});
    this.setState({price: "35.00"});
    localStorage.price = "35.00";
    localStorage.startdate = date1;
    localStorage.start_id = id;
    this.setState({select_index: key})
  }
  selectTo(date, time, id, key) {
    if(localStorage.startdate === ""){
      
      toast.error("Please select departure !", {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    else{
      var date1 = date+" "+time;
      this.setState({to: date1});
      this.setState({price: "70.00"});
      localStorage.price = "70.00";
      localStorage.enddate = date1;
      localStorage.end_id = id;
      this.setState({select_index1: key})
    }
    
  }
  direction(value) {
    this.setState({direction_flg: value});
    if(!value && this.state.price !== "0.00") {
      this.setState({price: "35.00"});
      localStorage.price = "35.00";
      this.setState({to: ""});
      localStorage.enddate = "";
      localStorage.end_id = "0";
    }
  }
  next_page(event) {
    event.preventDefault();
    if(localStorage.price === "0.00"){
      
      toast.error(this.props.t('HomePage.message.0', {param:""}), {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    else{
      fetch(server+'websiterestcontroller/ticket_order', {
        method: 'POST',
        body: JSON.stringify({
          trip_id_depart: localStorage.start_id,
          trip_id_return: localStorage.end_id,
          order_amount: localStorage.price,
          jetty: localStorage.jetty_type,
          adult: localStorage.adult_num,
          child: localStorage.child_num
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(response => {
        return response.json();
      }).then(result => {
        localStorage.payment_page = false;
        localStorage.order_id = result.id;
        window.location.href = "/payment";
      });
      
    }
  }
  date_picker(index) {
    var picker = document.getElementsByClassName('rdtPicker');
    ReactDOM.findDOMNode(picker[0]).style.display = "none";
    ReactDOM.findDOMNode(picker[1]).style.display = "none";
    var p = picker[index];ReactDOM.findDOMNode(p).style.display = "block";
    ReactDOM.findDOMNode(p).style.visibility = 'visible';  
    ReactDOM.findDOMNode(p).style.opacity = '1';
    var date_input =  document.getElementsByClassName('form-control');
    ReactDOM.findDOMNode(date_input[index]).style.display = 'none';
    var date_group =  document.getElementsByClassName('form-group');
    ReactDOM.findDOMNode(date_group[index]).style.opacity = '1';
    
  }
  set_start_date(event){
    
    var picker = document.getElementsByClassName('rdtPicker');
    var p = picker[0];
    ReactDOM.findDOMNode(p).style.display = 'none';  
    
    var d = this.date_format(this.date_format_change(event._d));
    this.setState({start_date: d});
    localStorage.start = this.date_format_change(event._d);
  }
  set_end_date(event){
    
    var picker = document.getElementsByClassName('rdtPicker');
    var p = picker[1];
    ReactDOM.findDOMNode(p).style.display = 'none';  
    var d = this.date_format(this.date_format_change(event._d));
    this.setState({end_date: d});
    localStorage.end = this.date_format_change(event._d);
  }
  date_format_change(current_datetime){
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();
    return formatted_date;
  }
  render() {
    return (
      
      <Row>
        <Col lg="8" className="initial">
          <ExamplesNavbar/>
          <ToastContainer />
          
      <div className="trip-list-content">
        <Row className="justify-content-between align-items-center">
          <Col lg="4" className="pade-bottom" style={{height: "790px"}}>
          <div className="status_left">
            <div className="from-to-place">
              <div className="connect-line">
                <div className="start-dot blue"></div>
                <div className="end-dot blue"></div>
              </div>
              
              
              <div className="trip-rist">
                <div>
                  
                  <span>{this.props.t('HomePage.content.1', {param:""})}</span><br />
                  <h3>{localStorage.from_to_flg==="false" ? "MERSING" : "TIOMAN"}</h3>
                  <span>{localStorage.from_to_flg==="false" ? "Mersing Jetty" : "Toiman Jetty"}</span>
                </div>
                <br />
                <br />
                <div>
                  <span>{this.props.t('HomePage.content.2', {param:""})}</span><br />
                  <h3>{localStorage.from_to_flg==="true" ? "MERSING" : "TIOMAN"}</h3>
                  <span>{"Kg. "+this.state.jetty+" Jetty"}</span>
                </div>
              </div>
            </div>
            <div className="place_progress">
              <div className="line-dot">
                <div className="select-dot dot-in-progress" style={{marginTop: "0px"}}></div>
                <div className="passenger-dot"></div>
                <div className="payment-dot"></div>
              </div>
              <div className="complete-list" style={{marginBottom: "50px"}}>
                <p className="dot-list-active">{this.props.t('SearchPage.content.2', {param:""})}</p>
                <p>{this.props.t('SearchPage.content.3', {param:" "})}</p>
                <p>{this.props.t('SearchPage.content.4', {param:" "})}</p>
              </div>
            </div>
            </div>
          </Col>
          <Col lg="8" style={{minHeight: "790px"}}>
            {/* <div className="direction-method">
              <div>
                <Button className={this.state.direction_flg === "true" ? "direction_btn direction_btn_acitve" : "direction_btn" } size="sm" onClick={() => this.direction("true")}>
                {this.props.t('SearchPage.content.1', {param:" "})}
                </Button>
                <Button  className={this.state.direction_flg === "true" ? "direction_btn" : "direction_btn direction_btn_acitve" } size="sm" onClick={() => this.direction("false")}>
                {this.props.t('SearchPage.content.10', {param:" "})}
                </Button>
              </div>
              
            </div> */}
            <div className="trip-requests">
              <Row>
                <Col lg="3" className="col-3-custom">
                  <div className="card-part" onClick={() =>{this.date_picker(0)}}>
                    <p>{this.props.t('SearchPage.content.0', {param:" "})}</p>
                    <p>{this.date_format(this.state.start_date)}</p>
                  </div>
                  <FormGroup style={{opacity: "0"}}>
                    <ReactDatetime
                      dateFormat="YYYY-MM-DD" timeFormat={false}
                      onChange={this.set_start_date}
                      isValidDate = {this.date_valid1}
                    />
                  </FormGroup>
                </Col>
                {localStorage.direction_flg === "true" && (<Col lg="3" className="col-3-custom">
                  <div className="card-part" onClick={() =>{this.date_picker(1)}}>
                    <p>{this.props.t('SearchPage.content.1', {param:" "})}</p>
                    <p>{this.date_format(this.state.end_date)}</p>
                  </div>
                  <FormGroup style={{opacity: "0"}}>
                    <ReactDatetime
                      dateFormat="YYYY-MM-DD" timeFormat={false}
                      onChange={this.set_end_date}
                      isValidDate = {this.date_valid2}
                    />
                  </FormGroup>
                </Col>)}
                <Col lg="3" className="col-3-custom">
                  <div className="card-part" onClick={this.jetty_open}>
                    <p>Jetty</p>
                    <p>{this.state.jetty}</p>
                  </div>
                  {this.state.jetty_open &&(<div className="jetty">
                   <ul>
                     <li onClick={() => this.jetty_change("Tekek")}>Tekek</li>
                     <li onClick={() => this.jetty_change("ABC")}>ABC</li>
                     <li onClick={() => this.jetty_change("Salang")}>Salang</li>
                     <li onClick={() => this.jetty_change("Genting")}>Genting</li>
                     <li onClick={() => this.jetty_change("Paya")}>Paya</li>
                   </ul>
                  </div>)}
                </Col>
                <Col lg="3" className="col-3-custom">
                  <div className="card-part" style={{padding: "13px 20px"}}>
                    <p>{this.props.t('SearchPage.content.5', {param:" "})}</p>
                    <li className="fa fa-male" style={{fontSize: "24px", marginRight: "5px", color:"#0A429B"}}></li><span style={{marginRight: "15px", color:"#0A429B"}}>{localStorage.adult_num}X</span>
                    <li className="fa fa-male" style={{marginRight: "5px", color:"#0A429B"}}></li><span style={{color:"#0A429B"}}>{localStorage.child_num}X</span>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="trip-from-list">
              <h3>{this.props.t('SearchPage.content.0', {param:" "})}</h3>
              {
                this.state.depart_list.map(function(item, key) {//item.trip_required
                  return (
                    <div key={key} value={this.date_format(item.trip_date)} className={(this.state.select_index === key ? "card-click-active " : " ")+((item.trip_status === "active" && (parseInt(item.trip_quota) - parseInt(item.trip_required)) >= (parseInt(localStorage.adult_num) + parseInt(localStorage.child_num)) && item.befor_trip_date-this.state.trip_time > 21600) ? "card-part card-list card-active" : "card-part card-list")} onClick={(item.trip_status === "active" && (parseInt(item.trip_quota) - parseInt(item.trip_required)) >= (parseInt(localStorage.adult_num) + parseInt(localStorage.child_num)) && item.befor_trip_date-this.state.trip_time > 21600) ? () => this.selectFrom(this.date_format(item.trip_date), this.formatAMPM(item.trip_date+" "+item.trip_time), item.trip_id, key) : this.Noneactive}>
                      
                      <div className="trip-time">
                        <h4 style={{fontSize: "22px"}}>{this.formatAMPM(item.trip_date+" "+item.trip_time)} - {this.two_hours(item.trip_date+" "+item.trip_time)}</h4>
                        <span>{this.props.t('SearchPage.content.6', {param:" "})}  02:10 mins</span>
                      </div>
                      <div className="trip-info">
                        {(item.trip_status === "active") && (<div><sup  style={{color:"#0A429B",fontSize: "14px"}}>RM</sup><span style={{color:"#0A429B", fontSize: "23px"}}>35</span></div>)}
                        {item.trip_status === "full" && (<p className="text-danger">{this.props.t('SearchPage.status.2', {param:" "})}</p>)}
                        {item.trip_status === "inactive" && (<p className="text-warning">{this.props.t('SearchPage.status.1', {param:" "})}</p>)}
                        {(item.trip_status === "active" && (parseInt(item.trip_quota) - parseInt(item.trip_required)) >= (parseInt(localStorage.adult_num) + parseInt(localStorage.child_num)) && item.befor_trip_date-this.state.trip_time > 21600)  && (<p style={{color: "#417505"}}>{this.props.t('SearchPage.status.0', {param:" "})}</p>)}
                        {(item.trip_status === "active" && (parseInt(item.trip_quota) - parseInt(item.trip_required)) < (parseInt(localStorage.adult_num) + parseInt(localStorage.child_num)))  && (<p className="text-muted">{this.props.t('SearchPage.status.4', {param:" "})}({item.trip_quota-item.trip_required})</p>)}
                        {(item.trip_status === "active" && (parseInt(item.trip_quota) - parseInt(item.trip_required)) >= (parseInt(localStorage.adult_num) + parseInt(localStorage.child_num)) && item.befor_trip_date-this.state.trip_time < 21600)  && (<p className="text-muted">{this.props.t('SearchPage.status.3', {param:" "})}</p>)}
                        
                      </div>
                    </div>
                  )
                }.bind(this))
              }
              {this.state.direction_flg === "true" && (
                <div>
              <h3>{this.props.t('SearchPage.content.1', {param:" "})}</h3>
              { 
                this.state.return_list.map(function(item, key) {
                  return (
                    <div key={key} value={this.date_format(item.trip_date)} className={(this.state.select_index1 === key ? "card-click-active " : "1231231231231 ")+((item.trip_status === "active" && (parseInt(item.trip_quota) - parseInt(item.trip_required)) >= (parseInt(localStorage.adult_num) + parseInt(localStorage.child_num)) && item.befor_trip_date-this.state.trip_time > 21600) ? "card-part card-list card-active" : "card-part card-list")} onClick={(item.trip_status === "active" && (parseInt(item.trip_quota) - parseInt(item.trip_required)) >= (parseInt(localStorage.adult_num) + parseInt(localStorage.child_num)) && item.befor_trip_date-this.state.trip_time > 21600) ? () => this.selectTo(this.date_format(item.trip_date), this.formatAMPM(item.trip_date+" "+item.trip_time), item.trip_id, key) : this.Noneactive}>
                      
                      <div className="trip-time">
                        <h4 style={{fontSize: "22px"}}>{this.formatAMPM(item.trip_date+" "+item.trip_time)} - {this.two_hours(item.trip_date+" "+item.trip_time)}</h4>
                        <span>{this.props.t('SearchPage.content.6', {param:" "})}  02:10 mins</span>
                      </div>
                      <div className="trip-info">
                      {(item.trip_status === "active") && (<div><sup  style={{color:"#0A429B",fontSize: "14px"}}>RM</sup><span style={{color:"#0A429B", fontSize: "23px"}}>35</span></div>)}
                        {item.trip_status === "full" && (<p className="text-danger">{this.props.t('SearchPage.status.2', {param:" "})}</p>)}
                        {item.trip_status === "inactive" && (<p className="text-warning">{this.props.t('SearchPage.status.1', {param:" "})}</p>)}
                        {(item.trip_status === "active" && (parseInt(item.trip_quota) - parseInt(item.trip_required)) >= (parseInt(localStorage.adult_num) + parseInt(localStorage.child_num)) && item.befor_trip_date-this.state.trip_time > 21600)  && (<p style={{color: "#417505"}}>{this.props.t('SearchPage.status.0', {param:" "})}</p>)}
                        {(item.trip_status === "active" && (parseInt(item.trip_quota) - parseInt(item.trip_required)) < (parseInt(localStorage.adult_num) + parseInt(localStorage.child_num)))  && (<p className="text-muted">{this.props.t('SearchPage.status.4', {param:" "})}({item.trip_quota-item.trip_required})</p>)}
                        {(item.trip_status === "active" && (parseInt(item.trip_quota) - parseInt(item.trip_required)) >= (parseInt(localStorage.adult_num) + parseInt(localStorage.child_num)) && item.befor_trip_date-this.state.trip_time < 21600)  && (<p className="text-muted">{this.props.t('SearchPage.status.3', {param:" "})}</p>)}
                      </div>
                    </div>
                  )
                }.bind(this))
              }</div>)
              }

              <div style={{width: "100%", marginTop: "50px"}}>
                <NavLink to="/payment" style={{float: "right"}} onClick={this.next_page}>
                  <Button style={{background: "#0A429B"}}>{this.props.t('SearchPage.content.11', {param:" "})}</Button>
                </NavLink>
              </div>
              
            </div>
          </Col>
        </Row>
      </div>
      </Col>
      <Col lg="4" className="initial">
        <div className="price-content">
          <div className="price-card">
            <div className="card-head">
              <h4>{this.props.t('SearchPage.content.7', {param:" "})}</h4>
            </div>
            <hr />
            <div className="card-body">
              <span>{this.props.t('SearchPage.content.8', {param:" "})}</span><br />
              {localStorage.from_to_flg === "false" && (<div><p>MERSING </p><li className="fa fa-arrow-right" style={{margin:"0px 10px", color: "grey"}}></li><p> TIOMAN(Kg. {localStorage.jetty_type}) </p>{localStorage.direction_flg === "true" && (<li className="fa fa-arrow-right" style={{margin:"0px 10px", color: "grey"}}></li>)}{localStorage.direction_flg === "true" && (<p> MERSING</p>)}</div>)}
              {localStorage.from_to_flg === "true" && (<div><p>TIOMAN </p><li className="fa fa-arrow-right" style={{margin:"0px 10px", color: "grey"}}></li><p> MERSING(Kg. {localStorage.jetty_type}) </p>{localStorage.direction_flg === "true" && (<li className="fa fa-arrow-right" style={{margin:"0px 10px", color: "grey"}}></li>)}{localStorage.direction_flg === "true" && (<p> TIOMAN</p>)}</div>)}
              <br/><br/>
              <div className="date-time">
                <span>{this.props.t('SearchPage.content.0', {param:" "})}</span><br />
                <p>{this.state.from}</p>
              </div>
              {localStorage.direction_flg === "true" && (<div className="date-time">
                <span>{this.props.t('SearchPage.content.1', {param:" "})}</span><br />
                <p>{this.state.to}</p>
              </div>)}
            </div>
            <hr />
            <div className="card-foot">
              <p style={{float:"left", marginRight: "20px", marginTop: "5px"}}>{this.props.t('SearchPage.content.9', {param:" "})}:</p><h2 style={{float:"right"}}>RM {this.state.price}</h2>
            </div>
          </div>
        </div>
      </Col>
      </Row>
    )
  }
}

export default connect(mapStateToProps)(translate(TripList));
