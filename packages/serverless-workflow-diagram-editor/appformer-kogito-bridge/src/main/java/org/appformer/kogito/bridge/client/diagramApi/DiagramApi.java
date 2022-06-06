package org.appformer.kogito.bridge.client.diagramApi;

/**
 * Api for diagram window interactions.
 */
public interface DiagramApi {

    /**
     * Move the cursor in the text editor to a specified node
     * @param stateName the name of the target node
     */
    void moveCursorToNode(String stateName);

}
