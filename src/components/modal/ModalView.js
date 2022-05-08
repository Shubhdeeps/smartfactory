import FactoryModal from "./FactoryModal"
import LocationModal from "./LocationModal"


const ModalView = ({setShow, entity}) => {

    return(<>
    {entity === 'LOCATION' && <LocationModal setShow={setShow} />}
    {entity === 'FACTORY' && <FactoryModal setShow={setShow} />}
    {}
    </>
    )
}

export default ModalView