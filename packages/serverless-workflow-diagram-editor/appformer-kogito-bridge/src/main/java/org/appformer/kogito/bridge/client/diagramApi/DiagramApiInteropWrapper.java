package org.appformer.kogito.bridge.client.diagramApi;

import jsinterop.annotations.JsProperty;
import jsinterop.annotations.JsType;

/**
 * Javascript bridge to access actual DiagramApi available in the envelope namespace
 */
@JsType(isNative = true, namespace = "window", name = "envelope")
public class DiagramApiInteropWrapper {

    /**
     * Move the cursor in the text editor to a specified node
     * @param nodeName the name of the target node
     */
    public native void moveCursorToNode(String stateName);

    @JsProperty(name = "diagramApi")
    public static native DiagramApiInteropWrapper get();
}
