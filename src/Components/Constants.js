import BFS from '../Algorithms/BFS';
//import DFS from '../Algorithms/DFS';

export const BREADTH_FIRST_SEARCH = 0;
export const DEPTH_FIRST_SEARCH = 1;

export const pathAlgorithm = {
    [BREADTH_FIRST_SEARCH]: BFS,
}