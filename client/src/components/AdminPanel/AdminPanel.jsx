import './AdminPanel.css'

const AdminPanel = (props) => {

    const {setAdminDisplay, buttons} = props;

    const minimise = () => {
        setAdminDisplay(false)
    }

    return (
        <div className='admin-panel'>
            <button className="minimise" onClick={() => minimise()}>-</button>
            <div className="button-box">
                {buttons.map(btn => {
                    return <button onClick={() => btn[1]()}>{btn[0]}</button>
                })}
            </div>
        </div>
    )
}

export default AdminPanel