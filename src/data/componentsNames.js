import SettingsWrapper from
'../components/SettingsWrapper/SettingsWrapper';
import RangeSettings from
'../components/RangeSettings/Range';
import ToggleSettings from
'../components/ToggleSettings/Toggle';
import TimerSettings from
'../components/TimerSettings/Timer';
import ValueSettings from
'../components/ValueSettings/Value';
import LineChart from
'../components/LineChart/LineChart';

export const setingsComponents = {
  LineChart:LineChart,
  Range:RangeSettings,
  Timer:TimerSettings,
  Value:ValueSettings,
  Toggle:ToggleSettings
};


export const options = [
  {
    value: 'all',
    innerText: 'All'
  },
  {
    value: 'on',
    innerText: 'Show On'
  },
  {
    value: 'off',
    innerText: 'Show OFF'
  }
];
