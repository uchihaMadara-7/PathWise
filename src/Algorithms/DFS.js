import * as Graph from '../Components/Graph';

let nodes_in_visited_order = []

/* Shortest path calculation using Depth First Search - Very bad algorithm for SSSP */
const RecurDFS = (current, destination) => {
    if (Graph.isDestinationNode(current, destination)) return;
    Graph.markNodeVisited(current);
    for (let i = 0; i < Graph.neighbour.length; ++i) {
        const rowId = current.rowId + Graph.neighbour[i].rowId;
        const colId = current.colId + Graph.neighbour[i].colId;
        const nextNode = Graph.Node(rowId, colId);

        if (Graph.isValidNode(nextNode) && !Graph.isVisitedNode(nextNode) && !Graph.isObstacle(nextNode)) {
            if (Graph.isBetterPath(current, nextNode)) {
                Graph.updateDistance(current, nextNode);
                Graph.updateParent(current, nextNode);
                if (!Graph.isDestinationNode(nextNode, destination)) {
                    nodes_in_visited_order.push(nextNode);
                }
                RecurDFS(nextNode, destination)
            }
        }
    }
    Graph.unMarkNodeVisited(current);
    return true;
}

const DFS = (source, destination) => {
    Graph.graph[source.rowId][source.colId].distance = 0;
    RecurDFS(source, destination);
    const order = nodes_in_visited_order;
    nodes_in_visited_order = [];
    return order;
}

export default DFS;