import { useRef, useState } from "react"
import { Container } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { setLocation } from "../store/actionCreators/locationAction"
import uuid from 'react-uuid'
import RenderFields from "../components/RenderFields"
import useValidateCountry from "../components/hooks/useValidateCountry"


const AddLocation = () => {
    const countryRef = useRef()
    const emptyMessage = useRef(false)
    const countryNameError = useRef(false)
    const [alert, setAlert] = useState('');
    const dispatch = useDispatch()
    const inputFieldClassName = 'input-field-cls'
    const validateCountry = useValidateCountry()

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
        countryNameError.current = false

       
        //to check if any field is empty
        Array.prototype.slice.call( elements ).forEach(element => {
            if(element.placeholder === 'country'){
                countryRef.current = element.value
            }
            if(element.value === ''){
                 emptyMessage.current = true
            }
        });

         //to validate country name
        if(!validateCountry(countryRef.current)){      
            countryNameError.current = true
        }
        //setAlert if any field is empty
        if(emptyMessage.current){
            setAlert(['All fields are required', 'alert-danger'])
        }
        else if(countryNameError.current){
            setAlert(['Country does not exist, please type a valid country name.', 'alert-danger'])
        }
        //if not empty then save all the data
        else{
            const inputValues = Array.prototype.slice.call( elements ).map(element => {
                const new_element = element.value
                element.value = ''
                return new_element
            })
            const location = {
                country: inputValues[0],
                city: inputValues[1],
                street: inputValues[2],
                zipCode: inputValues[3],
                status: 'ACTIVE',
                id: uuid()
            }
            dispatch(setLocation(location))
            setAlert(['Location added successfully', 'alert-success'])
        }

    }

    return(
    <Container>
        <RenderFields title="Country" placeholder="country" cls={inputFieldClassName} />
        <RenderFields title="City" placeholder="city" cls={inputFieldClassName} />
        <RenderFields title="Street" placeholder="street" cls={inputFieldClassName} />
        <RenderFields title="Zip Code" placeholder="zip code" cls={inputFieldClassName}  />
        {alert && <> <br /> <div className={`alert ${alert[1]}`} role="alert">
           {alert[0]}
        </div> </> }
        <div className="mt-3">
            <button type="button" className="btn btn-danger me-2 ps-3 pe-3 mt-2" onClick={() => handleClear()}> Clear </button>
            <button className="btn btn-primary ps-3 pe-3 mt-2" onClick={() => handleClick()}>Save</button>
        </div>
    </Container>)
}




export default AddLocation

