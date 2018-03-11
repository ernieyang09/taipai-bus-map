import React , { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { Table, Input, Button } from 'antd';

import './main.scss';

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
    filterDropdown: (
      <div className="custom-filter-dropdown">
        <Input
          ref={ele => this.searchDeparture = ele}
          placeholder="關鍵字"
          value={this.state.searchDeparture}
          onChange={this.handleForChange('Departure')}
          onPressEnter={this.onSearch}
        />
        <Button type="primary" onClick={this.onSearch}>Search</Button>
      </div>
    )
  },
  {
    title: '回程(訖點)第一站',
    dataIndex: 'destinationZh',
    key: 'destinationZh',
    width: 200,
    filterDropdown: (
      <div className="custom-filter-dropdown">
        <Input
          ref={ele => this.searchDestination = ele}
          placeholder="關鍵字"
          value={this.state.searchDestination}
          onChange={this.handleForChange('Destination')}
          onPressEnter={this.onSearch}
        />
        <Button type="primary" onClick={this.onSearch}>Search</Button>
      </div>
    )
  }];
}

class BusRouteTable extends Component {
  state = {
    searchDeparture: '',
    searchDestination: '',
    routes: [],
  }
  componentDidMount() {
    this.props.loadDataAsync();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.busRoute.busRoutes.length) {
      this.setState({
        routes: nextProps.busRoute.busRoutes,
      });
    }
  }

  handleForChange = propertyName => event => {
    this.setState({
      [`search${propertyName}`]: event.target.value,
    });
  }

  onSearch = () => {
    const { searchDeparture, searchDestination } = this.state;
    const regDeparture = new RegExp(searchDeparture, 'gi');
    const regDestination = new RegExp(searchDestination, 'gi');
    const filterData = this.props.busRoute.busRoutes.map((record) => {
      const match1 = record.departureZh.match(regDeparture);
      const match2 = record.destinationZh.match(regDestination);
      if (match1 && match2) {
        return record;
      } else {
        return null;
      }
    }).filter(record => record);
    console.log(filterData)
    this.setState({
      routes: filterData,
    });
  }

  getProviderName = () => (
    R.pipe(
      R.map(d => d.providerName),
      R.uniq,
      R.map(d => ({ text: d, value: d }))
    )(this.state.routes)
  )

  render() {
    console.log(this.state)
    // console.log(this.props.busRoute.busRoutes.filter(x => x.pathAttributeId === 11011))
    return (
      <div>
        <Table
          columns={columns.call(this)}
          dataSource={this.state.routes}
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
