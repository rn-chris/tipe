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
import { connect } from "react-redux";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import 'react-date-range/dist/styles.css'; // main style file

import 'react-date-range/dist/theme/default.css'; // theme css file
// reactstrap components
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Col,
} from "reactstrap";
import validate from 'card-validator';
import 'react-phone-input-2/dist/style.css';
import 'react-notifications/lib/notifications.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.jsx";
import { addArticle } from "../../redux/actions/index";
import { translate, setLanguage } from 'react-multi-lang';
import server from "../../server_con/index.jsx";

function mapDispatchToProps(dispatch) {
  return {
    addArticle: article => dispatch(addArticle(article))
  };
}
const mapStateToProps = state => {
  return { articles: state.articles };
};

class TripList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payment_option: localStorage.payment_page,
      firs_name: "",
      last_name: "",
      phone: "",
      email: "",
      notification: "",
      card_num: "",
      num_validate: "",
      card_type: "",
      card_validate: false,
      exp_validate: false,
      exp_date: "",
      exp_value: "",
      pur_time: "08:00",
      payment_time: "480",
      order_id: ""
    }
    this.handChange = this.handChange.bind(this);
    this.handChange2 = this.handChange2.bind(this);
    this.exp_change = this.exp_change.bind(this);
    this.handChange1 = this.handChange1.bind(this);
    this.personal_back = this.personal_back.bind(this);
    this.notify = this.notify.bind(this);
    this.make_payment = this.make_payment.bind(this);
    this.purchase_time = this.purchase_time.bind(this);
    this.pending_trip_cancel = this.pending_trip_cancel.bind(this);
    this.back_page = this.back_page.bind(this);
    this.onUnload = this.onUnload.bind(this);
  }
  onUnload(event) { // the method that will be used for both add and remove event
    console.log("hellooww")
    event.returnValue = "Hellooww"
    
    console.log(event.currentTarget);
  }
  componentDidMount() {
    var payment_option = false;
    var id = 9;
    this.props.addArticle({ payment_option , id });
    this.purchase_time();
    if(localStorage.payment_page === "true"){
    // this.purchase_time();
    }
  }
  componentWillUnmount() {
    // window.removeEventListener("beforeunload", this.onUnload);
  }
  changeLang (lang) {
    setLanguage(lang);
  }
  purchase_time() {
    var tt = parseInt(this.state.payment_time);
    tt--;
    this.setState({payment_time: tt});
    var min = parseInt(tt/60);
    var sec = tt%60;
    if(sec < 10){
      sec = "0"+sec;
    }
    var t = "0"+min+":"+sec;
    this.setState({pur_time: t});
    if(tt === 0){
      this.pending_trip_cancel();
    }
    setTimeout(this.purchase_time, 1000);
  }
  date_format(date) {
    const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let current_datetime = new Date(date)
    let formatted_date = current_datetime.getDate() + " " + months[current_datetime.getMonth()] + " " + current_datetime.getFullYear()
    return formatted_date;
  }
  handChange(event) {
    if(event !== undefined){
      if(event.target === undefined){
        localStorage.phone = event;
      }
      else{
        this.setState({[event.target.name]: event.target.value});
      }
    }
    
  }
  pending_trip_cancel() {
    fetch(server+'websiterestcontroller/trip_pending_cancel', {
        method: 'POST',
        body: JSON.stringify({
          order_id: localStorage.order_id
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(response => {
        return response.json();
      }).then(result => {
        // console.log(result);
        window.location.href = "/search";
      });
  }
  notify = () => {
    
    if(this.state.firs_name === "") {
      
      toast.error(this.props.t("PersonalPage.message.0", {param: ""}), {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    if(this.state.last_name === "") {
      
      toast.error(this.props.t("PersonalPage.message.1", {param: ""}), {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    if(localStorage.phone === "") {
      
      toast.error(this.props.t("PersonalPage.message.2", {param: ""}), {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    if(this.state.email === "") {
      
      toast.error(this.props.t("PersonalPage.message.3", {param: ""}), {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    else {
      fetch(server+'websiterestcontroller/tikcet_order_update', {
        method: 'POST',
        body: JSON.stringify({
          order_id: localStorage.order_id,
          user_name: this.state.firs_name+" "+this.state.last_name,
          user_email: this.state.email,
          user_phone: localStorage.phone
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(response => {
        return response.json();
      }).then(result => {
        console.log(result);
        toast.success("The data was kept correctly !", {
          position: toast.POSITION.TOP_CENTER
        });
        this.setState({payment_option: "true"});
        localStorage.payment_page = true;
        
        this.setState({order_id: result.id});
      });
    }
    
  }
  back_page() {
    this.pending_trip_cancel();
   
  }
/*******************************payment******************************************/

handChange2(event) {
  var numberValidation = validate.number(event.target.value);
  if(event.target.value.length < 3) {
      var num = parseInt(event.target.value.slice(-1));
      if(!isNaN(num) || event.target.value.length === 0){
          this.setState({[event.target.name]: event.target.value});
      }
  }
  else if(numberValidation.card){
      this.setState({[event.target.name]: event.target.value});
      this.setState({card_type: numberValidation.card.type});
      this.setState({card_validate: false});
  }
  else {
      this.setState({card_validate: true});
      console.log(numberValidation.card);
  }
  
}
handChange1(event) {
  this.setState({[event.target.name]: event.target.value});
}
exp_change(event) {
  this.setState({exp_value: event.target.value});
  if(event.target.value.length === 2) {
      this.setState({exp_value: event.target.value+"/"});
  }
  if(event.target.value.length === 5) {
      var exp = validate.expirationDate(event.target.value);
      if(!exp.isValid){
          this.setState({exp_validate: true});
      }
      else {
          var date = "20"+exp.year+"-"+exp.month;
          this.setState({exp_date: date});
          this.setState({exp_validate: false});
      }
  }
}

make_payment = () => {
  
  if(this.state.card_num === "") {
    
    toast.error(this.props.t("PaymentPage.message.0", {param: ""}), {
      position: toast.POSITION.TOP_CENTER
    });
    return;
  }
  if(this.state.exp_value === "") {
    
    toast.error(this.props.t("PaymentPage.message.1", {param: ""}), {
      position: toast.POSITION.TOP_CENTER
    });
    return;
  }
  if(this.state.cardhold === "") {
    
    toast.error(this.props.t("PaymentPage.message.2", {param: ""}), {
      position: toast.POSITION.TOP_CENTER
    });
    return;
  }
  if(this.state.cvv === "") {
    
    toast.error(this.props.t("PaymentPage.message.3", {param: ""}), {
      position: toast.POSITION.TOP_CENTER
    });
    return;
  }
  if(this.state.card_validate) {
    
      toast.error(this.props.t("PaymentPage.message.4", {param: ""}), {
        position: toast.POSITION.TOP_CENTER
      });
      return;
  }
  if(this.state.exp_validate) {
    
      toast.error(this.props.t("PaymentPage.message.5", {param: ""}), {
        position: toast.POSITION.TOP_CENTER
      });
      return;
  }
  
  else {
      
      toast.success("Successfully!", {
          position: toast.POSITION.TOP_CENTER
        });
        return;
  }
  
}
personal_back() {
  this.setState({payment_option: "false"});
  localStorage.payment_page = "false";
}
/*****************************888888 */
  render() {
    return (
      
      <Row>
        <Col lg="8" className="initial">
          <ExamplesNavbar/>
          <ToastContainer />
        <div className="trip-list-content">
        <Row>
            <Col lg="3">
          <div className="status_left" style={{marginTop: "50px"}}>
            <div className="from-to-place">
              <div className="connect-line">
                <div className="start-dot blue"></div>
                <div className="end-dot blue"></div>
              </div>
              
              <div className="trip-rist">
              <div>
                  
                  <span>{this.props.t('HomePage.content.1', {param:""})}</span><br />
                  <h3>{localStorage.from_to_flg==="false" ? "MERSING" : "TIOMAN"}</h3>
                  <span>{localStorage.from_to_flg==="false" ? "Mersing Jetty" : "Kg. "+localStorage.jetty_type+" Jetty"}</span>
                </div>
                <br />
                <br />
                <div>
                  <span>{this.props.t('HomePage.content.2', {param:""})}</span><br />
                  <h3>{localStorage.from_to_flg==="true" ? "MERSING" : "TIOMAN"}</h3>
                  <span>{localStorage.from_to_flg==="true" ? "Mersing Jetty" : "Kg. "+localStorage.jetty_type+" Jetty"}</span>
                </div>
              </div>
            </div>
            {/* <div></div> */}
            <div className="place_progress">
              <div className="line-dot">
                <div className="select-dot dot-active " style={{marginTop: "0px"}}></div>
                <div className={this.state.payment_option === "true" ? "passenger-dot dot-active" : "passenger-dot dot-in-progress"}></div>
                <div className={this.state.payment_option === "false" ? "passenger-dot" : "passenger-dot dot-in-progress"}></div>
                
              </div>
              <div className="complete-list">
                <p>{this.props.t("SearchPage.content.2", {param: ""})}</p>
                <p className={this.state.payment_option === "false" ? "dot-list-active" : ""}>{this.props.t("SearchPage.content.3", {param: ""})}</p>
                <p className={this.state.payment_option === "true" ? "dot-list-active" : ""}>{this.props.t("SearchPage.content.4", {param: ""})}</p>
              </div>
            </div>
        </div>
        </Col>
        <Col lg="9">
        {this.state.payment_option === "false" && (<div><div className="form-field">
          <h3 style={{marginBottom: "10px"}}>{this.props.t("PersonalPage.content.0", {param: ""})}</h3>
          <p style={{marginBottom: "50px"}}><em>{this.props.t("PersonalPage.content.1", {param: ""})}</em></p>
          <Row>
            <Col lg="6" sm="6" className="form-control-field">
              <label>{this.props.t("PersonalPage.content.2", {param: ""})}</label>
              <InputGroup>
                <Input placeholder={this.props.t("PersonalPage.content.2", {param: ""})} type="text" name="firs_name" onChange={this.handChange} className="input-init"/>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="fa fa-user" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>
            <Col lg="6" sm="6" className="form-control-field">
              <label>{this.props.t("PersonalPage.content.3", {param: ""})}</label>
              
              <InputGroup>
                <Input placeholder={this.props.t("PersonalPage.content.3", {param: ""})} type="text" name="last_name" onChange={this.handChange}  className="input-init"/>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="fa fa-user" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col><br/>
            <Col lg="6" sm="6" className="form-control-field">
              <label>{this.props.t("PersonalPage.content.4", {param: ""})}</label>
              <PhoneInput
                placeholder={this.props.t("PersonalPage.content.4", {param: ""})}
                value={ this.state.phone }
                onChange={ this.handChange } />
                
                <div style={{width: "100%", padding: "0px 22px"}}><i className="fa fa-phone" style={{float:"right", marginTop: "-25px", color: "grey", fontSize: "15px"}} /></div>
                  
              
            </Col>
            <Col lg="6" sm="6" className="form-control-field">
              <label>{this.props.t("PersonalPage.content.5", {param: ""})}</label>
              <InputGroup>
                <Input placeholder={this.props.t("PersonalPage.content.5", {param: ""})} type="text" name="email" onChange={this.handChange} className="input-init"/>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="fa fa-envelope" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>
        </div>
        <div style={{float: "right"}}>
          <Button className="button_close" onClick={this.back_page}>Back</Button>
          <Button className="button_sure" onClick={this.notify}>Next</Button>
        </div></div>)}
        {this.state.payment_option === "true" && (<div>
        
        <div className="">
        <div className="form-field">
          <h3 style={{marginBottom: "10px"}}>{this.props.t("PaymentPage.content.0", {param: ""})}</h3>
          
          
          <Row className="pay-method">
              <Col lg="4">
                  <div className={this.state.card_type === 'visa' ? "payment-method-tab pay-card-active" : "payment-method-tab"}>
                    <img src={require("assets/img/visa-card.png")} alt="visa"></img>
                  </div>
              </Col>
              <Col lg="4">
                <div className={this.state.card_type === 'mastercard' ? "payment-method-tab pay-card-active" : "payment-method-tab"}>
                    <img src={require("assets/img/marst-card.png")} alt="marster"></img>
                </div>
              </Col>
              <Col lg="4">
                <div className={this.state.card_type === 'american-express' ? "payment-method-tab pay-card-active" : "payment-method-tab"}>
                    <img src={require("assets/img/amex-card.png")} alt="amex"></img>
                </div>
              </Col>
          </Row>
          <div className="responsive_pay">
            <div className={this.state.card_type === 'visa' ? "payment-method-tab pay-card-active" : "payment-method-tab"}>
              <img src={require("assets/img/visa-card.png")} alt="visa"></img>
            </div>
            <div className={this.state.card_type === 'mastercard' ? "payment-method-tab pay-card-active" : "payment-method-tab"}>
              <img src={require("assets/img/marst-card.png")} alt="marster"></img>
            </div>
            <div className={this.state.card_type === 'american-express' ? "payment-method-tab pay-card-active" : "payment-method-tab"}>
              <img src={require("assets/img/amex-card.png")} alt="amex"></img>
            </div>
          </div>
          <Row>
              
            <Col lg="9" sm="6" className="form-control-field">
              <label>{this.props.t("PaymentPage.content.1", {param: ""})}</label>
              <InputGroup className={this.state.card_validate ? "card-validate" : ""}>
                <Input placeholder={this.props.t("PaymentPage.content.1", {param: ""})} type="text" name="card_num" onChange={e => {this.handChange2(e)}} className="input-init" value={this.state.card_num} maxLength=""/>
                <InputGroupAddon addonType="append" >
                  <InputGroupText>
                    <i className="fa fa-credit-card" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              
            </Col>
            <Col lg="3" sm="6" className="form-control-field">
              <label>{this.props.t("PaymentPage.content.2", {param: ""})}</label>
              
              <InputGroup className={this.state.exp_validate ? "card-validate" : ""}>
                <Input placeholder="Exp" type="text" name="exp" onChange={this.exp_change} value={this.state.exp_value}  className="input-init" maxLength="5"/>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="fa fa-calendar" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col><br/>
            <Col lg="6" sm="6" className="form-control-field">
              <label>{this.props.t("PaymentPage.content.3", {param: ""})}</label>
              <InputGroup>
                <Input placeholder={this.props.t("PaymentPage.content.3", {param: ""})} type="text" name="cardhold" onChange={this.handChange1} className="input-init"/>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="fa fa-credit-card" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              
            </Col>
            <Col lg="6" sm="6" className="form-control-field">
              <label>CVV</label>
              <InputGroup>
                <Input placeholder="CVV" type="text" name="cvv" onChange={this.handChange1} className="input-init" maxLength="3"/>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="fa fa-envelope" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>
        </div>
        <div style={{float: "right"}}>
          <Button className="button_close" onClick={this.personal_back}>Back</Button>
          <Button className="button_sure" style={{background: "#0A429B!important"}} onClick={this.make_payment}>Next</Button>
        </div>
        
      </div>
      </div>)}
        </Col>
      </Row>
      </div>
      
      </Col>
      <Col lg="4" className="initial">
        <div className="price-content">
          <div className="price-card">
            <div className="card-head">
              <h4>{this.props.t("SearchPage.content.7", {param: ""})}</h4>
            </div>
            <hr />
            <div className="card-body">
              <span>{this.props.t("SearchPage.content.8", {param: ""})}</span><br />
              {localStorage.from_to_flg === "false" && (<div><p>MERSING </p><li className="fa fa-arrow-right" style={{margin:"0px 10px", color: "grey"}}></li><p> TIOMAN(Kg. {localStorage.jetty_type}) </p>{localStorage.direction_flg === "true" && (<li className="fa fa-arrow-right" style={{margin:"0px 10px", color: "grey"}}></li>)}{localStorage.direction_flg === "true" && (<p> MERSING</p>)}</div>)}
              {localStorage.from_to_flg === "true" && (<div><p>TIOMAN </p><li className="fa fa-arrow-right" style={{margin:"0px 10px", color: "grey"}}></li><p> MERSING(Kg. {localStorage.jetty_type}) </p>{localStorage.direction_flg === "true" && (<li className="fa fa-arrow-right" style={{margin:"0px 10px", color: "grey"}}></li>)}{localStorage.direction_flg === "true" && (<p> TIOMAN</p>)}</div>)}
              <br/><br/>
              <div className="date-time">
                <span>{this.props.t("SearchPage.content.0", {param: ""})}</span><br />
                <p>{localStorage.startdate}</p>
              </div>
              {localStorage.direction_flg === "true" && (<div className="date-time">
                <span>{this.props.t('SearchPage.content.1', {param:" "})}</span><br />
                <p>{localStorage.startdate}</p>
              </div>)}
            </div>
            <hr />
            <div className="card-foot">
              <p style={{float:"left", marginRight: "20px", marginTop: "5px"}}>{this.props.t("SearchPage.content.9", {param: ""})}:</p><h2 style={{float:"right"}}>RM {localStorage.price}</h2>
            </div>
          </div>
          <div className="timer">
            <div className="timer-content explain">
              <h4>{this.props.t("PaymentPage.content.4", {param: ""})}</h4>
              <p>{this.props.t("PaymentPage.content.5", {param: ""})}</p>
            </div>
            <div className="timer-content time-dis">
              <h4>{this.state.pur_time}</h4>
            </div>
          </div>
        </div>
      </Col>
      </Row>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(translate(TripList));
