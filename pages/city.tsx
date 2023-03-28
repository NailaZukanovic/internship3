"use client"
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { useState, useEffect, useContext } from "react";
import { Grid, Paper } from "@mantine/core";
import { useRouter } from "next/router";
import { Weather } from "./interfaces/weatherInterface";
import axios from 'axios';

const City = (props: Weather[]) => {
  const router = useRouter();
  const weatherData = props;
  const [city, setCity] = useState<string | undefined | string[]>(router.query.city);

  useEffect( () => {
    setCity(router.query.city);
  }, [router.query.city]);

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

export async function getServerSideProps({query}) {
  const searchCity = query.city as string;
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=5&appid=0052724c46eaa7a20e12e875432f7b98`;
  const response = await axios.get(url);
  const data = response.data;
  return{
    props: {
      data
    }
  }
}
