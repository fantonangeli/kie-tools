package org.kie.workbench.common.stunner.sw.client.editor;

import jsinterop.annotations.JsOverlay;
import jsinterop.annotations.JsPackage;
import jsinterop.annotations.JsType;

@JsType(isNative = true, namespace = JsPackage.GLOBAL, name = "window")
public class DiagramWindow {
    @JsOverlay
    public static void onNodeClick(String stateName) {
        if (stateName!=null){
            onNodeClicked(stateName);
        }
    }

    public static native void onNodeClicked(String stateName);
}
