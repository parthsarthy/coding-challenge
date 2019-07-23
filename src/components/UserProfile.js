import React from "react";
import { connect } from "react-redux";
import { Redirect} from "react-router-dom";
import { logout, fetchUserData, fetchAllTopics, authCheckState } from "../store/actions/auth";
// import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import '../assets/app.css';
import avatar from '../default-avatar.png'

class UserProfile extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
            }
    };
  
  componentDidMount(){
    this.props.authCheckState();
    const { handle } = this.props.match.params
    this.props.fetchTopics();
    this.props.fetchUserData(handle);
}
  render() {
    const {authenticated, profile, userdata} = this.props; 
    if(!profile && authenticated){ 
      return <Redirect to={"/profile"}></Redirect>
    }else if(!profile || !authenticated){
        return <Redirect to={"/"}></Redirect>
    }
    return (
      <section id="cover">
          <div id="cover-caption">
              <div id="container" className="container p-0">
                  <div className="row text-white">
                      <div id="formdiv" className="col-sm-6 offset-sm-3 col-md-6 offset-md-3 text-center" style={{padding:"4em"}}>
                      <img src={avatar} className="mx-auto d-block avatar" alt="" />
                          <div className="container p-0 m-0">
                          <div className="container p-0 m-0">
                                {this.props.userdata!=null && <h2 id="fullname" className="text-capitalize">{(this.props.userdata.first_name)+" "+(this.props.userdata.last_name)}</h2>}
                                {this.props.userdata!=null && <p className="text-center" >{(this.props.userdata.profile.currentPosition)}</p>}
                                <div className="col-md-12 text-center"></div>
                                <hr className="underline"/>
                                <div className="row font-weight-light">{this.props.userdata!=null && <p className="text-center" >{(this.props.userdata.profile.bio)}</p>}</div>
                                <div className="container mt-3 p-0">
                                <div className = "row col-md-12 m-0 p-0 justify-content-center">
                                    {this.props.userdata!=null && this.props.userdata.profile.topics.map(topic => {
                                        return <div key = {topic} className="col-md-5 mr-4 mt-4 p-3 border">{topic}</div>
                                    })}
                                </div>
                                </div>
                                </div>
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
    return {
      authenticated: state.auth.token !== null,
      profile: state.auth.profile!==null,
      userdata: state.auth.userdata
    };
  };
  
const mapDispatchToProps = dispatch => {
return {
    logout: () => dispatch(logout()),
    fetchTopics: () => dispatch(fetchAllTopics()),
    fetchUserData: (handle) => dispatch(fetchUserData(handle)),
    authCheckState: () => dispatch(authCheckState())
};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserProfile);
  ;
  
