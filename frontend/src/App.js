import React, { useState } from "react";
import EmployeeDirectory from "./components/EmployeeDirectory";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { PAGES } from "./enum";
import "./App.css";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:5100/graphql",
  });

  const [currentPage, setCurrentPage] = useState(PAGES.EMPLOYEE_LIST);
  return (
    <ApolloProvider client={client}>
      <Header currentPage={currentPage} changePage={setCurrentPage} />
      <EmployeeDirectory currentPage={currentPage} />
      <Footer />
    </ApolloProvider>
  );
}

export default App;
