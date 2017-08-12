import React from 'react';
import PropTypes from 'prop-types';

export default class SelectLocation extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      input: false,
      locationValue: ''
    };
  }
  showInputLocation = () => {
    this.setState({
      input: !this.state.input
    });
  };

  changeLocationValue = (e) => {
    const newLocationValue = e.target.value;

    this.setState({
      locationValue: newLocationValue
    });
  };
  deleteSelectedLocation = (id) => {
    this.props.deleteLocation(id);

    console.log(id);
  };
  setLocationValue = (location) => {
    this.setState({
      locationValue: location
    });
  };
  addLocationValue = () => {
    this.props.addLocation(this.state.locationValue);
  }
  render () {
    return (
      <div className="Select-control">
        <div className="Select-value select-menu-container">
          <div className="select-menu-label">
            <span className="Select-value-label">
              {this.state.locationValue}
            </span>
            <i className="select-toggle fa fa-caret-down"
            onClick={ this.showInputLocation }></i>
          </div>
        </div>
        {this.state.input ?
        <div>
          <div>
            <input type="text"
              placeholder="Add new location"
              className="Select-input_add-location"
              onChange={this.changeLocationValue}/>
            <i className="fa fa-plus Select-input_add-location_icon"
              onClick={this.addLocationValue}></i>
          </div>
              <ul className="Select-menu">
                {this.props.locations.map((location, i) => {
                  return (
                    <li key={i} className="Select-option"
                      >
                        <span
                        onClick={this.setLocationValue.bind(this,
                           location.value)}>
                          {location.value}
                        </span>
                      <i className="fa fa-trash Select-option__icon"
                      onClick={this.deleteSelectedLocation.bind(this,
                          location._id)}>
                      </i>
                    </li>
                  );
                })
                }
            </ul>
        </div> : null }
      </div>
    );
  }
}
SelectLocation.propTypes = {
  locations: PropTypes.array,
  addLocation: PropTypes.func,
  deleteLocation: PropTypes.func,
  locationId: PropTypes.string
};
