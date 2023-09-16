import '../Styles/Navbar.css';
import '../Styles/Button.css';
import '../Styles/Text.css';
import * as Cons from '../Components/Constants';

const Navbar = ({ pathFunction, otherProps }) => {

    const { obstaclesMode, setObstaclesMode } = otherProps;

    /* function to toggle the obstacles mode based on prev state */
    const toggleMode = () => {
        setObstaclesMode((prev) => {
            return !prev;
        })
    }

    return (<nav className='navbar'>
        <div className='navbar-container'>
            <div className="head">
                <h1>PathWise
                    <span>Shortest Path Visualiser</span>
                </h1>
            </div>
            <ul className='navbar-menu'>
                <li className='navbar-item'>
                    <button className='button' onClick={() => pathFunction(Cons.BREADTH_FIRST_SEARCH)}>Visualise BFS</button>
                </li>
                <li className="navbar-item">
                    <button className='button' onClick={() => pathFunction(Cons.DEPTH_FIRST_SEARCH)}>Visualise DFS</button>
                </li>
                <li>
                    <button className='button' onClick={toggleMode}>
                        {obstaclesMode ? 'Disable Obstacles' : 'Enable Obstacles'}
                    </button>
                </li>
                {/* Add more navigation items here if needed */}
            </ul>
        </div >
    </nav >);
}

export default Navbar;
