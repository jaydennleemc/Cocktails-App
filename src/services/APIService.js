import axios from 'axios';

const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1';

export const getCocktailDrink = () => {
  return axios.get(`${baseUrl}/filter.php?c=Cocktail`);
};

export const getOrdinaryDrink = () => {
  return axios.get(`${baseUrl}/filter.php?c=Ordinary_Drink`);
};

export const getPopularDrink = () => {
  return axios.get(`${baseUrl}/random.php`);
};

export const getDrinkDetail = id => {
  return axios.get(`${baseUrl}/lookup.php?i=${id}`);
};


export const getDrinksByCategory = category => {
  let url = '';
  if (category === 'Cocktail') {
    url = `${baseUrl}/filter.php?c=Cocktail`;
  } else if (category === 'Ordinary') {
    url = `${baseUrl}/filter.php?c=Ordinary_Drink`;
  } else if (category === 'Alcoholic') {
    url = `${baseUrl}/filter.php?a=Alcoholic`;
  } else if (category === 'Non Alcoholic') {
    url = `${baseUrl}/filter.php?a=Non_Alcoholic`;
  } else if (category === 'Cocktail Glass') {
    url = `${baseUrl}/filter.php?g=Cocktail_glass`;
  } else if (category === 'Champagne Flute') {
    url = `${baseUrl}/filter.php?g=Champagne_flute`;
  }
  return axios.get(url);
};
