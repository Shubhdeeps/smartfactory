import { memo } from "react"
import {  Container, Dropdown, Navbar } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { primaryColor } from "../assets/colors"
import { setManager } from "../store/actionCreators/dataActions"

const Header = () => {
    const dispatch = useDispatch()
    const manager = useSelector(s => s.dataActions).manager
    return(<>
        <Navbar className="shadow-sm header_bar" sticky="top">
            <Container fluid className="d-flex justify-content-between align-items-center">
                <h4 className="app_title_logo" style={{color: primaryColor}} >Smart Factory</h4>
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        {manager ? 'Financial Manager' : "Operative Manager"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => dispatch(setManager(!manager))}>{!manager ? 'Financial Manager' : "Operative Manager"}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
        </Navbar>
        
        </> 
    )
}

export default memo(Header)