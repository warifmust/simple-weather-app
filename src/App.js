import React from 'react';
import Navbar from './Navbar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ForecastTable from './ForecastTable';
import TopPaper from './TopPaper';
import './App.scss';
import axios from 'axios';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


class App extends React.Component {
  componentDidMount = async () => {
    const res = await axios.get("https://api.openweathermap.org/data/2.5/forecast?q=Malaysia&units=metric&cnt=40&APPID=230a6490cbab9eb8d185b87fe2c47e61")
    const res2 = await axios.get("https://api.openweathermap.org/data/2.5/weather?q=Malaysia&units=metric&APPID=230a6490cbab9eb8d185b87fe2c47e61")
    const weather = await res2.data;
    const forecast = await res.data.list;
    this.props.cacheData(forecast, weather);
  }

  render() {
    // Pass state of first Object of forecast Array as props to TopPaper
    const first = this.props.forecast[0];

    return (
      <div className="App">
        <Navbar />
        <div className="App--Inside">
          <TopPaper first={first}/>
          <ForecastTable />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

const MapStateToProps = (state: State) => ({
  forecast: state.homeReducer.forecast
})

const MapDispatchToProps = (dispatch: Dispatch) => ({
  cacheData: (forecast, weather) => dispatch({type: "CACHE_DATA", payload: {forecast, weather}})
})

export default connect(MapStateToProps, MapDispatchToProps)(withStyles(styles)(App));
