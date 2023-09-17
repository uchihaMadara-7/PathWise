import * as Graph from '../Components/Graph';

/* Keeps track of the last visited cell when mouse is moving */
let last_visited = -1;

/* This marks the cell as grey or white depending if it is already obstacle */
const markCell = (event) => {
    const element = document.elementFromPoint(event.clientX, event.clientY);
    if ((!element) || (last_visited === element.id)) return;
    const isCell = element.getAttribute('iscell');
    if (!isCell || isCell !== '1') return;

    last_visited = element.id;
    /* Book keeping for later use */
    const id = element.id;
    const colId = id % Graph.graph_col;
    const rowId = Math.floor(id / Graph.graph_col);
    const node = Graph.Node(rowId, colId);

    if (Graph.isObstacle(node)) {
        element.classList.toggle('mark-obstacle', false);
        Graph.unMarkAsObstacle(node);
    }
    else if (Graph.isValidNode(node)) {
        element.classList.toggle('mark-obstacle', true);
        Graph.markAsObstacle(node);
    }
}

/* This function handles mouse pressed event */
const mousePressed = (event) => {

    /* add listener */
    window.addEventListener('mousemove', mouseMove);
    markCell(event);
}

/* This function handles mouse released event */
const mouseReleased = () => {

    /* remove listener and mark last_visited to -1 */
    window.removeEventListener('mousemove', mouseMove);
    last_visited = -1;
}

/* This function handles mouse move event */
const mouseMove = (event) => {
    markCell(event);
}

/* function to toggle the obstacles mode based on prev state */
export const toggleMode = (obstaclesMode, setObstaclesMode) => {
    const newMode = !obstaclesMode;

    /* if obstacle mode is enabled, add event listener else remove listener */
    if (newMode) {
        window.addEventListener('mousedown', mousePressed);
        window.addEventListener('mouseup', mouseReleased);
    }
    else {
        window.removeEventListener('mousedown', mousePressed);
        window.removeEventListener('mouseup', mouseReleased);
    }

    setObstaclesMode((prev) => {
        return !prev;
    });

    return () => {
        /* remove any left over listeners in unmount */
        window.removeEventListener('mousedown', mousePressed);
        window.removeEventListener('mouseup', mouseReleased);
    }
}