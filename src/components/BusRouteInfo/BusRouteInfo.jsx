import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import {
  Row,
  Col,
  Modal,
  Button,
} from 'antd';

import './main.scss';

class BusRouteInfo extends Component {
  render() {
    const { current } = this.props.busRouteInfo;
    return (
      <Modal
         className="info-modal"
         title="基本資料"
         visible={!R.isEmpty(this.props.busRouteInfo.current)}
         footer={null}
         onCancel={()=> { this.props.init(); }}
         width='80%'
       >
         {
           current &&
           <React.Fragment>
             <Row type="flex">
               <Col xs={24} sm={12}>
                 <span className="column-title">
                   路線中文名稱
                 </span>
                 {current.pathAttributeName}
               </Col>
               <Col xs={24} sm={12}>
                 <span className="column-title">
                   路線英文名稱
                 </span>
                 {current.pathAttributeEname}
               </Col>
             </Row>
             <Row type="flex">
               <Col xs={24} sm={12}>
                 <span className="column-title">
                   去程(起點)第一站
                 </span>
                 {current.departureZh}
               </Col>
               <Col xs={24} sm={12}>
                 <span className="column-title">
                   回程(訖點)第一站
                 </span>
                 {current.destinationZh}
               </Col>
             </Row>
             <Row type="flex">
               <Col xs={24} sm={12}>
                 <span className="column-title">
                   去程第一班發車時間
                 </span>
                 {current.goFirstBusTime}
               </Col>
               <Col xs={24} sm={12}>
                 <span className="column-title">
                   去程最後一班發車時間
                 </span>
                 {current.goLastBusTime}
               </Col>
             </Row>
             <Row type="flex">
               <Col xs={24} sm={12}>
                 <span className="column-title">
                   回程第一班發車時間
                 </span>
                 {current.backFirstBusTime}
               </Col>
               <Col xs={24} sm={12}>
                 <span className="column-title">
                   回程最後一班發車時間
                 </span>
                 {current.backLastBusTime}
               </Col>
             </Row>
             <Row type="flex">
               <Col xs={24} sm={12}>
                 <span className="column-title">
                   假日去程第一班發車時間
                 </span>
                 {current.holidayGoFirstBusTime}
               </Col>
               <Col xs={24} sm={12}>
                 <span className="column-title">
                   假日去程最後一班發車時間
                 </span>
                 {current.holidayGoLastBusTime}
               </Col>
             </Row>
             <Row type="flex">
               <Col xs={24} sm={12}>
                 <span className="column-title">
                   假日回程第一班發車時間
                 </span>
                 {current.holidayBackFirstBusTime}
               </Col>
               <Col xs={24} sm={12}>
                 <span className="column-title">
                   假日回程最後一班發車時間
                 </span>
                 {current.holidayBackLastBusTime}
               </Col>
             </Row>
             <Row type="flex">
               <Col span={24}>
                 <span className="column-title">
                   平日發車間距描述
                 </span>
                 {current.headwayDesc}
               </Col>
             </Row>
             <div>
               <div>
                 <Button onClick={this.props.loadRealtimeAsync}>
                   即時資料
                 </Button>
               </div>
               <div>
                 {
                   this.props.busRouteInfo.realtime &&
                   <React.Fragment>
                     {
                       this.props.busRouteInfo.realtime.length ?
                         this.props.busRouteInfo.realtime.map((d)=> {
                           return <div key={d.BusID}>
                             公車車牌: {d.BusID} 經度: {d.Longitude} 緯度: {d.Latitude}
                           </div>
                         })
                       : '無資料'
                     }
                   </React.Fragment>
                 }
               </div>
             </div>
           </React.Fragment>
         }
       </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  busRouteInfo: state.busRouteInfo,
});

const mapDispatchToProps = ({
  busRouteInfo: { init, loadRealtimeAsync },
}) => {
  return {
    init,
    loadRealtimeAsync,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BusRouteInfo);
