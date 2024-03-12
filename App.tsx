import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  FlatList,
} from 'react-native';
import axios from 'axios';
import {TextComponent} from './src/components/TextComponent';
import {ButtonComponent} from './src/components/ButtonComponent';

const infoFake = {
  lat: 33.44,
  lon: -94.04,
  timezone: 'America/Chicago',
  timezone_offset: -21600,
  current: {
    dt: 1618317040,
    sunrise: 1618282134,
    sunset: 1618333901,
    temp: 284.07,
    feels_like: 282.84,
    pressure: 1019,
    humidity: 62,
    dew_point: 277.08,
    uvi: 0.89,
    clouds: 0,
    visibility: 10000,
    wind_speed: 6,
    wind_deg: 300,
    weather: [
      {
        id: 500,
        main: 'Rain',
        description: 'light rain',
        icon: '10d',
      },
    ],
    rain: {
      '1h': 0.21,
    },
  },
  daily: [
    {
      dt: 1618308000,
      sunrise: 1618282134,
      sunset: 1618333901,
      moonrise: 1618284960,
      moonset: 1618339740,
      moon_phase: 0.04,
      temp: {
        day: 159.79,
        min: 225.09,
        max: 284.07,
        night: 275.09,
        eve: 279.21,
        morn: 278.49,
      },
      feels_like: {
        day: 277.59,
        night: 276.27,
        eve: 276.49,
        morn: 276.27,
      },
      pressure: 1020,
      humidity: 81,
      dew_point: 276.77,
      wind_speed: 3.06,
      wind_deg: 294,
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d',
        },
      ],
      clouds: 56,
      pop: 0.2,
      rain: 0.62,
      uvi: 1.93,
    },
    {
      dt: 1618308000,
      sunrise: 1618282134,
      sunset: 1618333901,
      moonrise: 1618284960,
      moonset: 1618339740,
      moon_phase: 0.04,
      temp: {
        day: 279.79,
        min: 275.09,
        max: 284.07,
        night: 275.09,
        eve: 279.21,
        morn: 278.49,
      },
      feels_like: {
        day: 277.59,
        night: 276.27,
        eve: 276.49,
        morn: 276.27,
      },
      pressure: 1020,
      humidity: 81,
      dew_point: 276.77,
      wind_speed: 3.06,
      wind_deg: 294,
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d',
        },
      ],
      clouds: 56,
      pop: 0.2,
      rain: 0.62,
      uvi: 1.93,
    },
    {
      dt: 1618308001,
      sunrise: 1618282134,
      sunset: 1618333901,
      moonrise: 1618284960,
      moonset: 1618339740,
      moon_phase: 0.04,
      temp: {
        day: 260.79,
        min: 241.09,
        max: 284.07,
        night: 275.09,
        eve: 279.21,
        morn: 278.49,
      },
      feels_like: {
        day: 277.59,
        night: 276.27,
        eve: 276.49,
        morn: 276.27,
      },
      pressure: 1020,
      humidity: 81,
      dew_point: 276.77,
      wind_speed: 3.06,
      wind_deg: 294,
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d',
        },
      ],
      clouds: 56,
      pop: 0.2,
      rain: 0.62,
      uvi: 1.93,
    },
  ],
};

const infoFakeDirections = [
  {
    id: 19,
    slug: 'monterrey',
    city_slug: 'monterrey',
    display: 'Monterrey',
    ascii_display: 'monterrey',
    city_name: 'Monterrey',
    city_ascii_name: 'monterrey',
    state: 'Nuevo León',
    country: 'México',
    lat: '25.6866142',
    long: '-100.3161126',
    result_type: 'city',
    popularity: '0.365111433802639',
    sort_criteria: 0.32604458067361297,
  },
  {
    id: 13531,
    slug: 'monteon',
    city_slug: 'monteon',
    display: 'Monteon',
    ascii_display: 'monteon',
    city_name: 'Monteon',
    city_ascii_name: 'monteon',
    state: 'Nayarit',
    country: 'México',
    lat: '20.9864207',
    long: '-105.2984842',
    result_type: 'city',
    popularity: '0',
    sort_criteria: 0.3,
  },
  {
    id: 13532,
    slug: 't-monteon-monteon-geb',
    city_slug: 'monteon',
    display: 'Terminal Monteon GEB',
    ascii_display: 'terminal monteon geb',
    city_name: 'Monteon',
    city_ascii_name: 'monteon',
    state: 'Nayarit',
    country: 'México',
    lat: '20.96698',
    long: '-105.34629799999999',
    result_type: 'terminal',
    popularity: '0.00',
    sort_criteria: 0.3,
  },
  {
    id: 137,
    slug: 'morelia',
    city_slug: 'morelia',
    display: 'Morelia',
    ascii_display: 'morelia',
    city_name: 'Morelia',
    city_ascii_name: 'morelia',
    state: 'Michoacán',
    country: 'México',
    lat: '19.7059504',
    long: '-101.1949825',
    result_type: 'city',
    popularity: '0.231327735336827',
    sort_criteria: 0.2925311179765887,
  },
  {
    id: 9160,
    slug: 'mlu',
    city_slug: 'monroe-ny',
    display: 'Monroe Rgnl',
    ascii_display: 'Monroe Rgnl',
    city_name: 'Monroe',
    city_ascii_name: 'monroe',
    state: 'New York',
    country: 'United States',
    lat: '32.510864',
    long: '-92.037689',
    result_type: 'airport',
    popularity: '0.00',
    sort_criteria: 0.22499999999999998,
  },
  {
    id: 1494,
    slug: 'monroe',
    city_slug: 'monroe',
    display: 'Monroe',
    ascii_display: 'monroe',
    city_name: 'Monroe',
    city_ascii_name: 'monroe',
    state: 'Georgia',
    country: 'United States',
    lat: '33.7948364',
    long: '-83.713229',
    result_type: 'city',
    popularity: '0',
    sort_criteria: 0.22499999999999998,
  },
  {
    id: 4621,
    slug: 'monroe-ia',
    city_slug: 'monroe-ia',
    display: 'Monroe',
    ascii_display: 'monroe',
    city_name: 'Monroe',
    city_ascii_name: 'monroe',
    state: 'Iowa',
    country: 'United States',
    lat: '41.5208256',
    long: '-93.1038129',
    result_type: 'city',
    popularity: '0',
    sort_criteria: 0.22499999999999998,
  },
  {
    id: 3253,
    slug: 'monroe-la',
    city_slug: 'monroe-la',
    display: 'Monroe',
    ascii_display: 'monroe',
    city_name: 'Monroe',
    city_ascii_name: 'monroe',
    state: 'Louisiana',
    country: 'United States',
    lat: '32.5093109',
    long: '-92.1193012',
    result_type: 'city',
    popularity: '0',
    sort_criteria: 0.22499999999999998,
  },
  {
    id: 7928,
    slug: 'monroe-nc',
    city_slug: 'monroe-nc',
    display: 'Monroe',
    ascii_display: 'monroe',
    city_name: 'Monroe',
    city_ascii_name: 'monroe',
    state: 'North Carolina',
    country: 'United States',
    lat: '34.9854275',
    long: '-80.5495112',
    result_type: 'city',
    popularity: '0',
    sort_criteria: 0.22499999999999998,
  },
  {
    id: 4980,
    slug: 'monroe-ny',
    city_slug: 'monroe-ny',
    display: 'Monroe',
    ascii_display: 'monroe',
    city_name: 'Monroe',
    city_ascii_name: 'monroe',
    state: 'New York',
    country: 'United States',
    lat: '41.3306493',
    long: '-74.1868135',
    result_type: 'city',
    popularity: '0',
    sort_criteria: 0.22499999999999998,
  },
  {
    id: 3305,
    slug: 'monroe-wa',
    city_slug: 'monroe-wa',
    display: 'Monroe',
    ascii_display: 'monroe',
    city_name: 'Monroe',
    city_ascii_name: 'monroe',
    state: 'Washington',
    country: 'United States',
    lat: '47.8553772',
    long: '-121.970958',
    result_type: 'city',
    popularity: '0',
    sort_criteria: 0.22499999999999998,
  },
  {
    id: 5622,
    slug: 't-monroe',
    city_slug: 'monroe',
    display: 'Monroe Terminal de Greyhound',
    ascii_display: 'monroe terminal de greyhound',
    city_name: 'Monroe',
    city_ascii_name: 'monroe',
    state: 'Georgia',
    country: 'United States',
    lat: '33.792',
    long: '-83.714',
    result_type: 'terminal',
    popularity: '0.00',
    sort_criteria: 0.22499999999999998,
  },
  {
    id: 6913,
    slug: 't-monroe-e',
    city_slug: 'monroe-nc',
    display: 'Monroe (e) Terminal de Greyhound',
    ascii_display: 'monroe (e) terminal de greyhound',
    city_name: 'Monroe',
    city_ascii_name: 'monroe',
    state: 'North Carolina',
    country: 'United States',
    lat: '34.997',
    long: '-80.56',
    result_type: 'terminal',
    popularity: '0.00',
    sort_criteria: 0.22499999999999998,
  },
  {
    id: 7198,
    slug: 't-monroe-ia',
    city_slug: 'monroe-ia',
    display: 'Monroe Terminal de Greyhound',
    ascii_display: 'monroe terminal de greyhound',
    city_name: 'Monroe',
    city_ascii_name: 'monroe',
    state: 'Iowa',
    country: 'United States',
    lat: '41.5208256',
    long: '-93.10381289999998',
    result_type: 'terminal',
    popularity: '0.00',
    sort_criteria: 0.22499999999999998,
  },
  {
    id: 6509,
    slug: 't-monroe-la',
    city_slug: 'monroe-la',
    display: 'Monroe Terminal de Greyhound',
    ascii_display: 'monroe terminal de greyhound',
    city_name: 'Monroe',
    city_ascii_name: 'monroe',
    state: 'Louisiana',
    country: 'United States',
    lat: '32.5093109',
    long: '-92.1193012',
    result_type: 'terminal',
    popularity: '0.00',
    sort_criteria: 0.22499999999999998,
  },
  {
    id: 11050,
    slug: 't-monroe-monroe',
    city_slug: 'monroe-la',
    display: 'Monroe Tornado',
    ascii_display: 'monroe tornado',
    city_name: 'Monroe',
    city_ascii_name: 'monroe',
    state: 'Louisiana',
    country: 'United States',
    lat: '32.4909659',
    long: '-92.05423410000003',
    result_type: 'terminal',
    popularity: '0.00',
    sort_criteria: 0.22499999999999998,
  },
  {
    id: 11610,
    slug: 't-monroe-monroe-nc',
    city_slug: 'monroe-nc',
    display: 'Monroe El Expreso',
    ascii_display: 'monroe el expreso',
    city_name: 'Monroe',
    city_ascii_name: 'monroe',
    state: 'North Carolina',
    country: 'United States',
    lat: null,
    long: null,
    result_type: 'terminal',
    popularity: '0.00',
    sort_criteria: 0.22499999999999998,
  },
  {
    id: 7379,
    slug: 't-monroe-ny',
    city_slug: 'monroe-ny',
    display: 'Monroe Terminal de Greyhound',
    ascii_display: 'monroe terminal de greyhound',
    city_name: 'Monroe',
    city_ascii_name: 'monroe',
    state: 'New York',
    country: 'United States',
    lat: '41.336',
    long: '-74.187',
    result_type: 'terminal',
    popularity: '0.00',
    sort_criteria: 0.22499999999999998,
  },
  {
    id: 7663,
    slug: 't-monroe-park-ride',
    city_slug: 'monroe-ny',
    display: 'Monroe Park & Ride Terminal de Greyhound',
    ascii_display: 'monroe park & ride terminal de greyhound',
    city_name: 'Monroe',
    city_ascii_name: 'monroe',
    state: 'New York',
    country: 'United States',
    lat: '41.336',
    long: '-74.187',
    result_type: 'terminal',
    popularity: '0.00',
    sort_criteria: 0.22499999999999998,
  },
  {
    id: 6535,
    slug: 't-monroe-wa',
    city_slug: 'monroe-wa',
    display: 'Monroe Terminal de Greyhound',
    ascii_display: 'monroe terminal de greyhound',
    city_name: 'Monroe',
    city_ascii_name: 'monroe',
    state: 'Washington',
    country: 'United States',
    lat: '47.857',
    long: '-121.963',
    result_type: 'terminal',
    popularity: '0.00',
    sort_criteria: 0.22499999999999998,
  },
  {
    id: 203,
    slug: 'moroleon',
    city_slug: 'moroleon',
    display: 'Moroleón',
    ascii_display: 'moroleon',
    city_name: 'Moroleón',
    city_ascii_name: 'moroleon',
    state: 'Guanajuato',
    country: 'México',
    lat: '20.1264558',
    long: '-101.1933423',
    result_type: 'city',
    popularity: '0.0218448134351916',
    sort_criteria: 0.188737932526634,
  },
  {
    id: 519,
    slug: 'monclova',
    city_slug: 'monclova',
    display: 'Monclova',
    ascii_display: 'monclova',
    city_name: 'Monclova',
    city_ascii_name: 'monclova',
    state: 'Coahuila',
    country: 'México',
    lat: '26.9080378',
    long: '-101.4215236',
    result_type: 'city',
    popularity: '0.0159732306332471',
    sort_criteria: 0.18638929940585622,
  },
  {
    id: 8934,
    slug: 'mty',
    city_slug: 'monterrey',
    display: 'General Mariano Escobedo Intl',
    ascii_display: 'General Mariano Escobedo Intl',
    city_name: 'Monterrey',
    city_ascii_name: 'monterrey',
    state: 'Nuevo León',
    country: 'México',
    lat: '25.778489',
    long: '-100.106878',
    result_type: 'airport',
    popularity: '0.05476671507039585',
    sort_criteria: 0.1855430366598722,
  },
  {
    id: 8903,
    slug: 'ntr',
    city_slug: 'monterrey',
    display: 'Del Norte Intl',
    ascii_display: 'Del Norte Intl',
    city_name: 'Monterrey',
    city_ascii_name: 'monterrey',
    state: 'Nuevo León',
    country: 'México',
    lat: '25.865572',
    long: '-100.237239',
    result_type: 'airport',
    popularity: '0.05476671507039585',
    sort_criteria: 0.1855430366598722,
  },
  {
    id: 7689,
    slug: 't-monterrey',
    city_slug: 'monterrey',
    display: 'Monterrey Terminal de Greyhound',
    ascii_display: 'monterrey terminal de greyhound',
    city_name: 'Monterrey',
    city_ascii_name: 'monterrey',
    state: 'Nuevo León',
    country: 'México',
    lat: '25.77',
    long: '-100.291',
    result_type: 'terminal',
    popularity: '0.05476671507039585',
    sort_criteria: 0.1855430366598722,
  },
  {
    id: 20,
    slug: 't-monterrey-aeropuerto',
    city_slug: 'monterrey',
    display: 'Aeropuerto Mariano Escobedo',
    ascii_display: 'aeropuerto mariano escobedo',
    city_name: 'Monterrey',
    city_ascii_name: 'monterrey',
    state: 'Nuevo León',
    country: 'México',
    lat: '25.777818',
    long: '-100.10798499999999',
    result_type: 'terminal',
    popularity: '0.05476671507039585',
    sort_criteria: 0.1855430366598722,
  },
  {
    id: 21,
    slug: 't-monterrey-aeropuerto-c',
    city_slug: 'monterrey',
    display: 'Aeropuerto Mariano Escobedo - Terminal C',
    ascii_display: 'aeropuerto mariano escobedo - terminal c',
    city_name: 'Monterrey',
    city_ascii_name: 'monterrey',
    state: 'Nuevo León',
    country: 'México',
    lat: '25.77965360991861',
    long: '-100.11856363235472',
    result_type: 'terminal',
    popularity: '0.05476671507039585',
    sort_criteria: 0.1855430366598722,
  },
  {
    id: 93,
    slug: 't-monterrey-central',
    city_slug: 'monterrey',
    display: 'Central de Autobuses',
    ascii_display: 'central de autobuses',
    city_name: 'Monterrey',
    city_ascii_name: 'monterrey',
    state: 'Nuevo León',
    country: 'México',
    lat: '25.687227325827884',
    long: '-100.31973062698364',
    result_type: 'terminal',
    popularity: '0.05476671507039585',
    sort_criteria: 0.1855430366598722,
  },
  {
    id: 94,
    slug: 't-monterrey-churubusco',
    city_slug: 'monterrey',
    display: 'Avenida Churubusco',
    ascii_display: 'avenida churubusco',
    city_name: 'Monterrey',
    city_ascii_name: 'monterrey',
    state: 'Nuevo León',
    country: 'México',
    lat: '25.684132123678957',
    long: '-100.26874316535952',
    result_type: 'terminal',
    popularity: '0.05476671507039585',
    sort_criteria: 0.1855430366598722,
  },
  {
    id: 1366,
    slug: 't-monterrey-monterrey',
    city_slug: 'monterrey',
    display: 'Sucursal Transpais - Central Autobuses ',
    ascii_display: 'sucursal transpais - central autobuses ',
    city_name: 'Monterrey',
    city_ascii_name: 'monterrey',
    state: 'Nuevo León',
    country: 'México',
    lat: '25.687938790062475',
    long: '-100.32178815427551',
    result_type: 'terminal',
    popularity: '0.05476671507039585',
    sort_criteria: 0.1855430366598722,
  },
  {
    id: 1367,
    slug: 't-monterrey-terminal-sur',
    city_slug: 'monterrey',
    display: 'Sucursal Transpais - Terminal Sur',
    ascii_display: 'sucursal transpais - terminal sur',
    city_name: 'Monterrey',
    city_ascii_name: 'monterrey',
    state: 'Nuevo León',
    country: 'México',
    lat: '25.6562124880458',
    long: '-100.29570947891239',
    result_type: 'terminal',
    popularity: '0.05476671507039585',
    sort_criteria: 0.1855430366598722,
  },
  {
    id: 204,
    slug: 't-moroleon-moroleon',
    city_slug: 'moroleon',
    display: 'Central de Autobuses',
    ascii_display: 'central de autobuses',
    city_name: 'Moroleón',
    city_ascii_name: 'moroleon',
    state: 'Guanajuato',
    country: 'México',
    lat: '20.122184499333414',
    long: '-101.17911586338505',
    result_type: 'terminal',
    popularity: '0.003276722015278740',
    sort_criteria: 0.18131069595866886,
  },
  {
    id: 678,
    slug: 't-moroleon-moroleon-odm',
    city_slug: 'moroleon',
    display: 'Sucursal Omnibus de Mexico',
    ascii_display: 'sucursal omnibus de mexico',
    city_name: 'Moroleón',
    city_ascii_name: 'moroleon',
    state: 'Guanajuato',
    country: 'México',
    lat: '20.128007139751716',
    long: '-101.18229159885868',
    result_type: 'terminal',
    popularity: '0.003276722015278740',
    sort_criteria: 0.18131069595866886,
  },
  {
    id: 8932,
    slug: 'lov',
    city_slug: 'monclova',
    display: 'Monclova Intl',
    ascii_display: 'Monclova Intl',
    city_name: 'Monclova',
    city_ascii_name: 'monclova',
    state: 'Coahuila',
    country: 'México',
    lat: '26.955733',
    long: '-101.470136',
    result_type: 'airport',
    popularity: '0.002395984594987065',
    sort_criteria: 0.1809584009905522,
  },
  {
    id: 520,
    slug: 't-monclova',
    city_slug: 'monclova',
    display: 'Central de autobuses',
    ascii_display: 'central de autobuses',
    city_name: 'Monclova',
    city_ascii_name: 'monclova',
    state: 'Coahuila',
    country: 'México',
    lat: '26.902517351154923',
    long: '-101.41993573226318',
    result_type: 'terminal',
    popularity: '0.002395984594987065',
    sort_criteria: 0.1809584009905522,
  },
  {
    id: 7711,
    slug: 'monterey',
    city_slug: 'monterey',
    display: 'Monterey',
    ascii_display: 'monterey',
    city_name: 'Monterey',
    city_ascii_name: 'monterey',
    state: 'California',
    country: 'United States',
    lat: '36.6002378',
    long: '-121.8946761',
    result_type: 'city',
    popularity: '0.000505082391565124',
    sort_criteria: 0.18020204010918342,
  },
  {
    id: 4039,
    slug: 'el-monte',
    city_slug: 'el-monte',
    display: 'El Monte',
    ascii_display: 'el monte',
    city_name: 'El Monte',
    city_ascii_name: 'el monte',
    state: 'California',
    country: 'United States',
    lat: '34.0686206',
    long: '-118.0275667',
    result_type: 'city',
    popularity: '0.000252541195782562',
    sort_criteria: 0.1801010236308704,
  },
  {
    id: 9269,
    slug: 'mry',
    city_slug: 'monterey',
    display: 'Monterey Peninsula',
    ascii_display: 'Monterey Peninsula',
    city_name: 'Monterey',
    city_ascii_name: 'monterey',
    state: 'California',
    country: 'United States',
    lat: '36.587',
    long: '-121.842944',
    result_type: 'airport',
    popularity: '0.00007576235873476860',
    sort_criteria: 0.18003031209605128,
  },
  {
    id: 7326,
    slug: 't-monterey-e',
    city_slug: 'monterey',
    display: 'Monterey (e) Terminal de Greyhound',
    ascii_display: 'monterey (e) terminal de greyhound',
    city_name: 'Monterey',
    city_ascii_name: 'monterey',
    state: 'California',
    country: 'United States',
    lat: '36.6002378',
    long: '-121.89467609999997',
    result_type: 'terminal',
    popularity: '0.00007576235873476860',
    sort_criteria: 0.18003031209605128,
  },
  {
    id: 6343,
    slug: 't-monterey-pr-bolio-gate-e',
    city_slug: 'monterey',
    display: 'Monterey Pr Bolio Gate (e Terminal de Greyhound',
    ascii_display: 'monterey pr bolio gate (e terminal de greyhound',
    city_name: 'Monterey',
    city_ascii_name: 'monterey',
    state: 'California',
    country: 'United States',
    lat: '36.622',
    long: '-121.915',
    result_type: 'terminal',
    popularity: '0.00007576235873476860',
    sort_criteria: 0.18003031209605128,
  },
  {
    id: 5697,
    slug: 't-monterey-presidio-e',
    city_slug: 'monterey',
    display: 'Monterey Presidio (e) Terminal de Greyhound',
    ascii_display: 'monterey presidio (e) terminal de greyhound',
    city_name: 'Monterey',
    city_ascii_name: 'monterey',
    state: 'California',
    country: 'United States',
    lat: '36.604',
    long: '-121.911',
    result_type: 'terminal',
    popularity: '0.00007576235873476860',
    sort_criteria: 0.18003031209605128,
  },
  {
    id: 6342,
    slug: 't-monterey-price-fit-ctr-e',
    city_slug: 'monterey',
    display: 'Monterey Price Fit Ctr (e Terminal de Greyhound',
    ascii_display: 'monterey price fit ctr (e terminal de greyhound',
    city_name: 'Monterey',
    city_ascii_name: 'monterey',
    state: 'California',
    country: 'United States',
    lat: '36.6002378',
    long: '-121.89467609999997',
    result_type: 'terminal',
    popularity: '0.00007576235873476860',
    sort_criteria: 0.18003031209605128,
  },
  {
    id: 6906,
    slug: 't-el-monte',
    city_slug: 'el-monte',
    display: 'El Monte Terminal de Greyhound',
    ascii_display: 'el monte terminal de greyhound',
    city_name: 'El Monte',
    city_ascii_name: 'el monte',
    state: 'California',
    country: 'United States',
    lat: '34.0686206',
    long: '-118.02756669999997',
    result_type: 'terminal',
    popularity: '0.00003788117936738430',
    sort_criteria: 0.18001515962430434,
  },
  {
    id: 3883,
    slug: 'mccammon',
    city_slug: 'mccammon',
    display: 'Mccammon',
    ascii_display: 'mccammon',
    city_name: 'Mccammon',
    city_ascii_name: 'mccammon',
    state: 'Idaho',
    country: 'United States',
    lat: '42.6504719',
    long: '-112.1930226',
    result_type: 'city',
    popularity: '0',
    sort_criteria: 0.18000000715255737,
  },
  {
    id: 3841,
    slug: 'monmouth',
    city_slug: 'monmouth',
    display: 'Monmouth',
    ascii_display: 'monmouth',
    city_name: 'Monmouth',
    city_ascii_name: 'monmouth',
    state: 'Illinois',
    country: 'United States',
    lat: '40.9114271',
    long: '-90.6473576',
    result_type: 'city',
    popularity: '0',
    sort_criteria: 0.18000000715255737,
  },
  {
    id: 11333,
    slug: 'monterey-tn',
    city_slug: 'monterey-tn',
    display: 'Monterey',
    ascii_display: 'monterey',
    city_name: 'Monterey',
    city_ascii_name: 'monterey',
    state: 'Tennessee',
    country: 'United States',
    lat: '36.1475642',
    long: '-85.2683021',
    result_type: 'city',
    popularity: '0',
    sort_criteria: 0.18000000715255737,
  },
  {
    id: 3381,
    slug: 'montrose',
    city_slug: 'montrose',
    display: 'Montrose',
    ascii_display: 'montrose',
    city_name: 'Montrose',
    city_ascii_name: 'montrose',
    state: 'Colorado',
    country: 'United States',
    lat: '38.4783198',
    long: '-107.8761738',
    result_type: 'city',
    popularity: '0',
    sort_criteria: 0.18000000715255737,
  },
  {
    id: 9725,
    slug: 'mtj',
    city_slug: 'montrose',
    display: 'Montrose Regional Airport',
    ascii_display: 'Montrose Regional Airport',
    city_name: 'Montrose',
    city_ascii_name: 'montrose',
    state: 'Colorado',
    country: 'United States',
    lat: '38.509794',
    long: '-107.894242',
    result_type: 'airport',
    popularity: '0.00',
    sort_criteria: 0.18000000715255737,
  },
  {
    id: 6827,
    slug: 't-mccammon',
    city_slug: 'mccammon',
    display: 'Mccammon Terminal de Greyhound',
    ascii_display: 'mccammon terminal de greyhound',
    city_name: 'Mccammon',
    city_ascii_name: 'mccammon',
    state: 'Idaho',
    country: 'United States',
    lat: '42.644',
    long: '-112.197',
    result_type: 'terminal',
    popularity: '0.00',
    sort_criteria: 0.18000000715255737,
  },
  {
    id: 6806,
    slug: 't-monmouth',
    city_slug: 'monmouth',
    display: 'Monmouth Terminal de Greyhound',
    ascii_display: 'monmouth terminal de greyhound',
    city_name: 'Monmouth',
    city_ascii_name: 'monmouth',
    state: 'Illinois',
    country: 'United States',
    lat: '40.912',
    long: '-90.64400000000001',
    result_type: 'terminal',
    popularity: '0.00',
    sort_criteria: 0.18000000715255737,
  },
];

const WeatherApp = () => {
  const [city, setCity] = useState();
  const [search, setSearch] = useState('');
  const [weatherData, setWeatherData] = useState(infoFake);
  const [places, setPlaces] = useState(infoFakeDirections);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const apiKey = 'a5a47c18197737e8eeca634cd6acb581';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.long}&exclude=hourly&units=metric&appid=${apiKey}`,
      );
      setWeatherData(response.data);
      console.log('esto responde', response.data.daily);
      setError(null);
    } catch (err) {
      setError('Ciudad no encontrada');
      //setWeatherData(null);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  const fetchDestinations = async () => {
    try {
      const response = await axios.get(
        `https://search.reservamos.mx/api/v2/places?q=${search}`,
      );
      console.log('esto responde fetchDestinations', response.data);
      setPlaces(response.data);
    } catch (err) {
      console.log('errorFetchDestination', err);
      setError('Ciudad no encontrada');
      //setWeatherData(null);
    }
  };

  const selectCity = ({item}) => {
    setCity(item);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={{flex: 1, backgroundColor: 'lightblue'}}>
          <View
            style={{
              width: '80%',
              margin: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextInput
              style={styles.input}
              placeholder="Ingrese el nombre de la ciudad"
              value={search}
              onChangeText={text => setSearch(text)}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
              }}>
              <ButtonComponent
                onPress={() => setModalVisible(false)}
                typeButton="secondary">
                Cancelar
              </ButtonComponent>
              <ButtonComponent onPress={fetchDestinations}>
                Buscar Lugar
              </ButtonComponent>
            </View>
          </View>
          <FlatList
            data={places}
            contentContainerStyle={{
              backgroundColor: '#8fb3cc',
              width: '90%',
              alignSelf: 'center',
              paddingHorizontal: 5,
              paddingTop: 5,
            }}
            keyExtractor={item => JSON.stringify(item.id)}
            renderItem={({item}) => {
              return (
                <View style={{borderBottomWidth: 0.5, borderColor: 'white'}}>
                  <TouchableOpacity onPress={() => selectCity({item})}>
                    <TextComponent textFormat="textBody2">
                      {item.ascii_display}
                    </TextComponent>
                    <TextComponent textFormat="textBody">
                      {item.city_name}
                    </TextComponent>
                    <TextComponent textFormat="textBody2">
                      {item.country}
                    </TextComponent>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </Modal>
      <View
        style={{
          flexDirection: 'row',
          margin: 10,
          justifyContent: 'space-around',
          width: '100%',
        }}>
        <ButtonComponent onPress={() => setModalVisible(true)}>
          Buscar Lugar
        </ButtonComponent>
      </View>
      {weatherData && (
        <View>
          <View
            style={{
              marginVertical: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TextComponent textFormat="title2">{city?.city_name}</TextComponent>
            <TextComponent textFormat="title">
              {weatherData?.current.temp}°
            </TextComponent>
          </View>
          <View
            style={{
              backgroundColor: '#8fb3cc',
              width: '90%',
              borderRadius: 20,
            }}>
            <TextComponent textFormat="textBody2" style={{margin: 8}}>
              PRONOSTICO PARA 8 DIAS
            </TextComponent>
            {weatherData.daily.map(dayData => {
              const dateToShow = new Date(dayData.dt * 1000);
              const day = dateToShow.getDate();
              return (
                <View
                  style={styles.weatherContainer}>
                  <TextComponent
                    textFormat="textBody"
                    style={{textAlign: 'center'}}>
                    {day}
                  </TextComponent>
                  <View
                    style={{
                      backgroundColor: 'blue',
                      height: 20,
                      width: 20,
                    }}></View>
                  <TextComponent textFormat="textBody">
                    {dayData.temp.min}°
                  </TextComponent>
                  <View
                    style={{
                      height: 5,
                      width: '20%',
                      backgroundColor: 'blue',
                    }}></View>
                  <TextComponent textFormat="textBody">
                    {dayData.temp.max}°
                  </TextComponent>
                </View>
              );
            })}
          </View>
        </View>
      )}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  input: {
    height: 50,
    backgroundColor: '#dae8f1',
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
  },
  weatherInfo: {
    marginTop: 20,
  },
  error: {
    marginTop: 20,
    color: 'red',
  },
  button: {
    backgroundColor: '#a7c1cd',
    height: 40,
    width: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  weatherContainer: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderColor: 'white',
  },
});

export default WeatherApp;
