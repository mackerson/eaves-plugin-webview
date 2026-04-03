import { jsxs as a, jsx as n } from "/node_modules/react/jsx-runtime";
import { useState as d, useRef as f } from "/node_modules/react";
const { Button: l, Input: m } = window.EnclaveAPI.UI;
function k() {
  const [s, h] = d("https://www.example.com"), [o, w] = d("https://www.example.com"), t = f(null), i = () => {
    var r, c;
    let e = s;
    !e.startsWith("http://") && !e.startsWith("https://") && (e = "https://" + e), w(e), (c = (r = window.EnclaveAPI.electron) == null ? void 0 : r.send) == null || c.call(r, "plugin-event", {
      pluginId: "com.enclave.webview",
      event: "webview:navigate",
      data: { url: e }
    });
  };
  return /* @__PURE__ */ a("div", { className: "flex flex-col h-full bg-background", children: [
    /* @__PURE__ */ a("div", { className: "flex items-center gap-2 p-3 border-b border-border", children: [
      /* @__PURE__ */ a("div", { className: "flex gap-1", children: [
        /* @__PURE__ */ n(
          l,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => {
              var e;
              (e = t.current) != null && e.contentWindow && t.current.contentWindow.history.back();
            },
            className: "h-8 w-8 p-0",
            title: "Back",
            children: "←"
          }
        ),
        /* @__PURE__ */ n(
          l,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => {
              var e;
              (e = t.current) != null && e.contentWindow && t.current.contentWindow.history.forward();
            },
            className: "h-8 w-8 p-0",
            title: "Forward",
            children: "→"
          }
        ),
        /* @__PURE__ */ n(
          l,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => {
              t.current && (t.current.src = o);
            },
            className: "h-8 w-8 p-0",
            title: "Refresh",
            children: "↻"
          }
        )
      ] }),
      /* @__PURE__ */ n(
        m,
        {
          type: "text",
          value: s,
          onChange: (e) => h(e.target.value),
          onKeyPress: (e) => {
            e.key === "Enter" && i();
          },
          placeholder: "Enter URL...",
          className: "flex-1"
        }
      ),
      /* @__PURE__ */ n(
        l,
        {
          onClick: i,
          size: "sm",
          children: "Go"
        }
      )
    ] }),
    /* @__PURE__ */ n("div", { className: "flex-1 relative", children: /* @__PURE__ */ n(
      "iframe",
      {
        ref: t,
        src: o,
        className: "absolute inset-0 w-full h-full border-0",
        title: "Web View",
        sandbox: "allow-same-origin allow-scripts allow-popups allow-forms"
      }
    ) })
  ] });
}
export {
  k as WebViewComponent,
  k as default
};
//# sourceMappingURL=index.js.map
