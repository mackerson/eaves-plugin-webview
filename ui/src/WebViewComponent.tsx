import React, { useState, useRef } from 'react';

// Access UI components from the host app's API
declare global {
  interface Window {
    EavesAPI: {
      React: typeof React;
      ReactDOM: typeof import('react-dom');
      UI: {
        Button: React.ComponentType<any>;
        Input: React.ComponentType<any>;
      };
      electron?: {
        send?: (channel: string, data: any) => void;
      };
    };
  }
}

const { Button, Input } = window.EavesAPI.UI;

/**
 * WebView Component
 * Simple embedded browser using iframe
 */
export function WebViewComponent() {
  const [url, setUrl] = useState('https://www.example.com');
  const [currentUrl, setCurrentUrl] = useState('https://www.example.com');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleNavigate = () => {
    let navigateUrl = url;

    // Add protocol if missing
    if (!navigateUrl.startsWith('http://') && !navigateUrl.startsWith('https://')) {
      navigateUrl = 'https://' + navigateUrl;
    }

    setCurrentUrl(navigateUrl);

    // Emit navigation event for plugin
    window.EavesAPI.electron?.send?.('plugin-event', {
      pluginId: 'com.eaves.webview',
      event: 'webview:navigate',
      data: { url: navigateUrl }
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNavigate();
    }
  };

  const handleBack = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.history.back();
    }
  };

  const handleForward = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.history.forward();
    }
  };

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = currentUrl;
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Navigation Bar */}
      <div className="flex items-center gap-2 p-3 border-b border-border">
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="h-8 w-8 p-0"
            title="Back"
          >
            ←
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleForward}
            className="h-8 w-8 p-0"
            title="Forward"
          >
            →
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            className="h-8 w-8 p-0"
            title="Refresh"
          >
            ↻
          </Button>
        </div>

        <Input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter URL..."
          className="flex-1"
        />

        <Button
          onClick={handleNavigate}
          size="sm"
        >
          Go
        </Button>
      </div>

      {/* Web Content */}
      <div className="flex-1 relative">
        <iframe
          ref={iframeRef}
          src={currentUrl}
          className="absolute inset-0 w-full h-full border-0"
          title="Web View"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </div>
  );
}
