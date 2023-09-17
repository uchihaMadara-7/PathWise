import '../Styles/Navbar.css';
import '../Styles/Button.css';
import '../Styles/Text.css';
import { toggleMode } from '../UI Components/Obstacles';
import * as Cons from '../Components/Constants';

const Navbar = ({ pathFunction, otherProps }) => {

    const { obstaclesMode, setObstaclesMode } = otherProps;

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
                <li className="navbar-item">
                    <button className='button' onClick={() => pathFunction(Cons.DIJKSTRA)}>Visualise Dijkstra</button>
                </li>
                <li>
                    <button className='button' onClick={() => toggleMode(obstaclesMode, setObstaclesMode)}>
                        {obstaclesMode ? 'Disable Obstacles' : 'Enable Obstacles'}
                    </button>
                </li>
                {/* Add more navigation items here if needed */}
            </ul>
        </div >
    </nav >);
}

export default Navbar;
