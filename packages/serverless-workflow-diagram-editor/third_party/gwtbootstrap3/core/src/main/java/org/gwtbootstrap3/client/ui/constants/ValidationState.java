/*
 * Copyright 2023 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.gwtbootstrap3.client.ui.constants;

import com.google.gwt.dom.client.Style;
import org.gwtbootstrap3.client.ui.base.helper.EnumHelper;

/**
 * @author Sven Jacobs
 * @author Joshua Godi
 */
public enum ValidationState implements Style.HasCssName {
    NONE(""),
    WARNING("has-warning"),
    ERROR("has-error"),
    SUCCESS("has-success");

    private final String cssClass;

    private ValidationState(final String cssClass) {
        this.cssClass = cssClass;
    }

    @Override
    public String getCssName() {
        return cssClass;
    }

    public static ValidationState fromStyleName(final String styleName) {
        return EnumHelper.fromStyleName(styleName, ValidationState.class, NONE);
    }
}