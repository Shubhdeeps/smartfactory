import React, { memo, useState } from "react"
import { Form } from "react-bootstrap"

const RenderModalField = ({title, value, refer}) => {

    const [currentValue, setCurrentValue] = useState(value)
    
    const handleChanged = (val) => {
        setCurrentValue(val)
        refer.current = val
    }

    return(
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label> {title} </Form.Label>
        <Form.Control
            type="text"
            placeholder={title}
            value={currentValue}
            onChange={(e) => handleChanged(e.target.value)}
        />
        </Form.Group>)
}
export default memo(RenderModalField)