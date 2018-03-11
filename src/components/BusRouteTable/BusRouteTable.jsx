import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

const columns = [
  {
    title: '路線編號',
    dataIndex: 'Id',
    key: 'Id',
  }
];

class BusRouteTable extends Component {
  componentDidMount() {
    this.props.loadDataAsync();
  }
  render() {
    // console.log(this.props.busRoute.busRoutes)
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
