import { BrowserRouter, Route, Switch } from "react-router-dom";


import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";
import{AdminRoom} from './pages/AdminRoom.jsx';

import { AuthContextProvider } from "./contexts/AuthContext.jsx";
function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route exact path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom}/>
          <NewRoom />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
