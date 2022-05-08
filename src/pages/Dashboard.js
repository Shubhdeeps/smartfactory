import React, { useState } from "react"
import { useSelector } from "react-redux"
import AllCountries from "../components/AllCountries"
import FactoryStats from "../components/FactoryStats"
import SingleCountry from "../components/SingleCountry"


const Dashboard = () => {
    const [isSelected, setIsSelected] = useState('')
    const allFactories = useSelector(s => s.factories).factories

    return(<>
    
    {isSelected === '' ?
    <> 
     <FactoryStats factories={allFactories} entity="world" />
     <AllCountries setIsSelected={setIsSelected} />
     </>
     : <SingleCountry name={isSelected} setIsSelected={setIsSelected} /> }
    </>)
}

export default Dashboard