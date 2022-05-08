import { Button, Form, Modal } from "react-bootstrap"
import React, {useRef, useState} from 'react'
import RenderModalFields from "./RenderModalFields"
import {  useDispatch, useSelector } from "react-redux"
import { updateLocation } from "../../store/actionCreators/locationAction"
import useValidateCountry from "../hooks/useValidateCountry"
import { setRecentActivity } from "../../store/actionCreators/dataActions"


const LocationModal = ({setShow}) => {
    const single_location = useSelector(s => s.locations).single_location
    const countryRef = useRef(single_location['country'])
    const cityRef = useRef(single_location['city'])
    const zipRef = useRef(single_location['zipCode'])
    const streetRef = useRef(single_location['street'])
    const dispatch = useDispatch()
    const [alert, setAlert] = useState('')
    const [status, setStatus] = useState(single_location['status'])
    const validateCountry = useValidateCountry()
    
    const handleDeactivate = () => {
        if(status === 'ACTIVE'){
            setStatus('DEACTIVATED')
        }else{
            setStatus('ACTIVE')
        }
    }

    const handleSave = () => {
        if(countryRef.current && cityRef.current && zipRef.current && streetRef.current){
            if(validateCountry(countryRef.current)){
            const newElement = {
                country: countryRef.current,
                city: cityRef.current,
                street: streetRef.current,
                zipCode: zipRef.current,
                status: status,
                id: single_location['id']
            }
            dispatch(updateLocation(newElement))
            dispatch(setRecentActivity({...newElement, entity: 'LOCATION'}))
            setShow(false)
            }else{
            setAlert('Invalid country name.')
            }
        }
        else{
            setAlert('All fields required.')
        }
    }

    return(
        <Modal show={true} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Edit Location</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <RenderModalFields title='Country' value={single_location['country']} refer={countryRef} />
                <RenderModalFields title='City' value={single_location['city']} refer={cityRef} />
                <RenderModalFields title='Zip Code' value={single_location['zipCode']} refer={zipRef} />
                <RenderModalFields title='Street' value={single_location['street']} refer={streetRef} />
            </Form>
            {alert && <div className="alert alert-danger"> {alert} </div>}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
                Close
            </Button>
            <Button variant="primary" onClick={() => handleSave()}>
                Save Changes
            </Button>
            </Modal.Footer>
            <Button variant={status === 'ACTIVE' ? 'success' : 'danger'} onClick={() => handleDeactivate()}>
               {status}
            </Button>
        </Modal>
    )
}


export default LocationModal