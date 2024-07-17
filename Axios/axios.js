import axios from "axios";
import {ACCESS_TOKEN } from '../config/config'

const Baseurl = 'https://api.themoviedb.org/3/'

export const BaseUrl = axios.create({
    baseURL:Baseurl,
    headers:{
        'Content-Type':'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`
    }
})

export  const ImageUrl = 'http://image.tmdb.org/t/p/w500'