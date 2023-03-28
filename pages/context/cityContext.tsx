import React, {createContext, useState} from 'react';

export const cityContext = createContext({searchCity: "", setSearchCity: (searchCity: string) => {}});

const CityConxetProvider = (props: any) => {

  const [searchCity, setSearchCity] = useState(null);

  return (
    <CityConxetProvider value = {{searchCity, setSearchCity}}>
      {props.children}
    </CityConxetProvider>
  )
}

export default CityConxetProvider;