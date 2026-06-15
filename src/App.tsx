import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./App.scss";
import client from "./apollo/apollo";
import Routing from "./components/routes/Routes";
import configureStore from "./state/store";

const { store, persistor } = configureStore();

function App() {
 
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routing />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
