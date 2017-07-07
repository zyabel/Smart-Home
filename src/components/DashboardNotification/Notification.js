import React from 'react';
import jsonNotifications from '../../data/notifications.json';
import './Notification.scss';


export default class Notifications extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div className="dashboard-content-row2">
        <div className="dashboard-content-row2__notice">
          <span><i className="fa fa-bell-o"></i></span>
          <ul>
            {jsonNotifications.map((item, key) => {
              return (<li key={key}>
              {item.time} {item.notification}
            </li>);
            })
          }
          </ul>
        </div>
      </div>
    );
  }
}
