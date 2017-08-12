import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DeviceListItem from '../../components/DeviceListItem/DeviceListItem';
import { Message } from '../../components/Message/Message';
import { Popup } from '../../components/Popup/Popup';
import { Button } from '../../components/Button/Button';
import Pagination from '../../components/Pagination/Pagination';
import ListHeader from '../../components/ListHeader/ListHeader';
import DevicesSection from '../../components/DevisesSection/DevisesSection';
import {
  loadDevices,
  changeStatus,
  deleteDevice,
  updateDevice,
  clearStatus } from '../../actions/devices.action';
import { sendNotificationWS } from '../../actions/notifications.action';
import { filterItems } from '../../selectors';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import PropTypes from 'prop-types';
require('../DeviceList/DeviceList.scss');

class LocationList extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      popupShown: false,
      currentId: '',
      currentPage: 1,
      todosPerPage: 6
    };

    this.setPopupShown = (id) => {
      const currentState = this.state.popupShown;

      this.setState({
        popupShown: !currentState,
        currentId: id
      });
    };

    this.handleClick = (event) => {
      this.setState({
        currentPage: Number(event.target.id)
      });
    };

    this.changeStatus = (status, id) => {
      this.props.changeStatus({ status }, id);
    };
    this.deleteDevice = (id) => {
      this.props.deleteDevice(id);
    };
  }

  componentDidMount () {
    this.props.loadDevices();
  }

  renderDevices (devicesInLocation) {
    return (
      devicesInLocation.map((device, i) => {
        return (
          <DeviceListItem
            data={device}
            key={i}
            location={''}
            changeStatus={this.changeStatus}
            setPopupShown={this.setPopupShown}/>
        );
      })
    );
  }

  renderDeviceGroup (devicesInLocation) {
    return (
      <div className="device-group">
        <ReactCSSTransitionGroup
          className="device-group__items"
          transitionName="hide"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {this.renderDevices(devicesInLocation)}
        </ReactCSSTransitionGroup>
      </div>
    );
  }

  render () {
    const filterOption = this.props.match.params.filterOption;
    const locationOfDevices = this.props.match.params.location;
    const devicesInLocation = this.props.devices
      .filter(item => item.location === locationOfDevices);

    if (typeof filterOption !== 'undefined') {
      this.props.filterAction(filterOption);
    }

    return (
      <DevicesSection
        filterOption={this.props.match.params.filterOption}
        devices={this.props.devices}
        location={this.props.location}
        history={this.props.history}
        match={this.props.match}
        status={this.props.status}
        text={this.props.errorText}
        setPopupShown={this.setPopupShown}
        popupShown={this.state.popupShown}
        deleteDevice={this.deleteDevice}
        clearStatus={this.props.clearStatus}
        currentId={this.state.currentId}
        quantity={devicesInLocation.length}>

        { this.props.status === 'DONE' && this.props.devices.length === 0 ?
          <span>You need to add device</span> :
          this.renderDeviceGroup(devicesInLocation)
        }
        <Pagination
            handleClick={this.handleClick}
            list={this.props.devices}/>
      </DevicesSection>
    );
  }
}

const mapStateToProps = state =>({
  devices: filterItems(state),
  status: state.devicesList.uploadStatus,
  errorText: state.devicesList.errorText
});

const mapDispatchToProps = (dispatch) => ({
  changeStatus: (data, id) => dispatch(updateDevice(data, id)),
  loadDevices: () => dispatch(loadDevices()),
  deleteDevice: (id) => dispatch(deleteDevice(id)),
  sendNotificationWS: (message) => dispatch(sendNotificationWS(message)),
  clearStatus: () => dispatch(clearStatus())
});

LocationList.propTypes = {
  search: PropTypes.string,
  filterOption:  PropTypes.string,
  match: PropTypes.object,
  changeStatus: PropTypes.func,
  devices: PropTypes.array,
  filterAction: PropTypes.func,
  findItems: PropTypes.func,
  loadDevices: PropTypes.func,
  deleteDevice: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  status: PropTypes.string,
  sendNotificationWS: PropTypes.func,
  errorText: PropTypes.string,
  clearStatus: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationList);