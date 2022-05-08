import { useRef, useState } from "react"
import { Container, Dropdown, DropdownButton } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import FactoryStatus from "../components/FactoryStatus"
import RenderFields from "../components/RenderFields"
import { setFactory } from "../store/actionCreators/factoryAction"
import uuid from 'react-uuid'

const NewFactory = () => {
    const statusRef = useRef('Idle')
    const [location, setLocation] = useState('')
    const allLocation = useSelector(s => s.locations).locations

    const emptyMessage = useRef(false)
    const dispatch = useDispatch()
    const [alert, setAlert] = useState('');
    const inputFieldClassName = 'input-field-new-factory'

    const handleClear = () => {
        setAlert('')
        const elements = document.getElementsByClassName(inputFieldClassName)
        Array.prototype.slice.call( elements ).forEach(element => {
            element.value = ''
        });
    }

    const handleClick = () => {
        const elements = document.getElementsByClassName(inputFieldClassName)
        emptyMessage.current = false
        //to check if any field is empty
        Array.prototype.slice.call( elements ).forEach(element => {
            if(element.value === ''){
                 emptyMessage.current = true
            }
        });
        
        //setAlert if any field is empty
        if(emptyMessage.current || !location){
            setAlert('All fields are required')
        }
        //if not empty then save all the data
        else{
            setAlert('')
            const inputValues = Array.prototype.slice.call( elements ).map(element => {
                const new_element = element.value
                element.value = ''
               return new_element
            })
            const factoryData = {
                name: inputValues[0],
                description: inputValues[1],
                lat: inputValues[2],
                lon: inputValues[3],
                status: statusRef.current,
                location,
                id: uuid()
            }
            dispatch(setFactory(factoryData))
        }
    }

    return(
    <Container>
        <RenderFields title="Name" placeholder="name"  cls={inputFieldClassName} />
        <RenderFields title="Description" placeholder="description"  cls={inputFieldClassName} />
        <RenderFields title="Latitude" placeholder="latitude"  cls={inputFieldClassName}  />
        <RenderFields title="Longitude" placeholder="longitude"  cls={inputFieldClassName}  />
        <FactoryStatus statusRef={statusRef} defaultChecked='IDLE'/>
        <DropdownButton
        variant="outline-secondary"
        title={location ? `${location.city}, ${location.country.toUpperCase()}` : 'Select a location'}
        className="mt-3"
        >
            {allLocation.map(loc => {
                if(loc['status'] === 'DEACTIVATED'){
                    return null
                }
                return <Dropdown.Item key={loc['id']} onClick={() => setLocation(loc)}> {loc.street}, {loc.city}, {loc.country.toUpperCase()} </Dropdown.Item>
            })}
        </DropdownButton>
        {alert && <> <br /> <div className="alert alert-danger" role="alert">
           {alert}
        </div> </> }
        <div className="mt-3">
            <button type="button" className="btn btn-danger me-2 ps-3 pe-3 mt-2" onClick={() => handleClear()}> Clear </button>
            <button className="btn btn-primary ps-3 pe-3 mt-2" onClick={() => handleClick()}>Save</button>
        </div>
    </Container>)
}


export default NewFactory