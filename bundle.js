(function (jsxRuntime, react, client) {
    'use strict';

    const root = document.getElementById('app');
    if (!root) {
        throw new Error("Could not find the app root");
    }
    client.createRoot(root).render(jsxRuntime.jsx(react.StrictMode, { children: jsxRuntime.jsx("h1", { children: "Hello, World!" }) }));

})(jsxRuntime, react, client);
