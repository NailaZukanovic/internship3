export const getCitiesByCountry = async (country: string)  => {
  var raw = {country: country}

  // var requestOptions = {
  //   method: 'POST',
  //   body: JSON.stringify(raw),
  //   redirect: 'follow',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  // };

  var temp

  await fetch("https://countriesnow.space/api/v0.1/countries/cities")
    .then(response => response.text())
    .then(result => temp = JSON.parse(result).data )
    .catch(error => console.log('error', error));

  return temp
};