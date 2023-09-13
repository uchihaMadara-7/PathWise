export const START_NODE_X = 5;
export const START_NODE_Y = 5;
export const FINISH_NODE_X = 15;
export const FINISH_NODE_Y = 20;

/*
  Border is actually 1px which merge with neighbour to form 2px
  And considering both sides, total of 4px
*/
const BORDER_WIDTH = 4

/* A single box in grid is (40px * 40px) in size */
const GRID_BOX_SIZE = 40

/* Total size of grid box is 40px + 4px */
const GRID_BOX = GRID_BOX_SIZE + BORDER_WIDTH
export const NAVBAR_HEIGHT_PX = 106;
export const NAVBAR_HEIGHT = parseInt(NAVBAR_HEIGHT_PX / GRID_BOX);

/* Since the size of each grid box is 40px = 4px of border and 40px of box */
export const graph_row = parseInt(window.innerHeight / GRID_BOX) - NAVBAR_HEIGHT;
export const graph_col = parseInt(window.innerWidth / GRID_BOX);

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
    return {
        rowId,
        colId,
        /*
          top and left are pixels to render the start and finish node from top and left resp.
          44px is the size of each grid box and 9px to center on the grid box
        */
        top: rowId * GRID_BOX + NAVBAR_HEIGHT_PX + 11,
        left: colId * GRID_BOX + 8,
    }
}

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

export const isValidNode = (node) => {
    if (node.rowId >= 0 && node.rowId < graph_row &&
        node.colId >= 0 && node.colId < graph_col) return true;
    return false;
}

export const isVisitedNode = (node) => {
    return graph[node.rowId][node.colId].is_visited_node;
}

export const updateDistance = (current, nextNode) => {
    graph[nextNode.rowId][nextNode.colId].distance = graph[current.rowId][current.colId].distance + 1;
}

export const updateParent = (current, nextNode) => {
    graph[nextNode.rowId][nextNode.colId].parent_node = current;
}

export const isDestinationNode = (node, destination) => {
    if (node.rowId === destination.rowId && node.colId === destination.colId) return true;
    return false;
}

export const markNodeVisited = (node) => {
    graph[node.rowId][node.colId].is_visited_node = true;
}

export const markNodeAsPath = (node) => {
    graph[node.rowId][node.colId].is_path_node = true;
}

export const unMarkNodeAsPath = (node) => {
    graph[node.rowId][node.colId].is_path_node = false;
}

export const resetVisitedGraph = () => {
    for (let row = 0; row < graph_row; ++row) {
        for (let col = 0; col < graph_col; ++col) {
            graph[row][col].is_visited_node = false;
        }
    }
}

export const resetGraph = () => {
    graph = createGraph(graph_row, graph_col);
}

const hasParent = (node) => {
    if (node.parent_node.rowId !== -1 && node.parent_node.colId !== -1) return true;
    return false;
}

const getParent = (node) => {
    return graph[node.parent_node.rowId][node.parent_node.colId];
}

export const getShortestPath = (destination) => {
    const shortest_path = [];
    let current = graph[destination.rowId][destination.colId];

    while (hasParent(current)) {
        shortest_path.push(current);
        current = getParent(current);
    }

    shortest_path.shift()
    shortest_path.reverse();
    return shortest_path;
}

/* Update the grid for re-render on the screen */
export const updateGrid = () => {
    let localGrid = [];
    for (var row = 0; row < graph_row; ++row) {
        var row_div = [];
        for (var col = 0; col < graph_col; ++col) {
            /*
              classes are used to conditionally put classNames
              This way CSS would work differently for each cell/box in the grid
            */
            let classes = classNames({
                'grid-style': true,
                'top-row': row === 0,
                'bottom-row': row === graph_row - 1,
                'left-col': col === 0,
                'right-col': col === graph_col - 1,
                'visited-node': graph[row][col].is_visited_node,
                'path-node': graph[row][col].is_path_node,
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