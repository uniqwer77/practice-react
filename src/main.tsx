import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app/App.tsx';
import './index.css';
import { Provider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
);