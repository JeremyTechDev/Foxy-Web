import * as Redux from "redux";
import thunk from "redux-thunk";
import { PostData } from "./services/PostData";

//GENERAL ACTIONS
const RECEIVE_DATA = "RECEIVE_DATA";
const GET_USER_DATA = "GET_USER_DATA";
//BOOK ACTIONS
const ADD_BOOK = "ADD_BOOK";
const GET_BOOKSHELF = "GET_BOOKSHELF";
//WALL ACTIONS
const GET_POSTS = "GET_POSTS";
const GET_USER_POSTS = "GET_USER_POSTS";
const ADD_POST = "ADD_POST";
const TOOGLE_LIKE = "TOOGLE_LIKE";
const TOOGLE_SAVE = "TOOGLE_SAVE";
const ADD_COMMENT = "ADD_COMMENT";
//GROUP ACTIONS
const ADD_GROUP = "ADD_GROUP";
const GET_GROUPS = "GET_GROUPS";
//USER GROUP ACTIONS
const GET_USER_GROUPS = "GET_USER_GROUPS";

function books(state = [], action) {
  switch (action.type) {
    case ADD_BOOK:
      return PostData(ADD_BOOK, action.book);
    case RECEIVE_DATA:
      return action.books;
    default:
      return state;
  }
}

function userData(state = [], action) {
  switch (action.type) {
    case RECEIVE_DATA:
      return action.userData;
    default:
      return state;
  }
}

function posts(state = [], action) {
  switch (action.type) {
    case RECEIVE_DATA:
      return action.posts;
    case ADD_POST:
      return PostData(ADD_POST, action.post);
    case TOOGLE_LIKE:
      return PostData(TOOGLE_LIKE, action.likeData);
    case TOOGLE_SAVE:
      return PostData(TOOGLE_SAVE, action.saveData);
    case ADD_COMMENT:
      return PostData(ADD_COMMENT, action.comment);
    default:
      return state;
  }
}

export function userPosts(state = [], action) {
  switch (action.type) {
    case RECEIVE_DATA:
      return action.userPosts;
    default:
      return state;
  }
}

export function groups(state = [], action) {
  switch (action.type) {
    case RECEIVE_DATA:
      return action.groups;
    case ADD_GROUP:
      return PostData(ADD_GROUP, action.group);
    case GET_GROUPS:
      return PostData(GET_GROUPS, {});
    default:
      return state;
  }
}

export function userGroups(state = [], action) {
  switch (action.type) {
    case RECEIVE_DATA:
      return action.userGroups;
    default:
      return state;
  }
}

export function addBookAction(book) {
  return {
    type: ADD_BOOK,
    book
  };
}

export function addGroupAction(group) {
  return {
    type: ADD_GROUP,
    group
  };
}

export function addPostAction(post) {
  return {
    type: ADD_POST,
    post
  };
}

export function toogleLikeAction(likeData) {
  return {
    type: TOOGLE_LIKE,
    likeData
  };
}

export function toogleSaveAction(saveData) {
  return {
    type: TOOGLE_SAVE,
    saveData
  };
}

export function addCommentAction(comment) {
  return {
    type: ADD_COMMENT,
    comment
  };
}

export function receiveDataAction(
  books,
  userData,
  posts,
  userPosts,
  groups,
  userGroups
) {
  return {
    type: RECEIVE_DATA,
    books,
    userData,
    posts,
    userPosts,
    groups,
    userGroups
  };
}

export function handleInitialData(user = "") {
  return dispatch => {
    return Promise.all([
      PostData(GET_BOOKSHELF, { user: user }),
      PostData(GET_USER_DATA, { user: user }),
      PostData(GET_POSTS, { user: user }),
      PostData(GET_USER_POSTS, { user: user }),
      PostData(GET_GROUPS, {}),
      PostData(GET_USER_GROUPS, { user: user })
    ])
      .then(([books, userData, posts, userPosts, groups, userGroups]) => {
        dispatch(
          receiveDataAction(
            books,
            userData,
            posts,
            userPosts,
            groups,
            userGroups
          )
        );
      })
      .catch(() => {
        dispatch(receiveDataAction([], [], [], [], [], []));
      });
  };
}

export const store = Redux.createStore(
  Redux.combineReducers({
    books,
    userData,
    posts,
    userPosts,
    groups,
    userGroups
  }),
  Redux.applyMiddleware(thunk)
);
