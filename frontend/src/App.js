import React from "react";
import { Container } from "react-bootstrap";
import Header from "./componenets/Header";
import Footer from "./componenets/Footer";
import HomeScreen from "./screens/HomeScreen";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
        <HomeScreen/>
        </Container>
      </main>
      <Footer/>
      
    </>
  );
};

export default App;
