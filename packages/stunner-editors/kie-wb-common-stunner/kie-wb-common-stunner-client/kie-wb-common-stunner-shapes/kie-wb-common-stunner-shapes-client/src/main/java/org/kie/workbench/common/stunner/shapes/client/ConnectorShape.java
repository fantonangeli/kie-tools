/*
 * Copyright 2016 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.kie.workbench.common.stunner.shapes.client;

import org.kie.workbench.common.stunner.shapes.client.view.AbstractConnectorView;
import org.kie.workbench.common.stunner.shapes.def.ConnectorShapeDef;

public class ConnectorShape<W>
        extends BasicConnectorShape<W, ConnectorShapeDef<W, AbstractConnectorView>, AbstractConnectorView> {

    public ConnectorShape(final ConnectorShapeDef<W, AbstractConnectorView> shapeDef,
                          final AbstractConnectorView view) {
        super(shapeDef,
              view);
    }
}