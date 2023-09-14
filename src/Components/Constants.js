import BFS from '../Algorithms/BFS';
import DFS from '../Algorithms/DFS';

/* indexes for various algorithms */
export const BREADTH_FIRST_SEARCH = 0;
export const DEPTH_FIRST_SEARCH = 1;

/* way to dynamically have different algo callbacks and interval */
export const pathAlgorithm = {
    [BREADTH_FIRST_SEARCH]: {
        callback: BFS,
        interval: 20,
    },
    [DEPTH_FIRST_SEARCH]: {
        callback: DFS,
        interval: 1,
    }
}