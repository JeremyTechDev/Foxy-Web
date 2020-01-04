import React from "react";
import Header from "../Header";
import "../../css/profile.scss";
import WallGrid from "../Wall/WallGrid";
import "../../css/wall.scss";
import BooksGrid from "../Bookshelf/BookGrid";
import "../../css/books.scss";
import GroupsGrid from "../Groups/GroupsGrid";
import "../../css/groups.scss";
import { PostData } from "../../services/PostData";
//import queryString from 'query-string';

class TabList extends React.Component {
  render() {
    return (
      <div className="tablist">
        <div
          onClick={() => {
            this.props.toggleTab("posts-tab");
          }}
          id="posts-tab"
          className="tab tab-selected"
        >
          Posts
        </div>
        <div
          onClick={() => {
            this.props.toggleTab("bookshelf-tab");
          }}
          id="bookshelf-tab"
          className="tab"
        >
          Bookshelf
        </div>
        <div
          onClick={() => {
            this.props.toggleTab("groups-tab");
          }}
          id="groups-tab"
          className="tab"
        >
          Groups
        </div>
        <div
          onClick={() => {
            this.props.toggleTab("saved-tab");
          }}
          id="saved-tab"
          className="tab"
        >
          Saved
        </div>
      </div>
    );
  }
}

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: "posts-tab", //displayed tab
      posts: [],
      books: [],
      groups: [],
      savedPosts: []
    };

    this.toggleTab = this.toggleTab.bind(this);
  }

  componentDidMount() {
    
    //const { user_id } = queryString.parse(this.props.location.search) the user to display

    //gets all posts info
    PostData("selectAllPosts", {}).then(res => {
      this.setState({posts: res});
    })

    //gets all books info
    PostData("selectAllBooks", {}).then(res => {
      res.allBooks.forEach(book => {
        this.setState({
          books: [...this.state.books, book]
        });
      });
    });

    //saved posts
    PostData("selectAllPosts", {}).then(res => {
      this.setState({savedPosts: res});
    })

    //gets all groups info
    PostData("selectUserGroups", {}).then(res => {
      res.userGroups.forEach(group => {
        this.setState({
          groups: [...this.state.groups, group]
        });
      });
    });
  }

  //Changes the view between posts and saved
  toggleTab(tab) {
    //Update the view
    this.setState({ tab: tab });
    //Remove the tab-selected to all the tabs
    tab = document.getElementById(tab).classList;
    document.getElementById("posts-tab").classList.remove("tab-selected");
    document.getElementById("bookshelf-tab").classList.remove("tab-selected");
    document.getElementById("groups-tab").classList.remove("tab-selected");
    document.getElementById("saved-tab").classList.remove("tab-selected");
    //Add the class to the tab
    tab.add("tab-selected");
  }

  render() {
    const { tab } = this.state;
    return (
      <React.Fragment>
        <Header />

        <div className="profile">
          <div className="artboard">
            <img alt="Artboard" src={require("../../images/ex.png")} />
          </div>
          <img
            className="profile-img"
            alt="Profile"
            src={require("../../images/FOXYFACE_LOGO-01.png")}
          />
          <div className="profile-info">
            <h1>Jeremy Muñoz</h1>
            <h5>@jeremy2918</h5>
            <h4>
              ¿Falta alguna traducción, hay algún error o quiere elogiar nuestra
              labor? Rellene el formulario con sus comentarios.
            </h4>
            <h3>
              5 <span>Posts </span>
              165 <span>Followers </span>
              100 <span>Following </span>
            </h3>
          </div>
          <TabList toggleTab={this.toggleTab} />
        </div>
        {tab === "posts-tab" && (
          <div className="tab-body">
            <span>
              <WallGrid posts={this.state.posts} />
            </span>
          </div>
        )}
        {tab === "bookshelf-tab" && (
          <div className="tab-body">
            <span>
              <BooksGrid books={this.state.books} />
            </span>
          </div>
        )}
        {tab === "groups-tab" && (
          <div className="tab-body">
            <span>
              <GroupsGrid groups={this.state.groups} />
            </span>
          </div>
        )}
        {tab === "saved-tab" && (
          <div className="tab-body">
            <span>
              <WallGrid posts={this.state.savedPosts} />
            </span>
          </div>
        )}
      </React.Fragment>
    );
  }
}
