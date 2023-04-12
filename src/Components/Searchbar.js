import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiHeader,GEOAPI_URL } from "../api";

const Searchbar = ({onSearchChange}) => {
    const [search, setSearch] = useState(null);

    const handleOnChange = (searchData) =>{
        setSearch(searchData);
        onSearchChange(searchData);
    }
    const loadOptions = (inputValue) => {
        return fetch(`${GEOAPI_URL}/cities?minPopulation=10000&namePrefix=${inputValue}`,geoApiHeader)
            .then((response) => response.json())
            .then((response) => {
            return {
                options: response.data.map((city) =>{
                    return{
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name} - ${city.countryCode}`,
                    }
                })
                
                }
            })
            .catch((error) => console.log(error));
    }
    return(
        <AsyncPaginate
        placeholder="Város keresése"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        
        />
    )
}

export default Searchbar;