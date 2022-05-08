import { useState } from "react"
import { Alert, Spinner, Table } from "react-bootstrap"
import { useDispatch } from "react-redux"
import ModalView from "./modal/ModalView"
import { setRecentActivity } from "../store/actionCreators/dataActions"

const RenderTable = ({elements, setSelectedElement, entity, errorMessage, loadingData}) => {
    let headings
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)

    if(elements.length > 0){
        headings = Object.keys(elements[0]).map((key) => {
            key = key.charAt(0).toUpperCase() + key.slice(1)
            return key
        })
    }

    const handleClick = (element) => {
        setShow(true)
        dispatch(setSelectedElement(element))
        const recentElement ={
            ...element,
            entity
        }
        dispatch(setRecentActivity(recentElement))
    }
    const renderRow = (rowElement) => {
        return(<>
            {Object.keys(rowElement).map((key, index) => {
                if(key === 'id'){
                    return null
                }
                if(typeof(rowElement[key]) === 'object'){
                    return(<td  key={index}> {rowElement[key]['city']}, {rowElement[key]['country']} </td>)
                }
                return(<td key={key}> {rowElement[key]} </td>)
            })}
            </>
        )
    }
    
    return(
        <>
        {elements.length > 0 ? 
        <Table responsive>
            <thead>
                <tr>
                <th>#</th>
                {headings.map((key) => {
                    if(key === 'Id'){
                        return null
                    }
                    return<th key={key}>{key}</th>
                })}
                </tr>
            </thead>
            <tbody>
                {elements.map((data, index) => {
                    return(<tr key={data['id']} className='active ' onClick={() => handleClick(data)}>
                        <td>{index + 1}</td>
                        {renderRow(data)}
                    </tr>)
                })}
            </tbody>
        </Table>
        : <h5> No {entity.toLowerCase()} available</h5> }
        {errorMessage &&  <Alert variant='danger'>{errorMessage}</Alert>}
        {loadingData && <> Loading... <Spinner animation="border" /> </>}
        {show ? <ModalView setShow={setShow} entity={entity}  /> : ''}
        </>
    )
}
export default RenderTable