package org.appformer.kogito.bridge.client.diagramApi;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;

import elemental2.dom.DomGlobal;
import org.appformer.kogito.bridge.client.interop.WindowRef;

/**
 * Produces {@link DiagramApiService} beans according to whether the envelope API is available or not
 */
public class DiagramApiServiceProducer {

    @Produces
    @ApplicationScoped
    public DiagramApi produce() {

        if (WindowRef.isEnvelopeAvailable()) {
            return new DiagramApiService();
        }

        DomGlobal.console.debug("[DiagramApiServiceProducer] Envelope API is not available. Producing NoOpDiagramApiService");
        return new NoOpDiagramApiService();
    }
}
