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
import { NavLink } from "react-router-dom";
import { DateRangePicker } from 'react-date-range';
import { connect } from "react-redux";
import ReactDatetime from "react-datetime";


import classnames from "classnames";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
// reactstrap components
import {
  Button,
  Row,
  Col,
  UncontrolledCarousel,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup
} from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addArticle } from "../../redux/actions/index";
import { translate, setLanguage } from 'react-multi-lang';
import Select from 'react-select';
const carouselItems = [
  {
    src: require("assets/img/denys.jpg"),
    altText: "Slide 1",
    caption: ""
  },
  {
    src: require("assets/img/fabien-bazanegue.jpg"),
    altText: "Slide 2",
    caption: ""
  },
  {
    src: require("assets/img/mark-finn.jpg"),
    altText: "Slide 3",
    caption: ""
  }
];
const options = [
  { value: '0', label: '0' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },

];

function mapDispatchToProps(dispatch) {
  return {
    addArticle: article => dispatch(addArticle(article))
  };
}
class JavaScript extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectionRange :{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
        
      },
      date_togle: false,
      start_date:"",
      end_date: "",
      close_flg: false,
      height: 0,
      overflow: true,
      send_data: {
        startDate: "",
        endDate: ""
      },
      months: 2,
      selectedOption: {label: "0", value: "0"},
      selectedOption1: {label: "0", value: "0"},
      fromt_to: false,
      direction_flg: true
    }; 
    this.handleSelect = this.handleSelect.bind(this);
    this.togledaterange = this.togledaterange.bind(this);
    this.togledaterange1 = this.togledaterange1.bind(this);
    this.getHeight = this.getHeight.bind(this);
    this.months_set = this.months_set.bind(this);
    this.div_overflow = this.div_overflow.bind(this);
    this.next_page= this.next_page.bind(this);
    this.from_to= this.from_to.bind(this);
    this.direction= this.direction.bind(this);
    this.div_over= this.div_over.bind(this);
    this.departure_save= this.departure_save.bind(this);
  }
  
  changeLang (lang) {
    setLanguage(lang)
  }
  handleChange_adult = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
    localStorage.adult_num = selectedOption.value;
  };
  handleChange_child = selectedOption1 => {
    this.setState({ selectedOption1 });
    console.log(`Option selected:`, selectedOption1);
    localStorage.child_num = selectedOption1.value;
  };
  from_to() {
    localStorage.from_to_flg=!this.state.fromt_to;
    this.setState({fromt_to: !this.state.fromt_to});
    
  }
  toggleModal = modalState => {
    this.setState({
      [modalState]: !this.state[modalState]
    });
  };
  togledaterange(){
    this.setState({date_togle:!this.state.date_togle});
    this.setState({overflow: false});
    
  }
  div_over() {
    this.setState({overflow: false});
  }
  
  togledaterange1(){
    this.setState({date_togle:!this.state.date_togle});
    let start_date= this.date_format_change(this.state.selectionRange.startDate);
    let end_date= this.date_format_change(this.state.selectionRange.endDate);
    this.setState({start_date:start_date});
    this.setState({end_date:end_date});
    this.setState({send_data: {startDate: start_date, endDate: end_date}});
  }
  div_overflow() {
    this.setState({overflow: false});
  }
  date_format_change(current_datetime){
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();
    return formatted_date;
  }
  departure_save(event) {
    localStorage.start=this.date_format_change(event._d);
    localStorage.end="0";
  }
  handleSelect(ranges){
		this.setState({selectionRange :{
			startDate: ranges.selection.startDate,
			endDate: ranges.selection.endDate,
      key: 'selection',}});
    localStorage.start=this.date_format_change(ranges.selection.startDate);
    localStorage.end=this.date_format_change(ranges.selection.endDate);
    // this.props.addArticle({ end, id1 });
  }
  componentDidMount() {
    localStorage.from_to_flg=false;
    localStorage.start = "";
    localStorage.end = "";
    localStorage.price = "";
    localStorage.adult_num = "0";
    localStorage.child_num = "0";
    localStorage.direction_flg ="true";
    setTimeout(this.getHeight, 1000);
    window.addEventListener("resize", this.months_set);
    if(window.innerWidth < 690){
      this.setState({months: 1});
    }
    else {
      this.setState({months: 2});
    }
  }
  direction(value) {
    this.setState({direction_flg: value});
    localStorage.direction_flg = value;
  }
  months_set() {
    console.log(window.innerWidth);
    if(window.innerWidth < 690){
      this.setState({months: 1});
    }
    else {
      this.setState({months: 2});
    }
  }
  getHeight() {
    let { clientHeight } = this.refs.myImgContainer;
    
    this.setState({height: clientHeight});
  }
  next_page(event) {
    event.preventDefault();
    if(localStorage.start === "" && localStorage.end === ""){
      toast.error(this.props.t('HomePage.message.0', {param: ''}), {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    else if(localStorage.adult_num === "0" && localStorage.child_num === "0"){
      toast.error(this.props.t('HomePage.message.1', {param: ''}), {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    else{
      window.location.href = "/search";
    }
  }
  date_valid(current) {
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    return current.isAfter(yesterday);
    // return current.day() !== 0 && current.day() !== 3;
  }
  render() {
    return (
      
      <div className="section section-javascript" id="javascriptComponents">
        <ToastContainer />
        
        <div className="section">
          <div className="main-content" >
          <div ref="myImgContainer">
            <Row className="justify-content-between align-items-center" style={{margin:"0px"}}>
              <Col lg="8" className="initial pade-bottom">
                <div>
                <div className="title">
                  <br />
                  <br />
                  <br/>
                </div>
                  <div  className={this.state.overflow ? 'searche-part pade-height for-pade-search' : 'searche-part pade-height'} style={{overflow: this.state.overflow}}>
                    <div className="searche-part-main">
                     
                        <h3>{this.props.t('HomePage.content.0', {param: ''})}</h3>
                        <div className="search-direction">
                        <div style={{float: "left"}}>
                          <div className="searche-from">
                            <span>{this.props.t('HomePage.content.1', {param: ''})}</span><br></br>
                            <p>{this.state.fromt_to ? "TIOMAN": "MERSING"}</p>
                          </div>
                          <div className="allow-icon" onClick={this.from_to}>
                            <img src={require("assets/img/direction.png")} alt="dir"/>
                          </div>
                          <div className="searche-from">
                            <span>{this.props.t('HomePage.content.2', {param: ''})}</span><br></br>
                            <p>{this.state.fromt_to ? "MERSING": "TIOMAN"}</p>
                          </div>
                        </div>
                        <div className="direction-method" style={{float: "left", marginLeft: "10px", marginTop: "30px"}}>
                          <div>
                            <Button className={this.state.direction_flg ? "direction_btn direction_btn_acitve" : "direction_btn" } size="sm" onClick={() => this.direction(true)}>
                            {this.props.t('SearchPage.content.1', {param:" "})}
                            </Button>
                            <Button  className={this.state.direction_flg ? "direction_btn" : "direction_btn direction_btn_acitve" } size="sm" onClick={() => this.direction(false)}>
                            {this.props.t('SearchPage.content.10', {param:" "})}
                            </Button>
                          </div>
                          
                        </div>
                      </div>
                      <div className="searche-date">
                      <div className="datepicker-container">
                      {this.state.direction_flg  && (<div>
                        <Row className="justify-content-between align-items-center">
                          <Col lg="6">
                          
                            <span>{this.props.t('HomePage.content.3', {param: ''})}</span>
                            <FormGroup>
                              <InputGroup onClick={this.togledaterange}
                                className={classnames({
                                  "input-group-focus": this.state.inputFocus
                                })}
                              >
                                <Input
                                  className="color-custom custom_input"
                                  placeholder={this.props.t('HomePage.content.3', {param: ''})}
                                  type="text"
                                  onFocus={e => this.setState({ inputFocus: true })}
                                  onBlur={e => this.setState({ inputFocus: false })}
                                  onChange={this.handleChange}
                                  
                                  defaultValue={this.state.start_date}
                                />
                                <InputGroupAddon addonType="append">
                                  <InputGroupText>
                                    <i className="fa fa-calendar" style={{color: "black"}}/>
                                  </InputGroupText>
                                </InputGroupAddon>
                                
                              </InputGroup>
                              {this.state.date_togle && (<div className="date-absolute"><DateRangePicker
                                
                                ranges={[this.state.selectionRange]}
                                onChange={this.handleSelect}
                                months = {this.state.months}
                                minDate ={new Date()}
                                direction={'horizontal'}
                                
                              />
                                <div className="datepicker-footer">
                                  <Button className="button_close" onClick={this.togledaterange}>{this.props.t('HomePage.content.10', {param: ''})}</Button>
                                  <Button className="button_sure" onClick={this.togledaterange1}>{this.props.t('HomePage.content.11', {param: ''})}</Button>
                                </div>
                              </div>)}
                            </FormGroup>
                            
                          </Col>
                          <Col lg="6">
                            <span>{this.props.t('HomePage.content.4', {param: ''})}</span><br />
                            <FormGroup>
                              <InputGroup
                                className={classnames({
                                  "input-group-focus": this.state.inputFocus
                                })}
                              >
                                <Input
                                  className="color-custom custom_input"
                                  placeholder={this.props.t('HomePage.content.4', {param: ''})}
                                  type="text"
                                  defaultValue={this.state.end_date}
                                  onFocus={e => this.setState({ inputFocus: true })}
                                  onBlur={e => this.setState({ inputFocus: false })}
                                  onChange={this.handleChange}
                                  
                                />
                                <InputGroupAddon addonType="append">
                                  <InputGroupText>
                                    <i className="fa fa-calendar" style={{color: "black"}}/>
                                  </InputGroupText>
                                </InputGroupAddon>
                                
                              </InputGroup>
                            </FormGroup>
                          </Col>
                          </Row>
                          </div>)}
                          {!this.state.direction_flg  && (<div>
                            <Row className="justify-content-between align-items-center">
                          <Col lg="6">
                            <span>{this.props.t('HomePage.content.3', {param: ''})}</span>
                            <FormGroup onClick={this.div_over}>
                              <ReactDatetime
                                inputProps={{
                                  className: "form-control custom_input color-custom",
                                  placeholder: this.props.t('HomePage.content.3', {param: ''})
                                }}
                                dateFormat="YYYY-MM-DD" timeFormat={false}
                                onChange={this.departure_save}
                                isValidDate = {this.date_valid}
                              />
                              <div style={{width: "100%"}}>
                                <i className="fa fa-calendar" style={{color: "#0000009c",float: "right", marginTop: "-27px", marginRight: "20px"}}/>
                              </div>
                            </FormGroup>
                            </Col></Row>
                          </div>)}
                          <Row className="justify-content-between align-items-center" style={{marginTop: "20px"}}>
                            <Col lg="6">
                              <p>{this.props.t('HomePage.content.5', {param: ''})}</p>
                              <div onClick={this.div_overflow}>
                                <Select
                                  value={this.state.selectedOption}
                                  onChange={this.handleChange_adult}
                                  options={options}
                                />
                              </div>
                            </Col>
                            <Col lg="6">
                              <p>{this.props.t('HomePage.content.6', {param: ''})}</p>
                              <div onClick={this.div_overflow}>
                                  
                                <Select
                                  value={this.state.selectedOption1}
                                  onChange={this.handleChange_child}
                                  options={options}
                                  
                                />
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </div>
                    
                    
                      <NavLink to={"/search"} onClick={this.next_page}>
                        <div className="serche-button" >
                        <span>{this.props.t('HomePage.content.7', {param: ''})}</span>
                        <li className="fa fa-arrow-right"></li>
                        </div>
                      </NavLink>
                    
                    </div>
                  
                    
                    <UncontrolledCarousel
                      items={carouselItems}
                      indicators={false}
                      autoPlay={true}
                    />
                  
                </div>
              </Col>
              <Col lg="4" className="initial pade-bottom">
                <div className="check-in-part"  style={{height: this.state.height}}>
                  <NavLink to="/">
                    <div className="for-pade pade-width">
                      <div className="check-button">
                        <div className="button-letter">
                          <p>{this.props.t('HomePage.content.8', {param: ''})}</p>
                          <p>{this.props.t('HomePage.content.9', {param: ''})}</p>
                        </div>
                        <div className="button-icon">
                          <li className="fa fa-arrow-right"></li>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                </div>
              </Col>
              
            </Row>
            </div> 
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(translate(JavaScript));
