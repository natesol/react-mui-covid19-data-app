import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, FormControl, Select, MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import GitHubIcon from '@material-ui/icons/GitHub';
import LaunchIcon from '@material-ui/icons/Launch';

// import Tooltip from '../Tooltip/Tooltip';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import Popup from '../Popup/Popup';
import StatsCard from '../StatsCard/StatsCard';
import Map from '../Map/Map';
import Table from '../Table/Table';
import LineChart from '../LineChart/LineChart';

import { changeTheme, getData, sortData } from '../../utility/functions';
import { STORAGE_KEY, DATA_OBJ, COVID_URL, mapData } from '../../utility/variables';

import './App.css';



const App = () => {
    //
    const [theme, setTheme] = useState('light');
    // 
    const [country, setCountry] = useState('worldwide');
    const [countryInfo, setCountryInfo] = useState([]);
    const [countries, setCountries] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [caseType, setCaseType] = useState('cases');
    // 
    const mapRef = useRef();
    const [mapCenter, setMapCenter] = useState([mapData.initLat, mapData.initLng]);
    const [mapCountries, setMapCountries] = useState([]);

    //
    const initTheme = () => {
        let data = JSON.parse(localStorage.getItem(STORAGE_KEY));

        if ( !data ) {
            data = DATA_OBJ;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }

        changeTheme(data.userPreferences.theme);
        setTheme(data.userPreferences.theme);
    }
    const setWorldwideInfo = async () => {
        const data = await getData(`${COVID_URL}/all`);
        setCountryInfo(data);
    }
    const setCountriesInfo = async () => {
        const data = await getData(`${COVID_URL}/countries`);
        const countriesData = data.map( country => ({
            name: country.country,
            value: country.countryInfo.iso3,
        }));
        setCountries(countriesData);
        setTableData(sortData(data));
        setMapCountries(data);
    }
    const mapFlyTo = (center, zoom = mapData.focusZoom) => {
        const { current = {} } = mapRef;
        const { leafletElement: map } = current;
    
        map.flyTo(center, zoom, { duration: mapData.flyDuration });
    }

    useEffect(() => {
        initTheme();
        setWorldwideInfo();
        setCountriesInfo();
        
        setMapCenter([mapData.initLat, mapData.initLng]);
    }, []);

    //
    const countryChangeHandler = async (e) => {
        const countryCode = e.target.value;
        const url = countryCode === 'worldwide' ? `${COVID_URL}/all` : `${COVID_URL}/countries/${countryCode}`;
        const data = await getData(url);
        const [lat, lng] = data.countryInfo ? [data.countryInfo.lat, data.countryInfo.long] : [mapData.initLat, mapData.initLng];

        setCountryInfo(data);
        setCountry(countryCode);
        if ( countryCode === 'worldwide' ) mapFlyTo([lat, lng], 2);
        else mapFlyTo([lat, lng]);

        document.querySelector('.map').scrollIntoView({behavior: 'smooth', block: 'center'});
    };

    return (
        <>
            <div className='app__left'>
                <div className='app__header'>
                    <a href={window.location.href} className='app__header--logo'>
                        <h1>C<span className='material-icons-round'>&#xf221;</span>vid19 Data</h1>
                    </a>

                    <div className='app__header--options'>
                        <IconButton className="app__header--options--btn info-btn" aria-label="about this app" >
                            <Popup
                                btnTip='About this application'
                                btnContent={<InfoIcon />}
                                modalContent={ {
                                    title: 'About Covid19 Data App',
                                    body: <>
                                        <p>A live data tracking about the coronavirus spread around the world.</p>
                                        <br />
                                        <p>This app was created as a - fun personal project, and using these technologies: <b>ReactJS</b>, <b>Material UI</b>, <b>ChartsJS</b> and <b>Leaflet</b>.</p>
                                        <br />
                                        <p>The data displayed on the app is a free data from the <b><a href="https://disease.sh/" className='inline-link' target='_blank' rel="noopener noreferrer">disease.sh API <LaunchIcon /></a></b>.</p>
                                        <br />
                                        <div style={{textAlign: 'center'}}>
                                            <a href='https://github.com/natesol/react-covid19-tracker' target='_blank' rel="noopener noreferrer">
                                                <Button
                                                    variant='contained'
                                                    startIcon={<GitHubIcon />}
                                                    endIcon={<LaunchIcon />}
                                                >Visit On GitHub</Button>
                                            </a>
                                        </div>
                                    </>
                                } }
                            />
                        </IconButton>

                        <ThemeToggle theme={theme} setTheme={setTheme} />

                        <FormControl>
                            <Select value={country} variant='outlined' onChange={countryChangeHandler}>
                                <MenuItem value='worldwide'>Worldwide</MenuItem>
                                {countries.map( country => (
                                    <MenuItem value={country.value}>{country.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className='app__stats'>
                    <StatsCard
                        country={countryInfo.country || 'worldwide'}
                        title='Confirmed'
                        active={caseType === 'cases'}
                        cases={countryInfo.todayCases}
                        total={countryInfo.cases}
                        caseType='cases'
                        updated={countryInfo.updated}
                        onClick={() => setCaseType('cases')}
                    />
                    <StatsCard
                        country={countryInfo.country || 'worldwide'}
                        title='Active'
                        active={caseType === 'activecase'}
                        cases={countryInfo.todayCases - countryInfo.todayRecovered - countryInfo.todayDeaths}
                        total={countryInfo.active}
                        caseType='activecase'
                        updated={countryInfo.updated}
                        onClick={() => setCaseType('activecase')}
                    />
                    <StatsCard
                        country={countryInfo.country || 'worldwide'}
                        title='Recovered'
                        active={caseType === 'recovered'}
                        cases={countryInfo.todayRecovered}
                        total={countryInfo.recovered}
                        caseType='recovered'
                        updated={countryInfo.updated}
                        onClick={() => setCaseType('recovered')}
                    />
                    <StatsCard
                        country={countryInfo.country || 'worldwide'}
                        title='Deaths'
                        active={caseType === 'deaths'}
                        cases={countryInfo.todayDeaths}
                        caseType='deaths'
                        total={countryInfo.deaths}
                        updated={countryInfo.updated}
                        onClick={() => setCaseType('deaths')}
                    />
                </div>

                <Map
                    mapRef={mapRef}
                    theme={theme}
                    center={mapCenter}
                    countries={mapCountries}
                    caseType={caseType}
                />
            </div>

            <Card className='app__right'>
                <CardContent>
                    <Table title={'Live Cases By Country'} countries={tableData} />

                    <LineChart title={`New ${caseType === 'activecase' ? 'Active Cases' : caseType[0].toUpperCase()+caseType.slice(1)}`} caseTypes={caseType} />
                </CardContent>
            </Card>
        </>
    );
};

export default App;
