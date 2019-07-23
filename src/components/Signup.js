import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { authSignup } from "../store/actions/auth";

class RegistrationForm extends React.Component {
  state = {
    email: "",
    password1: "",
    password2: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const {email, password1, password2 } = this.state;
    this.props.signup(email, password1, password2);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, password1, password2 } = this.state;
    const { error, token } = this.props;
    if (token) {
      return <Redirect to="/profile" />;
    }
    return (
    <section id="cover">
          <div id="cover-caption">
              <div id="container" className="container">
                  <div className="row text-white">
                      <div id="formdiv" className="col-sm-8 col-md-6 offset-md-3 offset-sm-2 text-center" style={{padding:"4em"}}>
                          <div className="info-form">
                            <h1 className="" style={{color:"#f56642"}}>Create your credentials</h1>
                                {error && <p style={{color:"black"}}>Something went wrong, please try again</p>}
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
                                          name="password1"
                                          className="form-control" 
                                          placeholder="Password" 
                                          value={password1}
                                          onChange={this.handleChange}
                                          required
                                          title="minimum length 8"
                                          />
                                    </div>
                                    <div className="form-group">
                                        <label className="sr-only">Confirm Password</label>
                                        <input 
                                          type="password" 
                                          name="password2"
                                          className="form-control" 
                                          placeholder="ConfirmPassword" 
                                          value={password2}
                                          onChange={this.handleChange}
                                          required
                                          pattern=".{8,}"
                                          title="minimum length 8"
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
  return {
    error: state.auth.error,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: (username, email, password1, password2) =>
      dispatch(authSignup(username, email, password1, password2))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationForm);
