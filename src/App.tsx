import React from 'react';
import './App.scss'
import ClientApp from "./ClientApp";
import client from "./apollo/apollo";
import {Provider} from 'react-redux';
import {ApolloProvider} from '@apollo/client';
import configureStore from "./state/store";

function App() {
  const store = configureStore();
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ClientApp/>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
