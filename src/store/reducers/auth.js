import * as types from "../actions/types";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  error: null,
  loading: false,
  profile: null,
  topics:["Topic 1", "Topic 2"],
  position:"",
  fname:"",
  lname:"",
  bio:"",
  email:""
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    error: null,
    loading: false,
    profile: action.profile,
    email: action.email,
    userid:action.userid
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    profile: null
  });
};

const userInfo = (state, action) => {
    return updateObject(state, {
      token: action.token,
      userdata: action.userdata,
      profile:JSON.parse(action.profile)
    })
}

const topics = (state, action) => {
    return updateObject(state, {
      token: action.token,
      topics: action.topics
    })
}

const userList = (state, action) => {
    return updateObject(state, {
      users: action.users
    })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_START:
      return authStart(state, action);
    case types.AUTH_SUCCESS:
      return authSuccess(state, action);
    case types.AUTH_FAIL:
      return authFail(state, action);
    case types.AUTH_LOGOUT:
      return authLogout(state, action);
    case types.PROFILE_CREATED:
      return userInfo(state, action);
    case types.TOPICS_FETCHED:
      return topics(state, action);
    case types.USER_LIST:
      return userList(state, action);
    default:
      return state;
  }
};

export default reducer;
