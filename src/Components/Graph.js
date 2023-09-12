export const START_NODE_X = 5;
export const START_NODE_Y = 5;
export const FINISH_NODE_X = 15;
export const FINISH_NODE_Y = 30;

/*
  Border is actually 1px which merge with neighbour to form 2px
  And considering both sides, total of 4px
*/
const BORDER_WIDTH = 4

/* A single box in grid is (40px * 40px) in size */
const GRID_BOX_SIZE = 40

/* Total size of grid box is 40px + 4px */
const GRID_BOX = GRID_BOX_SIZE + BORDER_WIDTH
const NAVBAR_HEIGHT_PX = 105.5;
const NAVBAR_HEIGHT = parseInt(NAVBAR_HEIGHT_PX / GRID_BOX);

/* Since the size of each grid box is 40px = 4px of border and 40px of box */
export const graph_row = parseInt(window.innerHeight / GRID_BOX) - NAVBAR_HEIGHT;
export const graph_col = parseInt(window.innerWidth / GRID_BOX);

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
          x and y are pixels to render the start and finish node
          44px is the size of each grid box and 9px to center on the grid box
        */
        x: rowId * 44 + 9,
        y: colId * 44 + 9,
    }
}

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
        is_visted_node: false,
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