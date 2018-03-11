import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

const columns = [
  {
    title: '路線編號',
    dataIndex: 'nameZh',
    key: 'nameZh',
  },
  {
    title: '營運業者',
    dataIndex: 'providerName',
    key: 'providerName',
  },
  {
    title: '距離',
    dataIndex: 'distance',
    key: 'distance',
  },
  {
    title: '去程(起點)第一站',
    dataIndex: 'departureZh',
    key: 'departureZh',
  },
  {
    title: '回程(訖點)第一站',
    dataIndex: 'destinationZh',
    key: 'destinationZh',
  }
];

class BusRouteTable extends Component {
  componentDidMount() {
    this.props.loadDataAsync();
  }
  render() {
    console.log(this.props.busRoute.busRoutes[0])
    // console.log(this.props.busRoute.busRoutes.filter(x => x.pathAttributeId === 11011))
    return (
      <div>
        <Table
          columns={columns}
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
