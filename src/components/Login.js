import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { authLogin, authCheckState } from "../store/actions/auth";

class LoginForm extends React.Component {
  state = {
    email: "",
    password: "",
    userid:""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.login(email, password);
  };

  render() {
    const { error, token , profile} = this.props;
    const { email, password } = this.state;
    console.log(profile)
    if (token && profile) {
      return <Redirect to={"/user/"+this.props.userid} />;
    }
    else if(token && !profile){
      return <Redirect to={"/profile"} />;
    }
    
    return (
      <section id="cover">
          <div id="cover-caption">
              <div id="container" className="container">
                  <div className="row text-white">
                      <div id="formdiv" className="col-sm-8 col-md-6 offset-md-3 offset-sm-2 text-center" style={{padding:"4em"}}>
                          <div className="info-form">
                            <h1 className="" style={{color:"#f56642"}}>Login</h1>
                                {error && <p style={{color:"black"}}>Incorrect email or password</p>}
                                <form id="loginform" action="" className="form-inlin justify-content-center" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label className="sr-only">Email</label>
                                        <input 
                                          type="email" 
                                          name="email"
                                          className="form-control" 
                                          placeholder="Email" 
                                          value={email}
                                          onChange={this.handleChange}
                                          required
                                          />
                                    </div>
                                    <div className="form-group">
                                        <label className="sr-only">Password</label>
                                        <input 
                                          type="password" 
                                          name="password"
                                          className="form-control" 
                                          placeholder="Password" 
                                          value={password}
                                          onChange={this.handleChange}
                                          required
                                          pattern=".{8,}"
                                          />
                                    </div>
                                    <button type="submit" id="loginbtn" className="btn">Login</button>
                                </form>
                            </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.auth.profile)
  return {
    error: state.auth.error,
    token: state.auth.token,
    profile: state.auth.profile!==false && state.auth.profile!==null,
    userid: state.auth.userid
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(authLogin(email, password)),
    authCheckState: () => dispatch(authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
