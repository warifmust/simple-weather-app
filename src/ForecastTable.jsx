import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// eslint-disable-next-line
import { getDay, format } from 'date-fns';
import Typography from '@material-ui/core/Typography';

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

const ForecastTable = (props: {forecast: Array, weather: Object}) => {
  const { classes } = props;
  const foreCast = props.forecast;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Day, Date and Weather</TableCell>
            <TableCell>Temperature</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {foreCast.map(f => (
            <TableRow key={f.dt}>
              <TableCell>
                <Typography>{format(f.dt_txt, 'DD MMM YYYY')}, {day(getDay(f.dt_txt))}, ({format(f.dt_txt, 'HH.mm')})</Typography>
                <Typography>{f.weather.map(a => a.main)}</Typography>
              </TableCell>
              <TableCell>{Math.ceil(f.main.temp_min) + "°C"} - {Math.ceil(f.main.temp_max) + "°C"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

ForecastTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const MapStateToProps = (state: State) => ({
  forecast: state.homeReducer.forecast,
  weather: state.homeReducer.weather
})

export default connect(MapStateToProps, null)(withStyles(styles)(ForecastTable));
