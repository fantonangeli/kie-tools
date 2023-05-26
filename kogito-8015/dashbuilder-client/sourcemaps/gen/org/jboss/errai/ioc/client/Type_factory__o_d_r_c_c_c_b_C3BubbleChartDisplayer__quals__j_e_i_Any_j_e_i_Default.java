package org.jboss.errai.ioc.client;

import com.google.gwt.user.client.ui.IsWidget;
import javax.enterprise.context.Dependent;
import org.dashbuilder.common.client.widgets.FilterLabelSet;
import org.dashbuilder.displayer.client.AbstractDisplayer;
import org.dashbuilder.displayer.client.AbstractGwtDisplayer;
import org.dashbuilder.displayer.client.Displayer;
import org.dashbuilder.displayer.client.DisplayerListener;
import org.dashbuilder.renderer.c3.client.C3AbstractDisplayer;
import org.dashbuilder.renderer.c3.client.C3Displayer;
import org.dashbuilder.renderer.c3.client.C3XYDisplayer;
import org.dashbuilder.renderer.c3.client.charts.bubble.C3BubbleChartDisplayer;
import org.dashbuilder.renderer.c3.client.charts.bubble.C3BubbleChartDisplayer.View;
import org.dashbuilder.renderer.c3.client.charts.bubble.C3BubbleChartView;
import org.dashbuilder.renderer.c3.client.jsbinding.C3JsTypesFactory;
import org.jboss.errai.ioc.client.container.ContextManager;
import org.jboss.errai.ioc.client.container.Factory;
import org.jboss.errai.ioc.client.container.FactoryHandleImpl;

public class Type_factory__o_d_r_c_c_c_b_C3BubbleChartDisplayer__quals__j_e_i_Any_j_e_i_Default extends Factory<C3BubbleChartDisplayer> { public Type_factory__o_d_r_c_c_c_b_C3BubbleChartDisplayer__quals__j_e_i_Any_j_e_i_Default() {
    super(new FactoryHandleImpl(C3BubbleChartDisplayer.class, "Type_factory__o_d_r_c_c_c_b_C3BubbleChartDisplayer__quals__j_e_i_Any_j_e_i_Default", Dependent.class, false, null, true));
    handle.setAssignableTypes(new Class[] { C3BubbleChartDisplayer.class, C3XYDisplayer.class, C3Displayer.class, C3AbstractDisplayer.class, AbstractGwtDisplayer.class, AbstractDisplayer.class, Object.class, Displayer.class, DisplayerListener.class, IsWidget.class });
  }

  public C3BubbleChartDisplayer createInstance(final ContextManager contextManager) {
    final FilterLabelSet _filterLabelSet_1 = (FilterLabelSet) contextManager.getInstance("Type_factory__o_d_c_c_w_FilterLabelSet__quals__j_e_i_Any_j_e_i_Default");
    final View _view_0 = (C3BubbleChartView) contextManager.getInstance("Type_factory__o_d_r_c_c_c_b_C3BubbleChartView__quals__j_e_i_Any_j_e_i_Default");
    final C3JsTypesFactory _factory_2 = (C3JsTypesFactory) contextManager.getInstance("Type_factory__o_d_r_c_c_j_C3JsTypesFactory__quals__j_e_i_Any_j_e_i_Default");
    final C3BubbleChartDisplayer instance = new C3BubbleChartDisplayer(_view_0, _filterLabelSet_1, _factory_2);
    registerDependentScopedReference(instance, _filterLabelSet_1);
    registerDependentScopedReference(instance, _view_0);
    setIncompleteInstance(instance);
    setIncompleteInstance(null);
    return instance;
  }
}