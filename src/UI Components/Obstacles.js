import * as Graph from '../Components/Graph';

/* Keeps track of the last visited cell when mouse is moving */
let last_visited = -1;

/* This marks the cell as grey or white depending upon the color */
const markCell = (event) => {
    const element = document.elementFromPoint(event.clientX, event.clientY);
    if (!element || (last_visited === element.id)) return;

    last_visited = element.id;
    if (element.style.backgroundColor === 'grey') element.style.backgroundColor = '';
    else element.style.backgroundColor = 'grey';

    /* Book keeping for later use */
    const id = element.id;
    const colId = id % Graph.graph_col;
    const rowId = Math.floor(id / Graph.graph_row);
}

/* This function handles mouse pressed event */
export const mousePressed = (event) => {
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
export const mouseReleased = () => {
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