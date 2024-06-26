/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package com.ait.lienzo.client.core.shape.wires;

import java.util.function.Consumer;

public class DefaultSelectionListener implements SelectionListener {

    public static final Consumer<WiresShape> SHAPE_NO_OP = shape -> {
    };

    public static final Consumer<WiresConnector> CONNECTOR_NO_OP = connector -> {
    };

    private final Consumer<WiresShape> onSelectShape;

    private final Consumer<WiresShape> onDeselectShape;

    private final Consumer<WiresConnector> onSelectConnector;

    private final Consumer<WiresConnector> onDeselectConnector;

    public DefaultSelectionListener() {
        this(SHAPE_NO_OP,
             SHAPE_NO_OP,
             CONNECTOR_NO_OP,
             CONNECTOR_NO_OP);
    }

    public DefaultSelectionListener(final Consumer<WiresShape> onSelectShape,
                                    final Consumer<WiresShape> onDeselectShape,
                                    final Consumer<WiresConnector> onSelectConnector,
                                    final Consumer<WiresConnector> onDeselectConnector) {
        this.onSelectShape = onSelectShape;
        this.onDeselectShape = onDeselectShape;
        this.onSelectConnector = onSelectConnector;
        this.onDeselectConnector = onDeselectConnector;
    }

    @Override
    public void onChanged(SelectionManager.SelectedItems selectedItems) {
        SelectionManager.ChangedItems changed = selectedItems.getChanged();

        for (WiresShape shape : changed.getRemovedShapes().asList()) {
            deselect(shape);
        }

        for (WiresConnector connector : changed.getRemovedConnectors().asList()) {
            deselect(connector);
        }

        if (!selectedItems.isSelectionGroup() && selectedItems.size() == 1) {
            // it's one or the other, so attempt both, it'll short circuit if the first selects.
            if (selectedItems.getShapes().size() == 1) {
                for (WiresShape shape : selectedItems.getShapes()) {
                    select(shape, false);
                    break;
                }
            } else {
                for (WiresConnector connector : selectedItems.getConnectors()) {
                    select(connector, false);
                    break;
                }
            }
        } else if (selectedItems.isSelectionGroup()) {
            for (WiresShape shape : selectedItems.getShapes()) {
                select(shape, true);
            }

            for (WiresConnector connector : selectedItems.getConnectors()) {
                select(connector, true);
            }
        }
    }

    private void select(final WiresShape shape,
                        final boolean isMultiple) {
        onSelectShape.accept(shape);
        shape.listen(!isMultiple);
    }

    private void deselect(WiresShape shape) {
        onDeselectShape.accept(shape);
        shape.listen(true);
    }

    private void select(final WiresConnector connector,
                        final boolean isMultiple) {
        onSelectConnector.accept(connector);
        connector.listen(!isMultiple);
    }

    private void deselect(WiresConnector connector) {
        onDeselectConnector.accept(connector);
        connector.listen(true);
    }
}
