import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
//page and layouts

import HomePage from "./pages/Homepage";
import Category from "./pages/Category";
import ReviewDetails from "./pages/ReviewDetails";
import SiteHeader from "./components/siteHeader";

//Apollo client

const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <Router>
      <ApolloProvider client = {client}>
        <div className="App">
          <SiteHeader />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/category/:id">
              <Category />
            </Route>
            <Route path="/details/:id">
              <ReviewDetails />
            </Route>
          </Switch>
        </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
