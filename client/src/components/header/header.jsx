import { HelpModal } from '../helpModal/helpModal';
import { SettingsModal } from '../settingsModal/settingsModal';

const Header = ({ mobile, updateMetric, metric, setGameMode, setAnimated }) => {
    const goHome = () => {
        setAnimated(false);
        setGameMode(null);
    }
    return (
        <div className='header'>
            <section>
                <SettingsModal
                    updateMetric={updateMetric}
                    mobile={mobile}
                    metric={metric}
                />
            </section>
            <div className='headerText' onClick={() => goHome()}>
                <h1 className='p'>P</h1>
                <img
                    className={`pokeball `}
                    src={require('../../static/pokeball.png')}
                    alt='pokeball'
                ></img>
                <section className='kedle'>
                    <h1>k</h1>
                    <h1>é</h1>
                    <h1>d</h1>
                    <h1>l</h1>
                    <h1>e</h1>
                </section>
            </div>

            <section>
                <HelpModal />
            </section>
        </div>
    )
}

export default Header
