import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView, Dimensions } from 'react-native';
import React, { useEffect, useState } from "react"
import * as Location from 'expo-location';
// import { GOOGLE_MAP_API } from "@env";
import Constants from 'expo-constants';

const { width: SCREEN_WIDTH, height } = Dimensions.get("window");

const App = () => {
  const [number, setNumber] = useState(0);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [permitted, setPermitted] = useState(true);

  const [city, setCity] = useState(null);

  const googleMapApiKey = Constants.expoConfig.extra.googleMapApiKey;  

  const locationData = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
  
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      setPermitted(false); 
      return;
    }

    try {
      let { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ accuracy: 5 });
      
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleMapApiKey}`
  
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data.results[7].formatted_address);
      const cityAddress = data.results[7].address_components[0].short_name;
      setCity(cityAddress);
    } catch (error) {
      setErrorMsg('Error fetching location: ' + error.message);
      console.error(error);
    }
  }

  useEffect(() => {
    locationData();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.cityContainer}>
        <Text style={styles.city}>{city}</Text>
      </View>
      <View style={styles.regDataContainer}>
        <Text style={styles.regData}>4월 23일. 일</Text>
      </View>
      <ScrollView 
        horizontal 
        contentContainerStyle={styles.weather}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.weatherInner}>
          <View style={styles.day}>
            <Text style={styles.desc}>맑음</Text>
          </View>
          <View style={styles.tempContainer}>  
            <Text style={styles.temp}>25</Text>
          </View>
        </View> 
        <View style={styles.weatherInner}>
          <View style={styles.day}>
            <Text style={styles.desc}>맑음</Text>
          </View>
          <View style={styles.tempContainer}>  
            <Text style={styles.temp}>25</Text>
          </View>
        </View>
        <View style={styles.weatherInner}>
          <View style={styles.day}>
            <Text style={styles.desc}>맑음</Text>
          </View>
          <View style={styles.tempContainer}>  
            <Text style={styles.temp}>25</Text>
          </View>
        </View>
        <View style={styles.weatherInner}>
          <View style={styles.day}>
            <Text style={styles.desc}>맑음</Text>
          </View>
          <View style={styles.tempContainer}>  
            <Text style={styles.temp}>25</Text>
          </View>
        </View>
        <View style={styles.weatherInner}>
          <View style={styles.day}>
            <Text style={styles.desc}>맑음</Text>
          </View>
          <View style={styles.tempContainer}>  
            <Text style={styles.temp}>25</Text>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe01a",
  },
  cityContainer: {
    flex: 0.2, 
  },
  city: {
    flex: 1, 
    paddingTop: 50,
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold"
  },
  weatherInner: {
    flex: 3,
    width: SCREEN_WIDTH,
  },
  day: {
    flex: 0.2,
    alignItems : "center",
    justifyContent: "center", 
    fontSize: 30,
    fontWeight: "bold"
  },
  regDataContainer: {
    alignItems: "center",
    justifyContent: "center "
  },
  regData: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 15,
    backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
    borderRadius: 20,
    overflow: "hidden",
  },
  desc: {
    flex: 1.5,
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold"
  },
  tempContainer: { 
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
  }, 
  temp: {
    fontSize: 110
  } 
});

export default App;