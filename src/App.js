import React, { Component } from "react";
import axios from "axios";
import authors from "./data.js";
import Loading from "./Loading";
// Components
import Sidebar from "./Sidebar";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";

class App extends Component {
  state = {
    currentAuthor: null,
    authors: [],
    loading: true
  };

  componentDidMount = async () => {
    try {
      let response = await axios.get(
        "https://the-index-api.herokuapp.com/api/authors"
      );
      let authors = response.data;
      this.setState({ authors: authors, loading: false });
    } catch (error) {
      console.error(error);
    }
  };

  selectAuthor = async author => {
    this.setState({ loading: true });
    try {
      let response = await axios.get(
        `https://the-index-api.herokuapp.com/api/authors/${author.id}/`
      );
      let authorDetail = response.data;
      this.setState({ currentAuthor: authorDetail, loading: false });
    } catch (error) {
      console.error(error);
    }
  };

  unselectAuthor = () => this.setState({ currentAuthor: null });

  getContentView = () => {
    if (this.state.loading) return <Loading />;
    if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return (
        <AuthorsList
          authors={this.state.authors}
          selectAuthor={this.selectAuthor}
        />
      );
    }
  };

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">{this.getContentView()}</div>
        </div>
      </div>
    );
  }
}

export default App;
