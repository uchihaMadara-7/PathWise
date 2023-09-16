import * as Cons from './Constants';


export const START_NODE_TOP = 5;
export const START_NODE_LEFT = 5;
export const FINISH_NODE_TOP = 10;
export const FINISH_NODE_LEFT = 10;

/*
  Border is actually 1px which merge with neighbour to form 2px
  And considering both sides, total of 4px
*/
const BORDER_WIDTH = 4

/* A single box in grid is (40px * 40px) in size */
export const GRID_BOX_SIZE = 40

/* Total size of grid box is 40px + 4px */
export const GRID_BOX = GRID_BOX_SIZE + BORDER_WIDTH
export const NAVBAR_HEIGHT_PX = 106;
export const NAVBAR_HEIGHT = parseInt(NAVBAR_HEIGHT_PX / GRID_BOX);

/* Since the size of each grid box is 40px = 4px of border and 40px of box */
export let graph_row = parseInt((window.innerHeight - NAVBAR_HEIGHT_PX) / GRID_BOX);
export let graph_col = parseInt(window.innerWidth / GRID_BOX);

/* classNames can be used dynamically using this */
const classNames = (classes) => {
    return Object.entries(classes)
        .filter(([key, value]) => value)
        .map(([key, value]) => key)
        .join(' ');
}

/* Node for the graph with row index and column index */
export const Node = (rowId, colId) => {
    return {
        rowId,
        colId
    }
}

/* Node for graph with row index, column index, and x and y denoting pixels */
export const floatingNode = (rowId, colId) => {

    const cell_element = document.getElementById(rowId * graph_col + colId)
    if (!cell_element) return;

    /* Snap to closes cell if the element is out of bounds i.e. cell is null */
    const cell = cell_element.getBoundingClientRect();

    /* Logic for centering the source/destination to the center of the cell under-neath it */
    const cell_centre = {
        top: cell.top + (GRID_BOX / 2),
        left: cell.left + (GRID_BOX / 2),
    };

    const newNode = {
        top: cell_centre.top - (GRID_BOX_SIZE / 2),
        left: cell_centre.left - (GRID_BOX_SIZE / 2),
    };

    return {
        rowId,
        colId,
        /*
          top and left are pixels to render the start and finish node from top and left resp.
          44px is the size of each grid box and 9px to center on the grid box
        */
        top: newNode.top,
        left: newNode.left,
    }
}

/* Short way to find the neighbour nodes */
export const neighbour = [Node(0, -1), Node(-1, 0), Node(0, 1), Node(1, 0)];

/*
  This is the actual graph node with row index, column index,
  parent_node -> pointing to its parent in shortest path
  distance -> distance from source node, default is Infinity
  is_visited_node -> boolean to denote if this node was visited during search
  is_path_node -> boolean to denote if this node is part of shortest path
*/
export const GraphNode = (rowId, colId) => {
    return {
        rowId,
        colId,
        parent_node: Node(-1, -1),
        distance: Infinity,
        direction: -1,
        is_visited_node: false,
        is_path_node: false,
    }
}

/* Function to create a graph of row * col size */
export const createGraph = (row, col) => {
    const graph = [];
    for (let r = 0; r < row; ++r) {
        let rows_array = [];
        for (let c = 0; c < col; ++c) {
            rows_array.push(GraphNode(r, c));
        }
        graph.push(rows_array);
    }
    return graph;
}

/* Create the graph */
export let graph = createGraph(graph_row, graph_col);

/* Check if node is inside the bounds */
export const isValidNode = (node) => {
    if (node.rowId >= 0 && node.rowId < graph_row &&
        node.colId >= 0 && node.colId < graph_col) return true;
    return false;
}

/* Check if the node is visited */
export const isVisitedNode = (node) => {
    return graph[node.rowId][node.colId].is_visited_node;
}

/* updates the distance using its neighbour */
export const updateDistance = (current, nextNode) => {
    graph[nextNode.rowId][nextNode.colId].distance = graph[current.rowId][current.colId].distance + 1;
}

/* If new incoming path  is better than already existing */
export const isBetterPath = (current, nextNode) => {
    if (graph[nextNode.rowId][nextNode.colId].distance === Infinity) return true;
    if (graph[nextNode.rowId][nextNode.colId].distance >
        (graph[current.rowId][current.colId].distance + 1)) return true;
    return false;
}

/* update the parent of the neighbour to current */
export const updateParent = (current, nextNode) => {
    graph[nextNode.rowId][nextNode.colId].parent_node = current;
}

/* check if current node is destination node */
export const isDestinationNode = (node, destination) => {
    if (node.rowId === destination.rowId && node.colId === destination.colId) return true;
    return false;
}

/* mark a node as visited in the graph */
export const markNodeVisited = (node) => {
    graph[node.rowId][node.colId].is_visited_node = true;
}

/* mark a node as un-visited in the graph */
export const unMarkNodeVisited = (node) => {
    graph[node.rowId][node.colId].is_visited_node = false;
}

/* mark a node as shortest path node */
export const markNodeAsPath = (node) => {
    graph[node.rowId][node.colId].is_path_node = true;
}

/* unmark a node as shortest path node */
export const unMarkNodeAsPath = (node) => {
    graph[node.rowId][node.colId].is_path_node = false;
}

/* reset just the visited information in the graph */
export const resetVisitedGraph = () => {
    for (let row = 0; row < graph_row; ++row) {
        for (let col = 0; col < graph_col; ++col) {
            graph[row][col].is_visited_node = false;
        }
    }
}

/* reset the graph by overriding with new graph */
export const resetGraph = (setGrid) => {
    /* Since the size of each grid box is 40px = 4px of border and 40px of box */
    graph_row = parseInt((window.innerHeight - NAVBAR_HEIGHT_PX) / GRID_BOX);
    graph_col = parseInt(window.innerWidth / GRID_BOX);
    graph = createGraph(graph_row, graph_col);
    setGrid(updateGrid());
}

/* check if a node has parent, updated in the sssp */
const hasParent = (node) => {
    if (node.parent_node.rowId !== -1 && node.parent_node.colId !== -1) return true;
    return false;
}

/* get the parent of the node */
const getParent = (node) => {
    return graph[node.parent_node.rowId][node.parent_node.colId];
}

/* get the shortest path using parent links */
export const getShortestPath = (destination) => {
    const shortest_path = [];
    let current = graph[destination.rowId][destination.colId];

    /* continue the loop until node has no parent - source */
    while (hasParent(current)) {
        shortest_path.push(current);
        current = getParent(current);
    }

    /* remove the destination node from shortest path */
    shortest_path.shift()
    /* reverse the path, since we generate path from destination */
    shortest_path.reverse();
    return shortest_path;
}

/* set the direction field of node to direction */
const setDirection = (node, direction) => {
    graph[node.rowId][node.colId].direction = direction;
}

/* This function computes the direction in the shortest path */
export const findDirection = (source, destination, shortest_path) => {
    /* Add source and destination in shortest path for direction computation */
    shortest_path.unshift(source);
    shortest_path.push(destination);

    for (let i = 1; i < shortest_path.length - 1; ++i) {
        const current = shortest_path[i];
        const prev = shortest_path[i - 1];
        const next = shortest_path[i + 1];

        /* if prev is on left and next on right, then direction of current is right */
        if ((current.colId - 1) === prev.colId && (current.colId + 1) === next.colId) {
            setDirection(current, Cons.DIRECTION_RIGHT);
            continue;
        }
        /* if prev is on right and next on left, then direction of current is left */
        if ((current.colId + 1) === prev.colId && (current.colId - 1) === next.colId) {
            setDirection(current, Cons.DIRECTION_LEFT);
            continue;
        }
        /* if prev is up and next is down, then direction of current is down */
        if ((current.rowId - 1) === prev.rowId && (current.rowId + 1) === next.rowId) {
            setDirection(current, Cons.DIRECTION_DOWN);
            continue;
        }
        /* if prev is down and next is up, then direction of current is up */
        if ((current.rowId + 1) === prev.rowId && (current.rowId - 1) === next.rowId) {
            setDirection(current, Cons.DIRECTION_UP);
            continue;
        }
        /* all the 8 corner conditions are handled below for direction in corners/turns */
        if ((current.colId - 1) === prev.colId && (current.rowId + 1) === next.rowId) {
            setDirection(current, Cons.DIRECTION_LEFT_DOwN);
            continue;
        }
        if ((current.colId - 1) === prev.colId && (current.rowId - 1) === next.rowId) {
            setDirection(current, Cons.DIRECTION_LEFT_UP);
            continue;
        }
        if ((current.colId + 1) === prev.colId && (current.rowId + 1) === next.rowId) {
            setDirection(current, Cons.DIRECTION_RIGHT_DOWN);
            continue;
        }
        if ((current.colId + 1) === prev.colId && (current.rowId - 1) === next.rowId) {
            setDirection(current, Cons.DIRECTION_RIGHT_UP);
            continue;
        }
        if ((current.rowId - 1) === prev.rowId && (current.colId - 1) === next.colId) {
            setDirection(current, Cons.DIRECTION_UP_LEFT);
            continue;
        }
        if ((current.rowId - 1) === prev.rowId && (current.colId + 1) === next.colId) {
            setDirection(current, Cons.DIRECTION_UP_RIGHT);
            continue;
        }
        if ((current.rowId + 1) === prev.rowId && (current.colId - 1) === next.colId) {
            setDirection(current, Cons.DIRECTION_DOWN_LEFT);
            continue;
        }
        if ((current.rowId + 1) === prev.rowId && (current.colId + 1) === next.colId) {
            setDirection(current, Cons.DIRECTION_DOWN_RIGHT);
        }
    }

    /* Removes the source and destination from the shortest path */
    shortest_path.shift();
    shortest_path.pop();
}

/* Update the grid for re-render on the screen */
export const updateGrid = () => {
    let localGrid = [];
    for (var row = 0; row < graph_row; ++row) {
        var row_div = [];
        for (var col = 0; col < graph_col; ++col) {
            const current = graph[row][col];
            /*
              classes are used to conditionally put classNames
              This way CSS would work differently for each cell/box in the grid
            */
            let classes = classNames({
                'grid-style': true,
                /*
                  TBD:
                    remove logic for top-row, bottom-row, left-col, right-col
                    and use border-collapse property in css which doesn't let border merge
                */
                'top-row': row === 0,
                'bottom-row': row === graph_row - 1,
                'left-col': col === 0,
                'right-col': col === graph_col - 1,
                'visited-node': graph[row][col].is_visited_node,
                'path-node': (current.is_path_node),
                'path-node-left': (current.is_path_node && current.direction === Cons.DIRECTION_LEFT),
                'path-node-right': (current.is_path_node && current.direction === Cons.DIRECTION_RIGHT),
                'path-node-down': (current.is_path_node && current.direction === Cons.DIRECTION_DOWN),
                'path-node-up': (current.is_path_node && current.direction === Cons.DIRECTION_UP),
                'path-node-left-up': (current.is_path_node && current.direction === Cons.DIRECTION_LEFT_UP),
                'path-node-left-down': (current.is_path_node && current.direction === Cons.DIRECTION_LEFT_DOwN),
                'path-node-right-up': (current.is_path_node && current.direction === Cons.DIRECTION_RIGHT_UP),
                'path-node-right-down': (current.is_path_node && current.direction === Cons.DIRECTION_RIGHT_DOWN),
                'path-node-up-left': (current.is_path_node && current.direction === Cons.DIRECTION_UP_LEFT),
                'path-node-up-right': (current.is_path_node && current.direction === Cons.DIRECTION_UP_RIGHT),
                'path-node-down-left': (current.is_path_node && current.direction === Cons.DIRECTION_DOWN_LEFT),
                'path-node-down-right': (current.is_path_node && current.direction === Cons.DIRECTION_DOWN_RIGHT),
            });

            /* push the each cell in the row_div */
            row_div.push(<td
                id={graph_col * row + col}
                key={graph_col * row + col}
                className={classes}>
            </td>
            );

        }

        /* push the entire row_div into the localGrid */
        localGrid.push(<tr
            key={row}
            className='row-style'>{row_div}
        </tr>
        );
    }

    /* return the localGrid which can then be used to set grid state */
    return localGrid;
}