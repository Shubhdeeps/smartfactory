import { useEffect, useRef, useState } from "react"
import { Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import RenderTable from "../components/RenderTable"
import { setSelectedFactory } from "../store/actionCreators/factoryAction"

const EditFactories = () => {
    const factories = useSelector(s => s.factories).factories
    const actionData = useSelector(s => s.dataActions)
    const [shortlistLocation, setShortListLocation] = useState(factories)
    const ref = useRef(null)


    // to update the table values + clear input field
    useEffect(() => {
        setShortListLocation(factories)
        if(ref){
            ref.current.value = ''
        }
    }, [factories])

    const handleChange = (value) => {
        const elements = factories.filter(x => {
            return( x.name.toLowerCase().match(value.toLowerCase()))
        })
        setShortListLocation(elements)
    }


    return<>
        <Form.Control
        ref={ref}
        onChange={(e) => handleChange(e.target.value)}
        size="sm" type="text" placeholder="Search a factory name" />
        <RenderTable 
        elements={shortlistLocation} 
        setSelectedElement={setSelectedFactory} 
        entity='FACTORY' 
        errorMessage={actionData.factoryError}
        loadingData={actionData.factoryLoading}
        />
    </>
}


export default EditFactories