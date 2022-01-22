import axios from "axios";

const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1';



export const getCocktailDrink = () => {
    return axios.get(`${baseUrl}/filter.php?c=Cocktail`)
}

export const getOrdinaryDrink = () => {
    return axios.get(`${baseUrl}/filter.php?c=Ordinary_Drink`)
}

