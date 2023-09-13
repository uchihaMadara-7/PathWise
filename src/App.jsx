import './Styles/App.css';
import Navbar from './UI Components/Navbar';
import * as Graph from './Components/Graph';
import * as Motion from './Components/NodeMotion';
import { useEffect, useState, useRef } from 'react';
import BFS from './Algorithms/BFS';

const App = () => {

    /*
      useEffect() works as ComponentDidMount() i.e. it will work the first time
      app is rendered. So this is a good place to initialise state
    */
    useEffect(() => {
        setGrid(prev => {
            return Graph.updateGrid();
        });

        setSource(prev => {
            return Graph.floatingNode(Graph.START_NODE_X, Graph.START_NODE_Y);
        });

        setDestination(prev => {
            return Graph.floatingNode(Graph.FINISH_NODE_X, Graph.FINISH_NODE_Y);
        });

    }, []);

    /*
      grid as state to show the graph canvas, source and destination are floating (can be moved in screen)
      whenever the grid will be changed, the component will be re-rendered
    */
    const [grid, setGrid] = useState();
    const [source, setSource] = useState();
    const [destination, setDestination] = useState();

    /*
      source and destination ref using useRef()
      This way we can access the source and destination elements easily
    */
    const source_ref = useRef();
    const destination_ref = useRef();

    /* To visualise the SSSP */
    const singeSourceShortestPath = () => {
        console.log("Request for SSSP!");
        BFS(source, destination);
    }

    return (
        <div>
            <Navbar pathFunction={singeSourceShortestPath} />
            {/*
                Hard-coded source to be at location: row = 4 and col = 6
                Hard-coded destination to be at location: row = 15, col = 20
                Screen size should be greater than these location as of now
            */}
            <div
                ref={source_ref}
                className='source'
                onMouseDown={event => Motion.nodeStarted(event, source_ref, true)}
                onMouseUp={event => Motion.nodeStopped(event, source_ref, true)}
            >
            </div>
            <div
                ref={destination_ref}
                className='destination'
                onMouseDown={event => Motion.nodeStarted(event, destination_ref, false)}
                onMouseUp={event => Motion.nodeStopped(event, destination_ref, false)}
            >
            </div>
            <table className='table-style'>
                <tbody>{grid}</tbody>
            </table>
        </div>
    );
}

export default App;
