import React, { Component } from "react";
import axios from "../axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withRouter } from "react-router";

import LoadingSpinner from "../LoadingSpinner";

class Blocks extends Component {
  state = {
    blocks: [],
    loading: false,
  };

  async componentDidMount() {
    const today = new Date().getTime();
    localStorage.setItem("time", today);
    this.getBlocks();
  }
  getBlocks = () => {
    this.setState({ loading: true }, () => {
      axios.get(`getAllBlocks/${localStorage.getItem("time")}`).then((result) =>
        this.setState({
          loading: false,
          blocks: result.data.data,
        })
      );
    });
  };
  handleChange = (event) => {
    const value = event.target.value;
    console.log(value);
    localStorage.setItem("time", value);
    this.getBlocks();
  };

  clickedBlockHash = (hash) => {
    this.props.history.push(`/block-detail?hash=${hash}`);
  };

  render() {
    const { loading } = this.state;
    return (
      <div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <React.Fragment>
            <ToastContainer />
            <div className="center">
              <h4 className="mb-3">Blocks</h4>
            </div>

            <div className="row">
              <div class="form-group col-md-2">
                Filter:{" "}
                <select class="form-control" onChange={this.handleChange}>
                  <option value={new Date().getTime()}>Now</option>
                  <option
                    value={new Date(
                      new Date().valueOf() - 1000 * 60 * 60 * 24
                    ).getTime()}
                  >
                    Last 24 hours
                  </option>
                </select>
              </div>
            </div>

            <table className="table table-striped">
              <thead className="bg-primary text-white">
                <tr>
                  <th>Hash</th>
                  <th>Height</th>
                  <th>Time</th>
                  <th>View Details</th>
                </tr>
              </thead>
              <tbody>
                {this.state.blocks.map((block) => (
                  <tr key={block.hash}>
                    <td>{block.hash}</td>
                    <td>{block.height}</td>
                    <td>{block.time}</td>
                    <td>
                      <button
                        className="btn btn-primary text-white btn-sm"
                        onClick={() => this.clickedBlockHash(block.hash)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default withRouter(Blocks);
