import '../Styles/Navbar.css';
import '../Styles/Button.css';
import '../Styles/Text.css';

const Navbar = ({ pathFunction }) => {

    return (<nav className='navbar'>
        <div className='navbar-container'>
            <div className="head">
                <h1>PathWise
                    <span>Shortest Path Visualiser</span>
                </h1>
            </div>
            <ul className='navbar-menu'>
                <li className='navbar-item'>
                    <button className='button' onClick={pathFunction}>Visualise BFS</button>
                </li>
                <li className="navbar-item">
                    <button className='button'>Visualise DFS</button>
                </li>
                {/* Add more navigation items here if needed */}
            </ul>
        </div>
    </nav>);
}

export default Navbar;
