import React, { Component } from "react";
import axios from "../axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withRouter } from "react-router";

import LoadingSpinner from '../LoadingSpinner';

class BlockDetail extends Component {
  state = {
    blocks: [],
    tx: [],
    loading: false
  };

  async componentDidMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let hash = params.get("hash");
    localStorage.setItem("block-hash", hash);
    this.getBlockDetails();
  }
  getBlockDetails = () => {
    // axios.get(`getABlock/${localStorage.getItem("block-hash")}`).then((res) => {
    //   const blocks = res.data.data;
    //   this.setState({ blocks: blocks });
    //   this.setState({ tx: blocks.tx });
    // });
    this.setState({ loading: true }, () => {
        axios.get(`getABlock/${localStorage.getItem("block-hash")}`)
          .then(result => this.setState({
            loading: false,
            blocks: result.data.data,
            tx: result.data.data.tx
          }));
    });
  };

  clickedTxHash = (hash) => {
    this.props.history.push(`/transaction-detail?hash=${hash}`);
  };

  render() {
    const { loading } = this.state;

    return (
      <div>
          {loading ? <LoadingSpinner /> : <React.Fragment>
        <ToastContainer />
        <div className="center">
          <h4>Block Details</h4>
        </div>
        <div className="card">
          <div className="pt-3 row ml-3">
            <div className="pl-3 mb-3 col col-md-12">
              <b>Hash:</b> {this.state.blocks.hash}
            </div>
            <div className="pl-3 mb-3 col col-md-12">
              <b>Previous Block:</b> {this.state.blocks.prev_block}
            </div>
            <div className="pl-3 mb-3 col col-md-12">
              <b>Mrkl Root:</b> {this.state.blocks.mrkl_root}
            </div>
            <div className="pl-3 mb-3 col col-md-6">
              <b>Nounce:</b> {this.state.blocks.nounce}
            </div>
            <div className="pl-3 mb-3 col col-md-6">
              <b>Version:</b> {this.state.blocks.ver}
            </div>
            <div className="pl-3 mb-3 col col-md-6">
              <b>Time:</b> {this.state.blocks.time}
            </div>
            <div className="pl-3 mb-3 col col-md-6">
              <b>Bits:</b> {this.state.blocks.bits}
            </div>
            <div className="pl-3 mb-3 col col-md-6">
              <b>N_TX:</b> {this.state.blocks.n_tx}
            </div>
            <div className="pl-3 mb-3 col col-md-6">
              <b>Size:</b> {this.state.blocks.size}
            </div>
            <div className="pl-3 mb-3 col col-md-6">
              <b>Block Index:</b> {this.state.blocks.block_index}
            </div>
            <div className="pl-3 mb-3 col col-md-6">
              <b>Main Chain:</b> {this.state.blocks.main_chain}
            </div>
            <div className="pl-3 mb-3 col col-md-6">
              <b>Height:</b> {this.state.blocks.height}
            </div>
            <div className="pl-3 mb-3 col col-md-6">
              <b>Relayed By:</b> {this.state.blocks.relayed_by}
            </div>
          </div>
        </div>
        <div className="mb-3 mt-3">
          <h4>Transactions on Block</h4>
        </div>
        <table className="table table-striped">
          <thead>
            <tr className="bg-primary text-white">
              <th>Hash</th>
              <th>Ver</th>
              <th>Vin SZ</th>
              <th>Vout SZ</th>
              <th>Size</th>
              <th>Weight</th>
              <th>Tx Index</th>
              <th>Time</th>
              <th>Block Index</th>
              <th>Block Height</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tx.map((element) => (
              <tr key={element.hash}>
                <td>{element.hash}</td>
                <td>{element.ver}</td>
                <td>{element.vin_sz}</td>
                <td>{element.vout_sz}</td>
                <td>{element.size}</td>
                <td>{element.weight}</td>
                <td>{element.tx_index}</td>
                <td>{element.time}</td>
                <td>{element.block_index}</td>
                <td>{element.block_height}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>}
      </div>
    );
  }
}

export default withRouter(BlockDetail);
