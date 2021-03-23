import React, { useState, useEffect } from 'react';
import { withStyles, WithStyles, Theme, Typography } from '@material-ui/core';
import Section, { SectionVariant } from './Section';

//imports needed for table using example: https://material-ui.com/components/tables/#table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ContentLifecycle } from 'dc-delivery-sdk-js';

const styles = (theme: Theme) => ({
    table: {
        minWidth: 650,
    }
});

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties;

    title?: string;
    latitude?: number;
    longitude?: number;
    excludeCurrentWeather?: boolean;
    excludeMinutelyWeather?: boolean;
    excludeHourlyWeather?: boolean;
    excludeDailyWeather?: boolean;
    excludeWeatherAlerts?: boolean;
    units?: string;
    apiKey?: string;
}

function getDay(index, dayOfWeek){
    switch(index){
        case 0: return 'Today';
        case 1: return 'Tomorrow';
    }

    switch(dayOfWeek){
        case 0: return 'Sunday';
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        case 6:  return 'Saturday';
        default: return 'Day not found.'
    }
}

const WeatherWidget: React.SFC<Props> = (props) => {
    const {
        classes,
        title,
        latitude,
        longitude,
        excludeCurrentWeather,
        excludeMinutelyWeather,
        excludeDailyWeather,
        excludeHourlyWeather,
        excludeWeatherAlerts,
        units,
        apiKey,
        ...other
    } = props;

    const [weatherData, setWeatherData] = useState({
        daily: [],
        lat: 0, 
        long: 0,
        timezone: '',
        timezone_offset: 0
    });

    useEffect(() => {
        var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&units=${units}&appid=${apiKey}`;

        const fetchWeather = async () => {
            const result = await fetch(url);
            const body = await result.json();

            setWeatherData(body);
        }
        fetchWeather();        
    }, []);

    return (
        <Section variant={SectionVariant.CONTAINED} {...other}>
            <h1>{title}</h1>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Day</TableCell>
                        <TableCell align="right">Morning</TableCell>
                        <TableCell align="right">Day</TableCell>
                        <TableCell align="right">Evening</TableCell>
                        <TableCell align="right">Night</TableCell>
                        <TableCell align="right">Wind Direction</TableCell>
                        <TableCell align="right">Wind Speed</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {weatherData.daily.map((day, index) => (
                        <TableRow key={day.dt}>
                        <TableCell component="th" scope="row">
                            {getDay(index, (new Date().getDay() + index) % 7)}
                        </TableCell>
                        <TableCell align="right">{day.temp.morn}°F</TableCell>
                        <TableCell align="right">{day.temp.day}°F</TableCell>
                        <TableCell align="right">{day.temp.eve}°F</TableCell>
                        <TableCell align="right">{day.temp.night}°F</TableCell>
                        <TableCell align="right">{day.wind_deg}°</TableCell>
                        <TableCell align="right">{day.wind_speed} mph</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Section>
    );
};

export default withStyles(styles)(WeatherWidget);