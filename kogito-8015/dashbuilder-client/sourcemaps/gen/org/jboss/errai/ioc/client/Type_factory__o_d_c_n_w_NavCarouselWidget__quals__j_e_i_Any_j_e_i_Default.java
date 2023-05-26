package org.jboss.errai.ioc.client;

import com.google.gwt.user.client.ui.IsWidget;
import javax.enterprise.context.Dependent;
import org.dashbuilder.client.navigation.NavigationManager;
import org.dashbuilder.client.navigation.impl.NavigationManagerImpl;
import org.dashbuilder.client.navigation.plugin.PerspectivePluginManager;
import org.dashbuilder.client.navigation.widget.BaseNavWidget;
import org.dashbuilder.client.navigation.widget.HasDefaultNavItem;
import org.dashbuilder.client.navigation.widget.NavCarouselWidget;
import org.dashbuilder.client.navigation.widget.NavCarouselWidget.View;
import org.dashbuilder.client.navigation.widget.NavCarouselWidgetView;
import org.dashbuilder.client.navigation.widget.NavWidget;
import org.dashbuilder.client.plugins.RuntimePerspectivePluginManager;
import org.dashbuilder.navigation.event.NavTreeChangedEvent;
import org.jboss.errai.bus.client.ErraiBus;
import org.jboss.errai.bus.client.api.Subscription;
import org.jboss.errai.enterprise.client.cdi.AbstractCDIEventCallback;
import org.jboss.errai.enterprise.client.cdi.api.CDI;
import org.jboss.errai.ioc.client.container.ContextManager;
import org.jboss.errai.ioc.client.container.Factory;
import org.jboss.errai.ioc.client.container.FactoryHandleImpl;

public class Type_factory__o_d_c_n_w_NavCarouselWidget__quals__j_e_i_Any_j_e_i_Default extends Factory<NavCarouselWidget> { public Type_factory__o_d_c_n_w_NavCarouselWidget__quals__j_e_i_Any_j_e_i_Default() {
    super(new FactoryHandleImpl(NavCarouselWidget.class, "Type_factory__o_d_c_n_w_NavCarouselWidget__quals__j_e_i_Any_j_e_i_Default", Dependent.class, false, null, true));
    handle.setAssignableTypes(new Class[] { NavCarouselWidget.class, BaseNavWidget.class, Object.class, NavWidget.class, IsWidget.class, HasDefaultNavItem.class });
  }

  public NavCarouselWidget createInstance(final ContextManager contextManager) {
    final View _view_0 = (NavCarouselWidgetView) contextManager.getInstance("Type_factory__o_d_c_n_w_NavCarouselWidgetView__quals__j_e_i_Any_j_e_i_Default");
    final NavigationManager _navigationManager_1 = (NavigationManagerImpl) contextManager.getInstance("Type_factory__o_d_c_n_i_NavigationManagerImpl__quals__j_e_i_Any_j_e_i_Default");
    final PerspectivePluginManager _perspectivePluginManager_2 = (RuntimePerspectivePluginManager) contextManager.getInstance("Type_factory__o_d_c_p_RuntimePerspectivePluginManager__quals__j_e_i_Any_j_e_i_Default");
    final NavCarouselWidget instance = new NavCarouselWidget(_view_0, _navigationManager_1, _perspectivePluginManager_2);
    registerDependentScopedReference(instance, _view_0);
    setIncompleteInstance(instance);
    thisInstance.setReference(instance, "onNavTreeChangedSubscription", CDI.subscribe("org.dashbuilder.navigation.event.NavTreeChangedEvent", new AbstractCDIEventCallback<NavTreeChangedEvent>() {
      public void fireEvent(final NavTreeChangedEvent event) {
        instance.onNavTreeChanged(event);
      }
      public String toString() {
        return "Observer: org.dashbuilder.navigation.event.NavTreeChangedEvent []";
      }
    }));
    thisInstance.setReference(instance, "onNavTreeChangedSubscriptionForNavTreeChangedEvent", ErraiBus.get().subscribe("cdi.event:org.dashbuilder.navigation.event.NavTreeChangedEvent", CDI.ROUTING_CALLBACK));
    setIncompleteInstance(null);
    return instance;
  }

  public void generatedDestroyInstance(final Object instance, final ContextManager contextManager) {
    destroyInstanceHelper((NavCarouselWidget) instance, contextManager);
  }

  public void destroyInstanceHelper(final NavCarouselWidget instance, final ContextManager contextManager) {
    ((Subscription) thisInstance.getReferenceAs(instance, "onNavTreeChangedSubscription", Subscription.class)).remove();
    ((Subscription) thisInstance.getReferenceAs(instance, "onNavTreeChangedSubscriptionForNavTreeChangedEvent", Subscription.class)).remove();
  }
}