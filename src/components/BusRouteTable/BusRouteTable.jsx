import React , { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { Table } from 'antd';

function columns() {
  return [
  {
    title: '路線',
    dataIndex: 'pathAttributeName',
    key: 'pathAttributeName',
    width: 100,
  },
  {
    title: '營運業者',
    dataIndex: 'providerName',
    key: 'providerName',
    width: 100,
    filters: this.getProviderName(),
    onFilter: (value, record) => record.providerName.indexOf(value) === 0,
  },
  {
    title: '距離',
    dataIndex: 'distance',
    key: 'distance',
    width: 70,
    sorter: (a, b) => {
      return a.distance - b.distance
    },
  },
  {
    title: '去程(起點)第一站',
    dataIndex: 'departureZh',
    key: 'departureZh',
    width: 200,
  },
  {
    title: '回程(訖點)第一站',
    dataIndex: 'destinationZh',
    key: 'destinationZh',
    width: 200,
  }];
}

class BusRouteTable extends Component {
  componentDidMount() {
    this.props.loadDataAsync();
  }

  getProviderName = () => (
    R.pipe(
      R.map(d => d.providerName),
      R.uniq,
      R.map(d => ({ text: d, value: d }))
    )(this.props.busRoute.busRoutes)
  )

  render() {
    console.log(this.props.busRoute.busRoutes[3])
    console.log(this.props.busRoute.busRoutes[4])
    // console.log(this.props.busRoute.busRoutes.filter(x => x.pathAttributeId === 11011))
    return (
      <div>
        <Table
          columns={columns.call(this)}
          dataSource={this.props.busRoute.busRoutes}
          rowKey={record => `${record.providerId}-${record.pathAttributeId}` }
        />
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
