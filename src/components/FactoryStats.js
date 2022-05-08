
const FactoryStats = ({ factories, entity }) => {
    let totalIdleFactories = 0
    let totalOperativeFactories = 0
    let totalDismissedFactories = 0

    factories.forEach(x => {
        switch(x.status){
            case 'Idle':
                totalIdleFactories += 1
                break;
            case 'Dismissed':
                totalDismissedFactories += 1
                break;
            case 'Operative':
                totalOperativeFactories += 1
                break;
            default:
                break;
        }
    })
    return<div className="d-flex flex-wrap justify-content-around">
        <h6 className="me-2"> Total factories in {entity.toUpperCase()}: {factories.length}</h6>
        <h6 className="me-2"> Idle: {totalIdleFactories}</h6>
        <h6 className="me-2"> Operative: {totalOperativeFactories}</h6>
        <h6 className="me-2"> Dismissed: {totalDismissedFactories}</h6>
    </div>
}

export default FactoryStats