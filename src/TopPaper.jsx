import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { getDay, format } from 'date-fns';

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

const day = (day) => {
  switch(day) {
    case 1: return "Monday"
    case 2: return "Tuesday"
    case 3: return "Wednesday"
    case 4: return "Thursday"
    case 5: return "Friday"
    case 6: return "Saturday"
    default: return "Sunday"
  }
}

const TopPaper = (props: {weather: Object, first: Object}) => {
  // Need to use this method since I need to access Objects inside Object
  const first = props.first
  const weather = props.weather

  const temp = first && first.main ? first.main.temp : null
  const now = first && first.dt_txt ? first.dt_txt : null
  // Country name not available in forecast, need to get from weather Object 
  const countryCode = weather && weather.sys ? weather.sys.country : null
  const name = weather.name
  const type = weather && weather.weather ? weather.weather[0].main : null

  return (
    <Paper className="App--Root" elevation={1}>
      <Typography className="App--DegreeNumber" variant="h3" component="h3">
        {Math.ceil(temp) + "°C"}
      </Typography>
      <div className="App--Description">
        <Typography component="p">
          {`${name}, ${countryCode}`}
        </Typography>
        <Typography component="p">
          {day(getDay(now))}, {format(now, 'DD MMM YYYY')}, ({format(now, 'HH.mm')})
        </Typography>
        <Typography component="p">
          {type}
        </Typography>
      </div>
    </Paper>
  )
}

TopPaper.propTypes = {
  classes: PropTypes.object.isRequired,
};

const MapStateToProps = (state: State) => ({
  weather: state.homeReducer.weather
})

export default connect(MapStateToProps, null)(withStyles(styles)(TopPaper))
