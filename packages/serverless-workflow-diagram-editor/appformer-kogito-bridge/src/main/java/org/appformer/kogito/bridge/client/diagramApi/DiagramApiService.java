package org.appformer.kogito.bridge.client.diagramApi;

/**
 * A {@link DiagramApi} implementation used when envelope API is available
 */
public class DiagramApiService implements DiagramApi{

    @Override
    public void moveCursorToNode(final String stateName) {
        if (stateName!=null){
            DiagramApiInteropWrapper.get().moveCursorToNode(stateName);
        }
    }
}
