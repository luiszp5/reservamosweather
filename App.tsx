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

const WeatherApp = () => {
  const [city, setCity] = useState();
  const [search, setSearch] = useState('');
  const [weatherData, setWeatherData] = useState();
  const [places, setPlaces] = useState();
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
