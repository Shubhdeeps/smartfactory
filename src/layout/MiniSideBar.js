import { memo } from "react"
import { Container, Tab, Tabs } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { setNavItem } from "../store/actionCreators/navActions"


const navItems = [ 'Dashboard','New factory','Edit factories','Locations','Add location']

const MiniSideBar = ({children}) => {
    const dispatch = useDispatch()
    const selectedItem = useSelector(s => s.navbar)
    let navigate = useNavigate()

    const handleClick = (name) => {
        const navTo = name.replace(/\s/g, '').toLowerCase()
        dispatch(setNavItem(name))
        navigate(`/${navTo}`, { replace: true });
    }

    return(
        <>
        <br />
            <Tabs 
            defaultActiveKey={selectedItem.item} 
            className="mb-3"
            onSelect={(k) => handleClick(k)}
            >
              <Tab  eventKey={navItems[0]} title={navItems[0]}>
              </Tab>
              <Tab  eventKey={navItems[1]} title={navItems[1]}>
              </Tab>
              <Tab  eventKey={navItems[2]} title={navItems[2]}>
              </Tab>
              <Tab  eventKey={navItems[3]} title={navItems[3]}>
              </Tab>
              <Tab  eventKey={navItems[4]} title={navItems[4]}>
              </Tab>
            </Tabs>
            <div className="mini_body_content">
                <Container>
                    {children}
                </Container>
            </div>
        </>
    )
}


export default memo(MiniSideBar)