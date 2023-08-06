import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { GroupsProvider } from './context/GroupsProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <GroupsProvider>
        <App />
      </GroupsProvider>
    </AuthProvider>
  </BrowserRouter>
);
