import * as Graph from './Graph';

let offSetTop, offSetLeft;

/* references for the source and destination nodes will be set in these */
let source_ref, destination_ref;

/*
  This function will be triggered when mouse is clicked on the node
  It will recieve event, reference of the node clicked (source/destination)
  is_source to figure out whether this event was triggred by source or destination
*/
export const nodeStarted = (event, node_ref, is_source) => {
    const node = node_ref.current;
    const node_bounds = node.getBoundingClientRect();

    /* get the offset of the mouse-pointer from top & left of node */
    offSetTop = event.clientY - node_bounds.top;
    offSetLeft = event.clientX - node_bounds.left;

    /* add event listener, with different callbacks based on source/destination */
    if (is_source) {
        /* set the node_ref to source_ref for later use in sourceMotion() */
        source_ref = node_ref;
        window.addEventListener('mousemove', sourceMotion);
    }
    else {
        /* set the node_ref to destination_ref for later use in destinationMotion() */
        destination_ref = node_ref;
        window.addEventListener('mousemove', destinationMotion);
    }
}

/*
  This function will be triggered when mouse moves over window (after clicking on source node)
  It can be taken only event argument, otherwise removing listener creates some problem
*/
const sourceMotion = (event) => {
    const source_node = source_ref.current;
    /* use offset to reset the node positoin to exact place where the click was done*/
    source_node.style.top = `${event.clientY - offSetTop}px`;
    source_node.style.left = `${event.clientX - offSetLeft}px`;
}

/*
  This function will be triggered when mouse moves over window (after clicking on destination node)
  It can be taken only event argument, otherwise removing listener creates some problem
*/
const destinationMotion = (event) => {
    const dest_node = destination_ref.current;
    /* use offset to reset the node positoin to exact place where the click was done*/
    dest_node.style.top = `${event.clientY - offSetTop}px`;
    dest_node.style.left = `${event.clientX - offSetLeft}px`;
}

/*
  This function will be triggered when mouse is released on the node
  It will recieve event, reference of the node clicked (source/destination)
  is_source to figure out whether this event was triggred by source or destination
*/
export const nodeStopped = (node_ref, setNode, setGrid, is_source) => {
    if (is_source) window.removeEventListener('mousemove', sourceMotion);
    else window.removeEventListener('mousemove', destinationMotion);

    /* Logic to adjust the node on center of the closest cell */
    const node = node_ref.current;
    const node_bounds = node.getBoundingClientRect();

    /*
      Can be done by using API elementFromPoint(x, y)
      using the element, find the id which can be easily used to figure out row and col
      col = id % graph_col
      row = Math.floor(id/graph_row)
    */
    const rowId = Math.round((node_bounds.top - Graph.NAVBAR_HEIGHT_PX - 5) / Graph.GRID_BOX);
    const colId = Math.round(node_bounds.left / Graph.GRID_BOX);

    const newNode = Graph.floatingNode(rowId, colId);
    node.style.top = `${newNode.top}px`;
    node.style.left = `${newNode.left}px`;
    setNode(prev => {
        return newNode;
    });

    /* reset the graph and canvas on source or destination change */
    Graph.resetGraph(setGrid);
}