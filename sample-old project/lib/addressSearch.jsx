import React, { Component } from 'react'
import { withRouter, useHistory } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import './addressSearchStyles.scss'
import AuthService from '../auth/AuthService'
import { apiBaseURI } from '../config' // api URI
import { indMobRegExp } from '../utils/regexHelper.jsx'
import loading from '../assets/loader.gif'

//const API_KEY = process.env.REACT_APP_GMAPS_API_KEY

const Auth = new AuthService();
const orgID = localStorage.getItem('kit_id');
class AddressSearch extends Component {
  // Define Constructor
  constructor(props) {
    super(props);
    this.state = {
      showMap: this.props.mode=='edit' ? true : false,
      err: '',
      address: '',
      addressLine: '',
      destLat: this.props.mode=='edit' ? this.props.preFilled4Edit.latlng.lat : '',  // destination lat
      destLng: this.props.mode=='edit' ? this.props.preFilled4Edit.latlng.lng : '',  // destination lng
      searchInputEmpty: true,
      mode: this.props.mode=='edit' ? 'edit' : 'add'
    };
  }
  componentDidMount=()=>{
    //set origin latlng and delivery radius here
    this.handleScriptLoad()
    if(this.props.mode=='edit') this.initMap(this.props.preFilled4Edit.latlng)
  }
  handleScriptLoad = () => {
    /* Declare Options For Autocomplete
    const defaultOrigin = new google.maps.LatLng(this.state.originLat, this.state.originLng)
    console.log(defaultOrigin) */

    const options = {
      //origin: defaultOrigin,
      componentRestrictions : { country: "IN" },
      //types: ['geocode'],
    };
    // Initialize Google Autocomplete    
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options,
    )
    // Avoid paying for data that you don't need by limiting the set of place fields that are returned to just the address components and formatted address.
    this.autocomplete.setFields(['geometry.location']) //['address_components', 'formatted_address']
    // Fire Event when a suggested name is selected
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect)
  }  
  handlePlaceSelect = () => {
    // Extract Address From Address Object
    const addressObject = this.autocomplete.getPlace()
    //const address = addressObject.address_components
    const location = addressObject.geometry.location
    
    if (location) { // Check if address is valid
      this.setState( prevState => ({
        ...prevState.state,
        destLat: location.lat(),
        destLng: location.lng(),
        showMap: true
      }))
      //this.calculateDistance()
      let latlng = {lat: this.state.destLat, lng: this.state.destLng};
      this.initMap(latlng)
    }
    else{
      this.setState({err: 50}) // 50 = 'ERROR'
    }
  }
  initMap = (latlng) => {
    // The location of latlng
    let _this = this;    

    // The map, centered at latlng
    this.map = new google.maps.Map(
      document.getElementById('map'), {zoom: 16, center: latlng});

    // The marker, positioned at latlng
    this.marker = new google.maps.Marker({
      position: latlng, 
      map: this.map, 
      title: 'Select your location',
      draggable: true,
      animation: google.maps.Animation.DROP,
    });
    this.markerPos = this.marker.getPosition()
    this.geocoder = new google.maps.Geocoder()
    google.maps.event.addListener(this.marker, 'dragend', function (evt) {
      _this.setState({destLat: evt.latLng.lat(),  destLng: evt.latLng.lng()})
      _this.calculateDistance()
      _this.geocoder.geocode({
        'location': evt.latLng,
        region: 'IN'
      }, _this.geocodeFxn );
    });
    this.geocoder.geocode({
      'location': latlng,
      region: 'IN'
    }, this.geocodeFxn )
  }
  geocodeFxn = (results, status) => {
    let _this = this
    if (status === 'OK') {
      if (results[0]) {
        //console.log(results)
        let addLocator = results[0].address_components
        //console.log(addLocator)
        _this.setState( prevState => ({
          ...prevState.state, address: results[0].formatted_address, address_components: addLocator
        }))
        for (let i in addLocator){
          //console.log(addLocator[i])
          for (let j in addLocator[i].types) {
            let addLocType = addLocator[i].types[j]
            //console.log(addLocType)        
            switch(addLocType){
              case 'postal_code' :
                this.setState({postal: addLocator[i].long_name})
                break
              case 'country' :
                this.setState({countryCode: addLocator[i].short_name})
                break
              case 'administrative_area_level_1' :
                this.setState({state: addLocator[i].long_name})
                break
              case 'locality' :
                this.setState({city: addLocator[i].long_name})
                break
            }
          }
        }            
        let addLineArr = this.state.address.split(", ")
        let cityIndex = addLineArr.indexOf(this.state.city)
        let addLine1 = addLineArr.slice(0, cityIndex)
        let addressLine = addLine1.join(', ')
        console.log(this.state.address, addLineArr, this.state.city, cityIndex, addLine1, addressLine)
        _this.setState(prevState=>({
          ...prevState.state, addressLine: addressLine
        }))
      }
      else {
        window.alert('No results found for your location. Try searching manually');
      }
    } 
    else {
      window.alert('Geocoding your location failed due to: ' + status);
    }
  }
  callbackFxn = (predictions, status) => {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
      console.log(status)
      return
    }
    predictions.forEach(function(prediction) {
      console.log(prediction, prediction.description)
    })
  }
  fetchCurrentLocation = () => {
    console.log('fetching gps')
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition, this.showGPSError); //watchPosition()
      //this.setState({err: 0}) // 0 = 'NO_ERROR'
    } 
    else {
      console.log("Geolocation is not supported by this browser.")
      this.setState({err: 10, showMap: false}) // 10 = 'Geolocation is not supported by this browser.'
    }
  }
  showPosition = (position) => {
    let _this = this
    console.log("Latitude: ", position.coords.latitude)
    console.log("Longitude: ", position.coords.longitude)
    console.log("Accuracy: ", position.coords.accuracy)
    this.setState( prevState => ({
      ...prevState.state, destLat: position.coords.latitude, destLng: position.coords.longitude, showMap: true
    }))
    let latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
    this.initMap(latlng);
  }
  showGPSError = (error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.")
        this.setState({err: 20, showMap: false}) // 20 = "PERMISSION_DENIED"
        break
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.")
        this.setState({err: 30, showMap: false}) // 30 = 'POSITION_UNAVAILABLE'
        break
      case error.TIMEOUT:
        console.log("The request to get user location timed out.")
        this.setState({err: 40, showMap: false}) // 40 = 'TIMEOUT'
        break
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.")
        this.setState({err: 50, showMap: false}) // 50 = 'UNKNOWN_ERROR'
        break
    }
  }
  
  calculateDistance = () => { 
    /*
    * Haversine Formula : https://stackoverflow.com/questions/1502590/calculate-distance-between-two-points-in-google-maps-v3
    * https://ourcodeworld.com/articles/read/1021/how-to-calculate-the-distance-between-2-markers-coordinates-in-google-maps-with-javascript  
    */
    console.log('calculating distance...')
    let rad = function(x) {
      return x * Math.PI / 180;
    };
    
    const {originLat, originLng, destLat, destLng, deliveryRange} = this.state
    let getDistance = function() {
      let R = 6378137; // Earth’s mean radius in meter
      let dLat = rad(destLat - originLat)
      let dLng = rad(destLng - originLng)
      let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(originLat)) * Math.cos(rad(destLat)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let d = R * c;
      return d/1000; // returns the distance in km
    };
    const distance = Math.round(getDistance())
    console.log('your distance: ',distance, 'deliveryRange: ',deliveryRange)
    if (distance <= deliveryRange) {
      this.setState({err: 0, delivery: 'YES'}) // 0 = 'NO_ERROR'
    }
    else {
      this.setState({err: 100, delivery: 'NO'}) // 100 = 'NO_DELIVERY'
    }
    //console.log(this.state.err)
    return distance
  }

  clearSearchInput = () => {
    document.getElementById('autocomplete').value = ""
    this.setState(prevState =>({
      ...prevState.state, searchInputEmpty: true
    }))
  }

  checkInputEmpty = (e) =>{
    if (e.target.value !== "") {
      this.setState(prevState =>({
        ...prevState.state, searchInputEmpty: false
      }))
    }
  }
  
  render() {
    return (
      <div>        
        
      </div>
    );
  }
}

export default withRouter(AddressSearch);