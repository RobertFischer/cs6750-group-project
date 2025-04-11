import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const root = document.getElementById('app');
if(!root) {
  throw new Error("Could not find the app root");
}

createRoot(root).render(
  <StrictMode>
    <h1>Hello, World!</h1>
  </StrictMode>
);

