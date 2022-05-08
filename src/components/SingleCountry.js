import React from "react"
import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import RenderTable from "./RenderTable"
import { setSelectedFactory } from "../store/actionCreators/factoryAction"
import FactoryStats from "./FactoryStats"
import { worldMap } from "./World"


const SingleCountry = ({name, setIsSelected}) => {
    const factories = useSelector(s => s.factories).factories
    const factoriesAtSelectLocation = factories.filter(factory => {
        return factory['location']['country'].toLowerCase() === name.toLowerCase()
    })
    const path = worldMap.props.children.find(x => {
        return (x.props.id === name.toLowerCase())
    })
    return(
    <>
        <Container>
            <FactoryStats factories={factoriesAtSelectLocation} entity={name} />
            <br />
            <button className="btn-outline-secondary btn-sm btn" onClick={() => setIsSelected('')}>All Countries</button>
            <br />
            <br />
            <RenderTable elements={factoriesAtSelectLocation} setSelectedElement={setSelectedFactory} entity="FACTORY" />
        </Container>
        <div className='svg-single-country'>
        <svg className="mt-5" viewBox="0 0 900 620" fill="red">
        <g>
            {path}
       </g>
        </svg>
        </div>
    </>
    )
}

export default SingleCountry