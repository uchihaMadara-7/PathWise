import * as Graph from '../Components/Graph';

/* Keeps track of the last visited cell when mouse is moving */
let last_visited = -1;

/* This marks the cell as grey or white depending if it is already obstacle */
const markCell = (event) => {
    const element = document.elementFromPoint(event.clientX, event.clientY);
    if (!element || (last_visited === element.id)) return;

    last_visited = element.id;
    /* Book keeping for later use */
    const id = element.id;
    const colId = id % Graph.graph_col;
    const rowId = Math.floor(id / Graph.graph_col);
    const node = Graph.Node(rowId, colId);

    if (Graph.isObstacle(node)) {
        element.classList.toggle('mark-non-obstacle', true);
        element.classList.toggle('mark-obstacle', false);
        Graph.unMarkAsObstacle(node);
    }
    else {
        element.classList.toggle('mark-obstacle', true);
        element.classList.toggle('mark-non-obstacle', false);
        Graph.markAsObstacle(node);
    }
}

/* This function handles mouse pressed event */
const mousePressed = (event) => {
    const element = document.getElementById('grid');
    if (!element) {
        console.error('Table no found!');
        return;
    }
    /* add listener */
    element.addEventListener('mousemove', mouseMove);
    markCell(event);
}

/* This function handles mouse released event */
const mouseReleased = () => {
    const element = document.getElementById('grid');
    if (!element) {
        console.error('Table no found!');
        return;
    }
    /* remove listener and mark last_visited to -1 */
    element.removeEventListener('mousemove', mouseMove);
    last_visited = -1;
}

/* This function handles mouse move event */
const mouseMove = (event) => {
    markCell(event);
}

/* function to toggle the obstacles mode based on prev state */
export const toggleMode = (obstaclesMode, setObstaclesMode) => {
    const newMode = !obstaclesMode;
    const element = document.getElementById('grid');
    if (!element) {
        console.error('Table no found!');
        return;
    }

    /* if obstacle mode is enabled, add event listener else remove listener */
    if (newMode) {
        element.addEventListener('mousedown', mousePressed);
        element.addEventListener('mouseup', mouseReleased);
    }
    else {
        element.removeEventListener('mousedown', mousePressed);
        element.removeEventListener('mouseup', mouseReleased);
    }

    setObstaclesMode((prev) => {
        return !prev;
    });

    return () => {
        /* remove any left over listeners in unmount */
        element.removeEventListener('mousedown', mousePressed);
        element.removeEventListener('mouseup', mouseReleased);
    }
}