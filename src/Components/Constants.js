import BFS from '../Algorithms/BFS';
import DFS from '../Algorithms/DFS';
import Dijkstra from '../Algorithms/Dijkstra';

/* These are direction constant for the shortest path */
export const DIRECTION_LEFT = 0;
export const DIRECTION_RIGHT = 1;
export const DIRECTION_UP = 2;
export const DIRECTION_DOWN = 3;
export const DIRECTION_LEFT_DOwN = 4;
export const DIRECTION_LEFT_UP = 5;
export const DIRECTION_RIGHT_DOWN = 6;
export const DIRECTION_RIGHT_UP = 7;
export const DIRECTION_UP_LEFT = 8;
export const DIRECTION_UP_RIGHT = 9
export const DIRECTION_DOWN_LEFT = 10;;
export const DIRECTION_DOWN_RIGHT = 11;

/* indexes for various algorithms */
export const BREADTH_FIRST_SEARCH = 0;
export const DEPTH_FIRST_SEARCH = 1;
export const DIJKSTRA = 3;

/* way to dynamically have different algo callbacks and interval */
export const pathAlgorithm = {
    [BREADTH_FIRST_SEARCH]: {
        callback: BFS,
        interval: 20,
    },
    [DEPTH_FIRST_SEARCH]: {
        callback: DFS,
        interval: 1,
    },
    [DIJKSTRA]: {
        callback: Dijkstra,
        interval: 20,
    }
}