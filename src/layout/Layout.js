import { memo } from "react"
import { Container } from "react-bootstrap"
import { primaryColor } from "../assets/colors"
import Header from "./Header"
import MiniSideBar from "./MiniSideBar"
import SideBar from "./SideBar"


const Layout = ({children, title}) => {
    const windowWidth = window.innerWidth
    return(
        <>
        <Header />
        {
            windowWidth < 800 ? 
            <MiniSideBar>{children}</MiniSideBar> :
            <>
            <SideBar />
            <div className="body__content">
                <Container className="mt-5 lg">
                    <h2 style={{color: primaryColor}}>{title}</h2>
                    <hr />
                    {children} 
                </Container>
            </div>
            </>
        }
           
        </>
    )
}

export default memo(Layout)