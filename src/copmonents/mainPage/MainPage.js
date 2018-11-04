import React, { Component } from "react";
import ListPosts from "./ListPosts";
import SideBar from "./SideBar";

export class MainPage extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <ListPosts />
          <SideBar />
        </div>
      </div>
    );
  }
}

export default MainPage;
