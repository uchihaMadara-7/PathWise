let offSetTop, offSetLeft;
let source_ref, destination_ref;

export const nodeStarted = (event, node_ref, is_source) => {
    const node = node_ref.current;
    const node_bounds = node.getBoundingClientRect();
    offSetTop = event.clientY - node_bounds.top;
    offSetLeft = event.clientX - node_bounds.left;
    if (is_source) {
        source_ref = node_ref;
        window.addEventListener('mousemove', sourceMotion);
    }
    else {
        destination_ref = node_ref;
        window.addEventListener('mousemove', destinationMotion);
    }
}

const sourceMotion = (event) => {
    const source_node = source_ref.current;
    source_node.style.top = `${event.clientY - offSetTop}px`;
    source_node.style.left = `${event.clientX - offSetLeft}px`;
}

const destinationMotion = (event) => {
    const dest_node = destination_ref.current;
    dest_node.style.top = `${event.clientY - offSetTop}px`;
    dest_node.style.left = `${event.clientX - offSetLeft}px`;
}

export const nodeStopped = (event, node_ref, is_source) => {
    if (is_source) window.removeEventListener('mousemove', sourceMotion);
    else window.removeEventListener('mousemove', destinationMotion);
    /* Logic to adjust the node on center of the closest cell */
}