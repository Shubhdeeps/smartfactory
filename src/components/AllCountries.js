import React from "react"
import {  useSelector } from "react-redux"
import { selectedZones } from "../assets/colors"
import { worldMap } from "./World"



const AllCountries = ({ setIsSelected }) => {
    const handleClick = (name) => {
        setIsSelected(name)
    }
    const locations = useSelector(s => s.locations).locations

    return(
        <svg className="mt-5" viewBox="0 0 950 620" fill="none">
    <g>
      {worldMap.props.children.map(country => {
        let fillColor = '#E0E0E0'
        let new_country
        const selected_countries = locations.map(items => {
            
            if(items['country'].toLowerCase() === 'united states of america' || items['country'].toLowerCase() === 'america'){
                return 'usa'
            }
            if(items['country'].toLowerCase() === 'england' || items['country'].toLowerCase() === 'great britain' || items['country'].toLowerCase() === 'scotland' ||  items['country'].toLowerCase() === 'ireland' || items['country'].toLowerCase() === 'wales' || items['country'].toLowerCase() === 'northern ireland'){
                return 'britain'
            }
            return items['country'].toLowerCase()
        })
        if(selected_countries.includes(country.props.id)){
            new_country = {...country, props: {...country.props, fill: selectedZones, onClick: () => handleClick(country.props.id)}}
        }else{
            new_country = {...country, props: {...country.props, fill: fillColor}}
        }
        return(<React.Fragment key={country.props.id}>
            {new_country}
        </React.Fragment>)
    })}
    </g>
    </svg>
    )
}

export default AllCountries