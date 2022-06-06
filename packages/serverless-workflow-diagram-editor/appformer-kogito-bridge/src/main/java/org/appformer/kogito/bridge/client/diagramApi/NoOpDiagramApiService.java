package org.appformer.kogito.bridge.client.diagramApi;

/**
 * This {@link DiagramApi} implementation is used when the envelope API is not available
 */
public class NoOpDiagramApiService implements DiagramApi {

    @Override
    public void moveCursorToNode(String stateName) {}
}
