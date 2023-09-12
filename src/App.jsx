import './Styles/App.css';
import Navbar from './UI Components/Navbar';
import * as Graph from './Components/Graph';
import { useEffect, useState } from 'react';

const App = () => {

    /*
      useEffect() works as ComponentDidMount() i.e. it will work the first time
      app is rendered. So this is a good place to initialise state
    */
    useEffect(() => {
        setGrid(prev => {
            return Graph.updateGrid();
        });
    }, []);

    /*
      grid as state to show the graph canvas, source and dest are floating (can be moved in screen)
      whenever the grid will be changed, the component will be re-rendered
    */
    const [grid, setGrid] = useState();
    //const [source, setSource] = useState(Graph.floatingNode(Graph.START_NODE_X, Graph.START_NODE_Y));
    //const [dest, setDest] = useState(Graph.floatingNode(Graph.FINISH_NODE_X, Graph.FINISH_NODE_Y));

    return (
        <div>
            <Navbar />
            <table className='table-style'>
                <tbody>{grid}</tbody>
            </table>
        </div>
    );
}

export default App;
