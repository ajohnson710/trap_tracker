import './App.css';
import { HashRouter, Routes, Route, Navigate } from 'react-router';
import store from "./store";
import { Provider } from "react-redux";
import TrapTracker from './TrapTracker';

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="TrapTracker" />} />
            <Route path="/TrapTracker/*" element={<TrapTracker />} />
          </Routes>
        </div>
      </Provider>
    </HashRouter>
  );
}

export default App;
