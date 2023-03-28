"use client"
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { useState, useEffect, useContext } from "react";
import { Grid, Paper } from "@mantine/core";
import { useRouter } from "next/router";
import { Weather } from "./interfaces/weatherInterface";
import axios from 'axios';
import { cityContext } from './context/cityContext';

const City = (props: Weather[]) => {
  const {searchCity, setSearchCity} = useContext(cityContext);
  const router = useRouter();
  const weatherData = props;
  const [city, setCity] = useState<string | undefined | string[]>('');

  useEffect( () => {
    setCity(router.query.city);
    setSearchCity(city as string);
  }, [city]);

  return (
    <div>
      <h1>{city} Details</h1>
      <Grid columns={4}>
        {weatherData?.map((data:Weather) => (
          <Paper key={data.name}>
            <p>Name: {data.name}</p>
            <p>Lat: {data.lat}</p>
            <p>Lon: {data.lon}</p>
            <p>Country: {data.county}</p>
            {/* <p>State: {data.state}</p> */}
          </Paper>
        ))}
      </Grid>
    </div>
  );
}

export default City;

export async function getServerSideProps() {
  const {searchCity, setSearchCity} = useContext(cityContext);
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=5&appid=0052724c46eaa7a20e12e875432f7b98`;
  const response = await axios.get(url);
  const data = response.data;
  return{
    props: {
      data
    }
  }
}
