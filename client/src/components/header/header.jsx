import Modal from '../Modal/Modal'

const Header = ({ mobile, updateMetric, reset }) => {
    return (
        <div className='header'>
            {/* <button onClick= b{() => reset()}>reset</button> */}
            {mobile && <Modal updateMetric={updateMetric} reset={reset} /> }

            <h1 className='p'>P</h1>
            <img
                className='pokeball'
                src={require('../../static/pokeball.png')}
            ></img>
            <section className='kedle'>
                <h1>k</h1>
                <h1>e</h1>
                <h1>d</h1>
                <h1>l</h1>
                <h1>e</h1>
            </section>
        </div>
    )
}

export default Header
