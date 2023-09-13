import * as Graph from "../Components/Graph";

/* Shortest path calculation using Breadth First Search */
const BFS = (source, destination) => {

    const nodes_in_visited_order = []

    Graph.markNodeVisited(source);
    const queue = [source];
    Graph.graph[source.rowId][source.colId].distance = 0;

    while (queue.length) {

        const current = queue.shift();
        for (let i = 0; i < Graph.neighbour.length; ++i) {
            const rowId = current.rowId + Graph.neighbour[i].rowId;
            const colId = current.colId + Graph.neighbour[i].colId;
            const nextNode = Graph.Node(rowId, colId);

            if (Graph.isValidNode(nextNode) && !Graph.isVisitedNode(nextNode)) {
                Graph.markNodeVisited(nextNode);
                Graph.updateDistance(current, nextNode);
                Graph.updateParent(current, nextNode);

                if (Graph.isDestinationNode(nextNode, destination)) {
                    Graph.resetVisitedGraph();
                    return nodes_in_visited_order;
                }

                nodes_in_visited_order.push(nextNode);
                queue.push(nextNode);
            }
        }
    }

    return nodes_in_visited_order;
}

export default BFS;