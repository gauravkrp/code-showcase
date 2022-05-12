import React, { Component } from 'react'
import { Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Select from 'react-select'
import { indPinCode } from '../utils/regexHelper' // Regex Helpers

const debug = true

class AddressFields extends Component{
  constructor(props) {
    super(props);
    this.state = {
      stateList: [],          // list of states only
      stateCity: '',          // all states with their corres cities
      selectedState: '',      // selected state in dropdown
      citiesToLoad: []        // cities of selected state
    };
  }

  handleMyState(opt) {
    console.log(opt.value);
    let citiesList = [];
    Object.keys(this.state.stateCity).forEach((key) => { //loop through keys array
      if (key === opt.value) {
        this.state.stateCity[key].map((cityName, j) => {
          citiesList.push(cityName);
      })}
    })
    this.setState({
      selectedState: opt.value,
      citiesToLoad: citiesList
    })
  }

  componentDidMount() {
    let stateLi = [];      
    fetch(`_json/stateCity.json`)
      .then(response => {
        return response.json()
      }).then(data => {
        for (let key in data){
          if(data.hasOwnProperty(key)){
            stateLi.push(key)
          }
        }
        this.setState({ stateCity: data, stateList: stateLi })
      }).catch(err => {
        console.log("Error Reading data from json " + err) // Doing something for error here
      })
  }

  render() {
    const { selectedState, stateList, citiesToLoad } = this.state;
    const newStateList = stateList.map(item => ({ label: item, value: item })); // for select element
    const newCitiesToLoad = citiesToLoad.map(item => ({ label: item, value: item })); // for select element
    const { values, touched, errors, handleChange, setFieldValue, setFieldTouched } = this.props;
    return(
      <div id='addressFieldBox'>
        
      </div>
    )
  }

}

export default AddressFields;