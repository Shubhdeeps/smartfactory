import { useEffect, useRef, useState } from "react"
import { Dropdown, DropdownButton, Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import RenderTable from "../components/RenderTable"
import { setSelectedLocation } from "../store/actionCreators/locationAction"

const Locations = () => {
    const locations = useSelector(s => s.locations).locations
    const actionData = useSelector(s => s.dataActions)
    const [shortlistLocation, setShortListLocation] = useState(locations)
    const [searchParam, setSearchParam] = useState('country')
    const ref = useRef(null)


    // to update the table values + clear input field
    useEffect(() => {
        setShortListLocation(locations)
        if(ref){
            ref.current.value = ''
        }
    }, [locations])

    const handleChange = (value) => {
        const elements = locations.filter(x => {
            return( x[searchParam].toLowerCase().match(value.toLowerCase()))
        })
        setShortListLocation(elements)
    }
    return <>
        <div className="d-flex">
       <Form.Control
            ref={ref}
            className="me-1"
            onChange={(e) => handleChange(e.target.value)}
            type="text" placeholder={`Search a ${searchParam ?  searchParam : 'country'}`} />
        <DropdownButton
        variant="outline-secondary"
        title={searchParam}
        id="input-group-dropdown-1"
        >
        <Dropdown.Item onClick={() => setSearchParam("country")}>Country</Dropdown.Item>
        <Dropdown.Item onClick={() => setSearchParam("city")}>City</Dropdown.Item>
        <Dropdown.Item onClick={() => setSearchParam("street")}>Street</Dropdown.Item>
        <Dropdown.Item onClick={() => setSearchParam("zipCode")}>Zip Code</Dropdown.Item>
        </DropdownButton>
        </div>
        <RenderTable 
        elements={shortlistLocation} 
        setSelectedElement={setSelectedLocation} 
        entity="LOCATION"  
        errorMessage={actionData.locationError}
        loadingData={actionData.locationLoading}
        />
    </>
}


export default Locations