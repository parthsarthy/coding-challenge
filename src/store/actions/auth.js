import axios from "axios";
import * as types from "./types";

export const authStart = () => {
  return {
    type: types.AUTH_START
  };
};

export const authSuccess = (token, profile, email, userid) => {
  return {
    type: types.AUTH_SUCCESS,
    token: token,
    profile:profile,
    email:email,
    userid: userid
  };
};

export const authFail = error => {
  return {
    type: types.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("profile");
  localStorage.removeItem("expirationDate");
  return {
    type: types.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/rest-auth/login/", {
        email: email,
        password: password
      })
      .then(res => {
        console.log(res.data.key)
        console.log(res.data.user.profile)
        const profileCreated = res.data.user.profile
        const userid = res.data.user.id
        let profile = ""
        if (profileCreated!==null) {
           profile = true;
        }
        else{
          profile = false;
        }
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("profile", profile);
        localStorage.setItem("email", email);
        localStorage.setItem("userid", userid);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token, profile, email, userid));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (email, password1, password2) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/rest-auth/registration/", {
        email: email,
        password1: password1,
        password2: password2
      })
      .then(res => {
        console.log(res.data);
        const profileCreated = res.data.user.profile
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        const userid = res.data.user.id
        let profile = ""
        if (profileCreated) {
           profile = true;
        }
        else{
          profile = false;
        }
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("profile", profile);
        localStorage.setItem("email", email);
        localStorage.setItem("userid", userid);
        dispatch(authSuccess(token, profile, email, userid));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};
export const userInfo = (userinfo, token, profile) => {
  return {
    type: types.PROFILE_CREATED,
    token: token,
    userdata: userinfo,
    profile: profile
  };
};
export const fetchUserData = (handle) => {
  return dispatch => {  
  axios
      .get("http://127.0.0.1:8000/user/"+handle)
        .then((response) => {
          return response.data
        })
        .then((data) => {
          let all_topics = JSON.parse(localStorage.getItem("topic"))
          let profile = ""
          if(data.profile!==null){
            profile = true
            const topic_ids = data.profile.topics.split(",")
            const user_topics = topic_ids.map(id => {
              return all_topics[id]
            })
            data.profile.topics = user_topics
          }else{
            profile = false
          }
          const token = localStorage.getItem("token");
          dispatch(userInfo(data,token, profile));
        })
      }
}

export const allUsers = (users) =>{
  return {
    type:types.USER_LIST,
    users:users
  }
}

export const fetchAllUsers = () => {
  return dispatch => {
    axios
    .get("http://127.0.0.1:8000/user/")
    .then(response => {
      return response.data
    })
    .then(data => {
      let users = data
      let all_topics = JSON.parse(localStorage.getItem('topic'))
      let userList = []
      users.forEach(user => {
        let name = user.first_name + " " +user.last_name
        userList.push({'name':name, 'topics': user.profile.topics.split(",").map(topic => {
          return all_topics[topic]
        }).sort()})
      })
      dispatch(allUsers(users))

    })
  }
}
export const topics = (token, data) => {
    return {
      type: types.TOPICS_FETCHED,
      token: token,
      topics: data
    }
}

export const fetchAllTopics = () => {
  return dispatch => {
    axios
      .get("http://127.0.0.1:8000/user/topic")
      .then((response) => {
        return response.data;
      })
      .then(data => {
        let topic = {}
          data.forEach(element => {
              topic[element.id] = element.name
          });
        const token = localStorage.getItem("token");
        localStorage.setItem("topic", JSON.stringify(topic));
        dispatch(topics(token, topic))
      })
  }
}
export const createProfile = (handle,data) => {
  return dispatch => {
    console.log(data)
    axios
      .put("http://127.0.0.1:8000/user/"+handle,JSON.parse(data))
      .then((response) => {
        return response.data;
      })
      .then(data => {
        dispatch(fetchUserData(handle))
      })
  }
}


export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    const profile = JSON.parse(localStorage.getItem("profile"));
    const email = localStorage.getItem("email");
    const userid = localStorage.getItem("userid");
    console.log(profile)
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token, profile, email, userid));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
