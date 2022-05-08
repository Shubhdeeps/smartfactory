const FactoryStatus = ({statusRef, defaultChecked}) => {
    return(  <div className="mt-4 d-flex">
    <h6>Status: </h6>
    <div className="form-check ms-3">
        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
        onClick={() => statusRef.current = 'Idle'}
        defaultChecked={defaultChecked === 'IDLE'}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
            Idle
        </label>
    </div>
    <div className="form-check ms-3">
        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
        onClick={() => statusRef.current = 'Operative'}
        defaultChecked={defaultChecked === 'OPERATIVE'}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault2">
            Operative
        </label>
    </div>
    <div className="form-check ms-3">
        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3"
        onClick={() => statusRef.current = 'Dismissed'}
        defaultChecked={defaultChecked === 'DISMISSED'}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault3">
            Dismissed
        </label>
    </div>
</div>)
}

export default FactoryStatus