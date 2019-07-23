import React from "react";
import { connect } from "react-redux";
import {  Redirect} from "react-router-dom";
import { logout, fetchAllTopics, createProfile, authCheckState } from "../store/actions/auth";
// import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import '../assets/app.css';

class Profile extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      authenticated: "",
      profile: "",
      topics:["Topic 1", "Topic 2"],
      position:"",
      first_name:"",
      last_name:"",
      bio:"",
      userid:"",
      totalTopics:0,
      selectedTopics:[]
    }
  }
  

  handleChange = e => {

    // const value = e.target.type === 'checkbox' ?  this.state.seltopics+=1: e.target.value;
    if(e.target.type === 'checkbox' && e.target.checked){
      if(this.state.totalTopics < 6){
        this.state.totalTopics+=1
        this.state.selectedTopics.push(e.target.value)
      }
      else{
        e.preventDefault()
        document.getElementById("error").innerHTML = "You can only select 6 topics, remove a topic.";
      }
    }
    else if(e.target.type === 'checkbox') {
      this.state.totalTopics-=1
      let index = this.state.selectedTopics.indexOf(e.target.value)
      this.state.selectedTopics.splice(index,1)
      document.getElementById("error").innerHTML=""
    }
    this.setState({ [e.target.name]: e.target.value });

  };

  handleSubmit = e => {
    e.preventDefault();
    let profileData = {}
    profileData['email']=this.props.email
    profileData['first_name']=this.state.first_name
    profileData['last_name']=this.state.last_name
    profileData['profile']={}
    profileData['profile']['currentPosition']=this.state.position
    profileData['profile']['bio']=this.state.bio
    profileData['profile']['topics']=this.state.selectedTopics.join(",")
    this.props.createProfile(this.props.userid, JSON.stringify(profileData))
    // this.props.login(email, password);
  };
  
  componentDidMount(){
    let self = this;
    fetch("http://127.0.0.1:8000/user/topic").then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        let topic = Object.keys(myJson).map(function(key) {
          return [myJson[key].id,myJson[key].name];
        });
        self.setState({
          topics: topic
        })
      })
}
  render() {
    const {authenticated, profile} = this.props; 
  
    if(this.props.profile===true && authenticated){
      return <Redirect to={"/user/"+this.props.userid}></Redirect>
    }
    else if(!this.props.profile && !authenticated){
      return <Redirect to={"/"}></Redirect>
  }
    // else if(this.props.profile!==true && authenticated){
    //   console.log(this.props)
    //   return <Redirect to={"/profile"}></Redirect>
    // }
    return (
      <section id="cover">
          <div id="cover-caption">
              <div id="container" className="container">
                  <div className="row text-white">
                      <div id="formdiv" className="col-sm-6 offset-sm-3 col-md-8 offset-md-2 text-center" style={{padding:"4em"}}>
                          <div className="info-form">
                            <h1 className="" style={{color:"#f56642"}}>Create your profile</h1>
                            <br/>
                                <form action="" className="form-inlin justify-content-center" onSubmit={this.handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                      <input type="text" className="form-control" id="first_name" name="first_name" placeholder="First Name" onChange={this.handleChange} required/>
                                    </div>
                                    <div className="form-group col-md-6">
                                      <input type="text" className="form-control" id="last_name" name="last_name" placeholder="Last Name" onChange={this.handleChange} required/>
                                    </div>
                                  </div>
                                  <div className="form-group">
                                      <input type="text" className="form-control" placeholder="Current Position" onChange={this.handleChange} name="position" required />
                                  </div>
                                  <div className="form-group">
                                      <textarea type="textarea" name="bio" className="form-control" placeholder="About you" rows="4" maxLength="256" onChange={this.handleChange} required/>
                                  </div>
                                  <h4 style={{textAlign:"left", fontWeight:"400", color:"black"}}>Select your favorite topics:</h4>
                                  <p id="error"></p>
                                  <div className="form-row">

                                    {this.state.topics.map((item, index) => {
                                        return  <React.Fragment key={item}>
                                                  <div className="form-group col-sm-6">
                                                    <div className="form-check checkbox">
                                                    <input key={item} type="checkbox" value={item[0]} className="form-check-input" id="exampleCheck1" style={{marginLeft:"0.5em"}} onClick={this.handleChange} name={item[1]} />
                                                      <label key={item[0]} style={{marginBottom:"0",marginLeft: "2em"}} className="checkbox-inline" htmlFor="defaultCheck2">{item[1]}</label>
                                                      </div>
                                                  </div></React.Fragment>;
                                    })
                                    }
                                  </div>
                                  <button type="submit" id="loginbtn" className="btn">Save</button>
                                </form>
                            </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  console.log(state.auth.profile !==null && state.auth.profile!==false)
    return {
      authenticated: state.auth.token !== null,
      profile: state.auth.profile !==null && state.auth.profile!==false,
      email: state.auth.email,
      topics: state.auth.topics,
      userid: state.auth.userid,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      fetchAllTopics: () => dispatch(fetchAllTopics()),
      authCheckState: () => dispatch(authCheckState()),
      createProfile: (handle, data) => dispatch(createProfile(handle,data)),
      logout: () => dispatch(logout())
    };
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profile);
  ;
  
