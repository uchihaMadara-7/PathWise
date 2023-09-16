import * as Graph from '../Components/Graph';

/* animate the visited nodes using setState */
export const animateVisitedOrder = (nodes_in_visited_order, interval, setGrid) => {
    for (let i = 0; i < nodes_in_visited_order.length; ++i) {
        const current = nodes_in_visited_order[i];

        /*
          setTimeout will make sure we animate in order
          Every state update will happen after (i*20)ms back to back
        */
        setTimeout(() => {
            Graph.markNodeAsPath(current);
            setGrid(Graph.updateGrid());
            Graph.markNodeVisited(current);
            Graph.unMarkNodeAsPath(current)
        }, (i * interval));
    }
}

/* animate the shortest path using setState */
export const animateShortestPath = (source, destination, shortest_path, extra_wait, setGrid) => {
    /* Initial set state in-case nodes are next to each other */
    setTimeout(() => {
        setGrid(Graph.updateGrid());
        /* this fill the direction of each node based on the previous and next-node */
        Graph.findDirection(source, destination, shortest_path);
    }, extra_wait);

    extra_wait = extra_wait + 20;
    for (let i = 0; i < shortest_path.length; ++i) {
        const current = shortest_path[i];

        /*
        setTimeout will make sure we animate in order
        Every state update will happen after (i*20)ms + extra_wait back to back
        */
        setTimeout(() => {
            Graph.markNodeAsPath(current);
            setGrid(Graph.updateGrid());
        }, extra_wait + (i * 20));
    }
}