/**
 * WebView Plugin for Eaves
 * Provides an embedded web browser view
 */

module.exports = {
  activate(context) {
    context.utils.log.info('WebView plugin activated');

    // Register the webview as a custom view
    context.ui.registerView({
      id: 'webview',
      title: 'Browser',
      icon: 'browser', // Uses IconName for theme support
      component: 'WebViewComponent', // References renderer component
    });

    // Listen for navigation events
    context.events.on('webview:navigate', (data) => {
      context.utils.log.info('WebView navigation:', data);

      // Store last visited URL
      context.utils.storage.set('lastUrl', data.url);
    });

    // Register a command to open specific URLs
    context.ui.registerCommand({
      id: 'webview.open',
      title: 'Open URL in WebView',
      handler: async () => {
        // This would trigger a modal or input in the UI
        context.ui.showNotification({
          title: 'WebView',
          message: 'Switch to Browser tab to navigate',
        });
      },
    });

    context.utils.log.info('WebView plugin registered successfully');
  },

  deactivate(context) {
    context.utils.log.info('WebView plugin deactivated');
  },
};
