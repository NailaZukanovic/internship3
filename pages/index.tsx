import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { GetServerSideProps } from 'next';

import { Table, Text } from '@mantine/core';
import { getCitiesByCountry } from './api/cities';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { City } from './interfaces/cityInterface';

export default function Home() {

  const [cities, setCities] = useState<City[] | undefined>([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getCitiesByCountry(searchText).then((result) => setCities(result));
  }, [searchClicked]);


  const handleSearch = () => {
    setSearchClicked(!searchClicked);
  };

  const handleInputChange = (event: any) => {
    setSearchText(event.target.value);
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <input
        placeholder="Search"
        value={searchText}
        onChange={handleInputChange}
        style={{ marginRight: '1rem' }}
      />
      <button onClick={handleSearch}>Search</button>
      {cities && cities.length > 0 &&
        <Table>
          <thead>
            <tr>
              <td>City Name</td>
              <td>Country Name</td>
            </tr>
          </thead>
          <tbody>
            {cities.map((city:City) => (
              <tr key={city.city}>
                <td style={{color: "white"}}>{city.city}</td>
                <td style={{color: "white"}}>{searchText}</td>
                <td>
                  <button>
                    <Link href={{
                      pathname: '/city',
                      query: { city: city.city }}}>
                        Go to page
                    </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      }

    </>
  )
}

