import {ApolloClient, InMemoryCache, createHttpLink} from "@apollo/client";
import {setContext} from '@apollo/client/link/context';

const authLink = setContext((_, {headers}) => {
  // get the authentication token from local storage if it exists
  const token:string|null = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    }
  }
});

const httpLink = createHttpLink({
  uri: 'http://localhost:3002/graphql',
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
