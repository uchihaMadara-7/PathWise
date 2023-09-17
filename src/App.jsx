import './Styles/App.css';
import Navbar from './UI Components/Navbar';
import * as Graph from './Components/Graph';
import * as Motion from './Components/NodeMotion';
import { useEffect, useState, useRef } from 'react';
import { animateVisitedOrder, animateShortestPath } from './UI Components/Animate';
import * as Cons from './Components/Constants';

const App = () => {

    /* handle to callback from window resize listener */
    const resizeHandle = () => {
        Motion.resetSource(setSource);
        Motion.resetDestination(setDestination);
        Graph.resetGraph(setGrid);
    }

    /*
      useEffect() works as ComponentDidMount() i.e. it will work the first time
      app is rendered. So this is a good place to initialise state
    */
    useEffect(() => {
        setSource(prev => {
            const newNode = Graph.floatingNode(Graph.START_NODE_TOP, Graph.START_NODE_LEFT);
            Motion.resetSource(setSource);
            return newNode;
        });

        setDestination(prev => {
            const newNode = Graph.floatingNode(Graph.FINISH_NODE_TOP, Graph.FINISH_NODE_LEFT);
            Motion.resetDestination(setDestination);
            return newNode;
        });

        setObstaclesMode(prev => {
            return false;
        })

        /* Add listener for window resize */
        window.addEventListener('resize', resizeHandle);

        return () => {
            /*
              remove listener for window resize
              This works same as ComponentWillUnmount()
            */
            window.removeEventListener('resize', resizeHandle);
        }

    }, []);

    /*
      grid as state to show the graph canvas, source and destination are floating (can be moved in screen)
      whenever the grid will be changed, the component will be re-rendered
    */
    const [grid, setGrid] = useState(Graph.updateGrid());
    const [source, setSource] = useState();
    const [destination, setDestination] = useState();
    const [obstaclesMode, setObstaclesMode] = useState();

    /*
      source and destination ref using useRef()
      This way we can access the source and destination elements easily
    */
    const source_ref = useRef();
    const destination_ref = useRef();

    /* To visualise the SSSP */
    const singeSourceShortestPath = (algoIndex) => {

        /* reset the graph before begining the algorithms */
        Graph.resetGraph(setGrid);
        const interval = Cons.pathAlgorithm[algoIndex].interval;
        const nodes_in_visited_order = Cons.pathAlgorithm[algoIndex].callback(source, destination);
        if (nodes_in_visited_order.length === 0) return;
        animateVisitedOrder(nodes_in_visited_order, interval, setGrid);

        const shortest_path = Graph.getShortestPath(destination);
        const extra_wait = nodes_in_visited_order.length * interval;
        if (shortest_path.length === 0) return;
        animateShortestPath(source, destination, shortest_path, extra_wait, setGrid);
    }

    return (
        <div>
            <Navbar
                pathFunction={singeSourceShortestPath}
                otherProps={{ obstaclesMode, setObstaclesMode }}
            />
            {/*
                Hard-coded source to be at location: row = 4 and col = 6
                Hard-coded destination to be at location: row = 15, col = 20
                Screen size should be greater than these location as of now
            */}
            <div
                id='source'
                ref={source_ref}
                className='source'
                onMouseDown={event => Motion.nodeStarted(event, source_ref, true)}
                onMouseUp={event => Motion.nodeStopped(source_ref, setSource, setGrid, true)}
            >
            </div>
            <div
                id='destination'
                ref={destination_ref}
                className='destination'
                onMouseDown={event => Motion.nodeStarted(event, destination_ref, false)}
                onMouseUp={event => Motion.nodeStopped(destination_ref, setDestination, setGrid, false)}
            >
            </div>
            <table id='grid' className='table-style'>
                <tbody>{grid}</tbody>
            </table>
        </div>
    );
}

export default App;
