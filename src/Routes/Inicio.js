import React from 'react';
import LandingPage from '../Components/Inicio/Inicio';
import Footer from '../Components/Footer/Footer';

class Inicio extends React.Component {
  render() {
    return (
      <React.Fragment>
        <LandingPage />
        <Footer />
      </React.Fragment>
    );
  }
}

export default Inicio;
