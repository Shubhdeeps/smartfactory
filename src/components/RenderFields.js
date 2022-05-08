const RenderFields = ({title, placeholder, cls}) => {

return(<div className="d-flex flex-column align-items-start mt-4">
        <h6>{title}</h6>
        <div className="border rounded-3 p-1 ps-2 width-70">
        <input
        className={cls}
        placeholder={placeholder}
        />
        </div>
    </div>)
}

export default RenderFields