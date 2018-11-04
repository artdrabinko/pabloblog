import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "./reducers/index";
import LoadingComponent from "./containers/LoadingComponent";
//import App from "./copmonents/App";

import Header from "./copmonents/layout/Header";
import MainPage from "./copmonents/mainPage/MainPage";
import SignIn from "./copmonents/SignIn";
import CreatePost from "./copmonents/CreatePost";
import * as serviceWorker from "./serviceWorker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <LoadingComponent>
      <Router>
        <div>
          <Header />

          <Route exact path="/" component={MainPage} />
          <Route path="/signin" component={SignIn} />
          <Route path="/new" component={CreatePost} />
        </div>
      </Router>
    </LoadingComponent>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
