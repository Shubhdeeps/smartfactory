
import { memo, useState } from "react"
import { Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { activeBackground, activeFont, navbarColor, primaryColor } from "../assets/colors"
import { setNavItem } from "../store/actionCreators/navActions"
import { setSelectedLocation } from "../store/actionCreators/locationAction"
import { setSelectedFactory } from "../store/actionCreators/factoryAction"
import ModalView from "../components/modal/ModalView"
const navItems = [{
    name: 'Dashboard',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_16_1944" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    <rect width="24" height="24" fill="#C4C4C4"/>
    </mask>
    <g mask="url(#mask0_16_1944)">
    <path d="M3 11V3H11V11H3ZM3 21V13H11V21H3ZM13 11V3H21V11H13ZM13 21V13H21V21H13ZM5 9H9V5H5V9ZM15 9H19V5H15V9ZM15 19H19V15H15V19ZM5 19H9V15H5V19Z" fill="#344563"/>
    </g>
</svg>
    
},
{
    name: 'New factory',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.1501 23V19.975H15.1501V18.475H18.1501V15.475H19.6501V18.475H22.6501V19.975H19.6501V23H18.1501ZM2.6001 19.975V13.55H1.3501V12.05L2.4501 7H17.5001L18.6251 12.175V13.55H17.4001V17.725H15.9001V13.55H10.5001V19.975H2.6001ZM4.1001 18.475H9.0001V13.55H4.1001V18.475ZM2.8501 12.05H17.1501H2.8501ZM2.4501 5.5V4H17.5251V5.5H2.4501ZM2.8501 12.05H17.1501L16.3751 8.5H3.6251L2.8501 12.05Z" fill="#344563"/>
    </svg>    
    
    
},
{
    name: 'Edit factories',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_16_1941" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    <rect width="24" height="24" fill="#C4C4C4"/>
    </mask>
    <g mask="url(#mask0_16_1941)">
    <path d="M11 20V17.875L16.3 12.575L18.425 14.7L13.125 20H11ZM19.125 14L17 11.875L17.725 11.15C17.925 10.95 18.1627 10.85 18.438 10.85C18.7127 10.85 18.9417 10.95 19.125 11.15L19.85 11.875C20.05 12.0583 20.15 12.2873 20.15 12.562C20.15 12.8373 20.05 13.075 19.85 13.275L19.125 14ZM6 8C5.45 8 4.97933 7.804 4.588 7.412C4.196 7.02067 4 6.55 4 6C4 5.45 4.196 4.97933 4.588 4.588C4.97933 4.196 5.45 4 6 4C6.55 4 7.02067 4.196 7.412 4.588C7.804 4.97933 8 5.45 8 6C8 6.55 7.804 7.02067 7.412 7.412C7.02067 7.804 6.55 8 6 8ZM6 20C5.45 20 4.97933 19.8043 4.588 19.413C4.196 19.021 4 18.55 4 18C4 17.45 4.196 16.979 4.588 16.587C4.97933 16.1957 5.45 16 6 16C6.55 16 7.02067 16.1957 7.412 16.587C7.804 16.979 8 17.45 8 18C8 18.55 7.804 19.021 7.412 19.413C7.02067 19.8043 6.55 20 6 20ZM6 14C5.45 14 4.97933 13.804 4.588 13.412C4.196 13.0207 4 12.55 4 12C4 11.45 4.196 10.979 4.588 10.587C4.97933 10.1957 5.45 10 6 10C6.55 10 7.02067 10.1957 7.412 10.587C7.804 10.979 8 11.45 8 12C8 12.55 7.804 13.0207 7.412 13.412C7.02067 13.804 6.55 14 6 14ZM12 14C11.45 14 10.9793 13.804 10.588 13.412C10.196 13.0207 10 12.55 10 12C10 11.45 10.196 10.979 10.588 10.587C10.9793 10.1957 11.45 10 12 10C12.55 10 13.021 10.1957 13.413 10.587C13.8043 10.979 14 11.45 14 12L12 14ZM18 8C17.45 8 16.979 7.804 16.587 7.412C16.1957 7.02067 16 6.55 16 6C16 5.45 16.1957 4.97933 16.587 4.588C16.979 4.196 17.45 4 18 4C18.55 4 19.021 4.196 19.413 4.588C19.8043 4.97933 20 5.45 20 6C20 6.55 19.8043 7.02067 19.413 7.412C19.021 7.804 18.55 8 18 8ZM12 8C11.45 8 10.9793 7.804 10.588 7.412C10.196 7.02067 10 6.55 10 6C10 5.45 10.196 4.97933 10.588 4.588C10.9793 4.196 11.45 4 12 4C12.55 4 13.021 4.196 13.413 4.588C13.8043 4.97933 14 5.45 14 6C14 6.55 13.8043 7.02067 13.413 7.412C13.021 7.804 12.55 8 12 8Z" fill="#344563"/>
    </g>
    </svg>
    
},
{
    name: 'Locations',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_16_1950" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    <rect width="24" height="24" fill="#C4C4C4"/>
    </mask>
    <g mask="url(#mask0_16_1950)">
    <path d="M8.5 13.5H9.95L13.85 9.575L12.425 8.15L8.5 12.05V13.5ZM14.575 8.85L15.275 8.15C15.3583 8.06667 15.4 7.979 15.4 7.887C15.4 7.79567 15.3583 7.70833 15.275 7.625L14.375 6.725C14.2917 6.64167 14.2043 6.6 14.113 6.6C14.021 6.6 13.9333 6.64167 13.85 6.725L13.15 7.425L14.575 8.85ZM12 19.35C14.0333 17.4833 15.5417 15.7873 16.525 14.262C17.5083 12.7373 18 11.3833 18 10.2C18 8.38333 17.4207 6.89567 16.262 5.737C15.104 4.579 13.6833 4 12 4C10.3167 4 8.89567 4.579 7.737 5.737C6.579 6.89567 6 8.38333 6 10.2C6 11.3833 6.49167 12.7373 7.475 14.262C8.45833 15.7873 9.96667 17.4833 12 19.35ZM12 22C9.31667 19.7167 7.31267 17.5957 5.988 15.637C4.66267 13.679 4 11.8667 4 10.2C4 7.7 4.80433 5.70833 6.413 4.225C8.021 2.74167 9.88333 2 12 2C14.1167 2 15.979 2.74167 17.587 4.225C19.1957 5.70833 20 7.7 20 10.2C20 11.8667 19.3377 13.679 18.013 15.637C16.6877 17.5957 14.6833 19.7167 12 22Z" fill="#344563"/>
    </g>
    </svg>
    
},
{
    name: 'Add location',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_16_1954" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    <rect width="24" height="24" fill="#C4C4C4"/>
    </mask>
    <g mask="url(#mask0_16_1954)">
    <path d="M18 8H20V5H23V3H20V0H18V3H15V5H18V8ZM12 12C12.55 12 13.021 11.804 13.413 11.412C13.8043 11.0207 14 10.55 14 10C14 9.45 13.8043 8.979 13.413 8.587C13.021 8.19567 12.55 8 12 8C11.45 8 10.9793 8.19567 10.588 8.587C10.196 8.979 10 9.45 10 10C10 10.55 10.196 11.0207 10.588 11.412C10.9793 11.804 11.45 12 12 12ZM12 22C9.31667 19.7167 7.31267 17.5957 5.988 15.637C4.66267 13.679 4 11.8667 4 10.2C4 7.7 4.80433 5.70833 6.413 4.225C8.021 2.74167 9.88333 2 12 2C12.1667 2 12.3333 2.004 12.5 2.012C12.6667 2.02067 12.8333 2.03333 13 2.05V4.075C12.8333 4.04167 12.6707 4.02067 12.512 4.012C12.354 4.004 12.1833 4 12 4C10.3167 4 8.89567 4.579 7.737 5.737C6.579 6.89567 6 8.38333 6 10.2C6 11.3833 6.49167 12.7373 7.475 14.262C8.45833 15.7873 9.96667 17.4833 12 19.35C14.0333 17.4833 15.5417 15.7873 16.525 14.262C17.5083 12.7373 18 11.3833 18 10.2C18 10.1667 18 10.1333 18 10.1C18 10.0667 18 10.0333 18 10H20C20 10.0333 20 10.0667 20 10.1C20 10.1333 20 10.1667 20 10.2C20 11.8667 19.3377 13.679 18.013 15.637C16.6877 17.5957 14.6833 19.7167 12 22Z" fill="#344563"/>
    </g>
    </svg>
    
},
]


const SideBar = () => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [entity, setEntity] = useState('')
    const selectedItem = useSelector(s => s.navbar)
    let navigate = useNavigate()
    const recentItems = useSelector(s => s.selectedElements).recent
    const handleClick = (name) => {
        const navTo = name.replace(/\s/g, '').toLowerCase()
        dispatch(setNavItem(name))
        navigate(`/${navTo}`, { replace: true });
    }
    const handleShow = (item, entity) => {
        if(entity === 'LOCATION'){
            dispatch(setSelectedLocation(item))
        }
        else if(entity === 'FACTORY'){
            dispatch(setSelectedFactory(item))
        }
        setEntity(entity)
        setShow(true)
    }
    return( 
        <Container className="Side__bar pt-4 border-end" style={{background: navbarColor, zIndex: 2}}>
            {navItems.map(x => {
                return(
                <div key={x.name} 
                className='d-flex pt-3 justify-content-end align-items-center nav-items rounded-2 ps-2 border-bottom scale_me' 
                onClick={() => handleClick(x.name)}
                style={x.name === selectedItem.item ? {background: activeBackground} : {background: 'none'}}
                >
                    <p style={x.name !== selectedItem.item ? {color: primaryColor} : {color: activeFont}} className="me-2">{x.name}</p> 
                    <p> {x.icon} </p>
                    </div>)
            })}
            <div className="mt-4">
                <h5 style={{fontSize: '12px'}}>RECENTLY VIEWED</h5>
                <ul className="list-group ">
                    {recentItems.slice(0,7).map(item => {
                        return(
                            <div className="border mb-2 active" key={item.id} onClick={() => handleShow(item, item['entity'])}>
                                {item['entity'] === 'LOCATION' && 
                                <li>{item['city']}, {item['country']}</li> }
                                {
                                    item['entity'] === 'FACTORY' && 
                                    <li>{item['name']}</li>
                                }
                                <h5 style={{fontSize: '10px'}}>{item.entity}</h5> 
                            </div>
                        )
                    })}
                    
                </ul>
            </div>
            {show && <ModalView setShow={setShow} entity={entity} />}
        </Container>
    )
}

export default memo(SideBar)