import React, { Component } from "react";
import axios from "axios";

// Components
import Sidebar from "./Sidebar";
import AuthorList from "./AuthorList";
import AuthorDetail from "./AuthorDetail";
import Loading from "./Loading";

class App extends Component {
  state = {
    currentAuthor: null,
    authors: [],
    loading: true
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        "https://the-index-api.herokuapp.com/api/authors/"
      );
      const data = response.data;
      console.log(data);
      this.setState({ authors: data });
      this.setState({ loading: false });
    } catch (err) {
      console.error("Whoops");
      console.error(err);
    }
  }

  selectAuthor = async author => {
    this.setState({ loading: true });
    try {
      const response = await axios.get(
        `https://the-index-api.herokuapp.com/api/authors/${author.id}/`
      );
      const dataDetail = response.data;
      this.setState({ currentAuthor: dataDetail });
      this.setState({ loading: false });
    } catch (err) {
      console.error("Whoops");
      console.error(err);
    }
  };

  unselectAuthor = () => this.setState({ currentAuthor: null });

  getContentView = () => {
    if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return this.state.loading ? (
        <Loading />
      ) : (
        <AuthorList
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
