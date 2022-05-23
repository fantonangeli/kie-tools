package org.kie.workbench.common.stunner.sw.client.editor;

import elemental2.dom.DomGlobal;
import jsinterop.annotations.JsOverlay;
import jsinterop.annotations.JsPackage;
import jsinterop.annotations.JsType;

@JsType(isNative = true, namespace = JsPackage.GLOBAL, name = "window")
public class DiagramWindow {
    @JsOverlay
    public static void onNodeClick(String stateName) {
        DomGlobal.console.log("Selected state with name from DiagramWindow = " + stateName);
        onNodeClickJs(stateName);
    }

    public static native void onNodeClickJs(String stateName);
}
