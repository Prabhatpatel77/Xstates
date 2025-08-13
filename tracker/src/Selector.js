import axios from 'axios';
import styles from './selector.module.css'
import { useEffect, useState } from 'react';



export default function Selector(){
    const [countries,setCountries]=useState([]);
    const [states,setStates]=useState([]);
    const [cities,setCities]=useState([]);

    const [selectedCountry, setSelectedCountry]=useState("");
    const [selectedCity, setSelectedCity]=useState('');
    const [selectedState, setSelectedState]=useState('');




    useEffect(()=>{
        axios.get('https://crio-location-selector.onrender.com/countries')
        .then((res)=>setCountries(res.data))//data fetched and using countries state variable to update
        .catch((error)=>console.error("error fetching Country data",error))
        // fetch('https://crio-location-selector.onrender.com/countries')
        // .then((res)=>res.json())
        // .then((jsonres)=>setCountry(jsonres))
        // .catch((error)=>console.error("error fetching Country:",error))
    },[]);

    useEffect(()=>{
        if(selectedCountry){
            axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
            .then((res)=>{
                setStates(res.data);
                  setSelectedState("");
            setCities([]);
            setSelectedCity("");
            })
            .catch((error)=>console.error("error fetching state",error))
        }     
            
    },[selectedCountry])

    useEffect(()=>{
        if(selectedCountry && selectedState){
            axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
            .then((res)=>{
                setCities(res.data);
                setSelectedCity("");
            })
            .catch((error)=>console.error("error fetching city data",error))
        }
    },[selectedCountry, selectedState])


    return (
        <div>
            <h1>Select Location</h1>
           <div>
             <select value={selectedCountry}
             onChange={(e)=>setSelectedCountry(e.target.value)}
             className='countryDropdown'
             >
            <option value="" disabled>Select Country</option>
              {countries.map((country)=><option key={country} value={country}>{country}</option>)}                           
             </select> 
             {/* for Country select dropdown above */}

             <select value={selectedState}
             onChange={(e)=>setSelectedState(e.target.value)}
             disabled={!selectedCountry}
             className='statesDropdown'
             >
                <option value="" disabled>Select State</option>
                 {states.map((state)=><option key={state} value={state}>{state}</option>)}
            </select>
{/* select dropdown for selecting state */}


             <select
              value={selectedCity}
              onChange={((e)=>{
                setSelectedCity(e.target.value)
              })}
              disabled={!selectedState}
              className='Select City' 
              >
                <option value="" disabled>Select City</option>
                 {cities.map((city)=><option key={city} value={city}>{city}</option>)}
            </select>
             </div>

           <div className={styles.display}>
            {/* {selectedCity&&(
                <h2 className='display'>You Selected <span className={styles.country}>{selectedCountry}</span> <span className={styles.faded}>, {selectedState}, {selectedCity}</span></h2>
            )} */}
              {selectedCity&&(
                <h2 className='display'>You Selected <span>{selectedCountry}</span>,{selectedState},{selectedCity}</h2>
            )}
           </div>
        </div>

    )
}