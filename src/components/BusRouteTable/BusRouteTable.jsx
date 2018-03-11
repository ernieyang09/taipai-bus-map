import React , { Component } from 'react';
import { connect } from 'react-redux';

class BusRouteTable extends Component {
  componentDidMount() {
    this.props.loadDataAsync();
  }
  render() {
    console.log(this.props)
    return (
      <div>
        asdgsadf
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  busRoute: state.busRoute,
});

const mapDispatchToProps = ({ busRoute:  { loadData, loadDataAsync } }) => {
  return {
    loadData,
    loadDataAsync,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BusRouteTable);
