// app.js

import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import EmployeeDirectory from "./components/EmployeeDirectory";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import "./App.css";
import EmployeeCreate from "./components/EmployeCreate";
import EmployeeDetails from "./components/EmployeeDetails";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:5100/graphql",
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<EmployeeDirectory/>}/>
          <Route path="/add-employee" element={<EmployeeCreate/>}/>
          <Route path="/employee/:id" element={<EmployeeDetails/>}/>
        </Routes>
        <Footer/>
      </Router>
    </ApolloProvider>
  );
}

export default App;
