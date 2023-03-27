"use client"
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { useState, useEffect } from "react";
import { Grid, Paper } from "@mantine/core";
import { getWeatherForCity } from "./api/weather";
import { useRouter } from "next/router";
import { Weather } from "./interfaces/weatherInterface";
import axios from 'axios';
import { Props } from 'next/script';

const City = () => {
  const router = useRouter();
  const [weatherData, setWeatherData] = useState<Weather[] | undefined>([]);
  const [city, setCity] = useState<string | undefined | string[]>('');

  useEffect( () => {
    setCity(router.query.city);
    if(city !== '')
      getWeatherForCity(city as string).then((data) => setWeatherData(data));
    else{
      console.log("nije")
    }
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
