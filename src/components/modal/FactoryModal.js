import { Button, Dropdown, DropdownButton, Form, Modal } from "react-bootstrap"
import React, {useRef, useState} from 'react'
import RenderModalFields from "./RenderModalFields"
import { useDispatch, useSelector } from "react-redux"
import FactoryStatus from "../FactoryStatus"
import { updateFactory } from "../../store/actionCreators/factoryAction"
import { setRecentActivity } from "../../store/actionCreators/dataActions"

const FactoryModal = ({setShow}) => {
    const singleFactory = useSelector(s => s.factories).single_factory
    const allLocation = useSelector(s => s.locations).locations 

    const nameRef = useRef(singleFactory['name'])
    const descriptionRef = useRef(singleFactory['description'])
    const latRef = useRef(singleFactory['lat'])
    const lonRef = useRef(singleFactory['lon'])
    const statusRef = useRef(singleFactory['status'])
    const [factoryLocation, setFactoryLocation] = useState(singleFactory['location'])
    const dispatch = useDispatch()

    
    const handleSave = () => {
        setShow(false)
        const newElement = {
            location: factoryLocation,
            description: descriptionRef.current,
            lat: latRef.current,
            lon: lonRef.current,
            name: nameRef.current,
            status: statusRef.current,
            id: singleFactory['id'],
        }
        dispatch(updateFactory(newElement))
        dispatch(setRecentActivity({...newElement, entity: 'FACTORY'}))

    }

    return(
        <Modal show={true} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Edit Factory</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <RenderModalFields title='Name' value={singleFactory['name']} refer={nameRef} />
                <RenderModalFields title='Description' value={singleFactory['description']} refer={descriptionRef} />
                <RenderModalFields title='Latitude' value={singleFactory['lat']} refer={latRef} />
                <RenderModalFields title='Longitude' value={singleFactory['lon']} refer={lonRef} />
                <FactoryStatus statusRef={statusRef} defaultChecked={singleFactory['status'].toUpperCase()}/>
                <DropdownButton
                variant="outline-secondary"
                title={`${factoryLocation.city}, ${factoryLocation.country.toUpperCase()}`}
                className="mt-3"
                >
                    {allLocation.map(loc => {
                        return <Dropdown.Item key={loc['id']} onClick={() => setFactoryLocation(loc)}> {loc.city}, {loc.country.toUpperCase()} </Dropdown.Item>
                    })}
                </DropdownButton>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
                Close
            </Button>
            <Button variant="primary" onClick={() => handleSave()}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    )
}


export default FactoryModal






