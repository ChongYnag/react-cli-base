import routes, { onRouterBefore } from "./routers";
import { BrowserRouter } from "react-router-dom"
import RouterGuard from './routers/guard';
import Loading from './components/loading';

const App = function () {
  return <BrowserRouter>
    <RouterGuard
      routers={routes}
      onRouterBefore={onRouterBefore}
      loading={<Loading />}
    />
  </BrowserRouter>;
};
export default App;
