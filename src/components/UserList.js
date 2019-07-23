import React, { Component } from 'react'
import { logout, fetchAllUsers, authCheckState, fetchAllTopics } from '../store/actions/auth';
import {connect} from 'react-redux'
class UserList extends Component {

    componentDidMount(){
        this.props.fetchAllUsers()
        this.props.fetchAllTopics()
    }

    render() {
        return (
        <section id="cover">
          <div id="cover-caption">
              <div id="container" className="container">
                  <div className="row">
                        <div id="" className="formdiv col-sm-6 offset-sm-3 col-md-8 offset-md-2 text-center" style={{padding:"4em"}}>
                            
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
      users: state.auth.users
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    authCheckState:() => dispatch(authCheckState()),
    logout: () => dispatch(logout()),
    fetchAllTopics: () => dispatch(fetchAllTopics())
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(UserList)