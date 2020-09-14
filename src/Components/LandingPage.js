import React from 'react';
import './LandingPage.css';
import Card from 'react-bootstrap/Card'

const LandingPage = () => {
  return (
    <>
    <div className="landing__page">

    <div className="landing__text">
    <h2>aqui va algo debe ir un texto que diga qlql con la app, cambiar fuente, y hacerlo mas grande en general pero por ahora esta bien</h2>
    </div>




    </div>

    <div className="landingPage__cards">
    <h2>Most popular blogs on the site </h2>
  {/* probablemente tenga que meter esto en su propio componente , pero hasta entonces lo dejare aqui*/}

      <Card
        bg="success"
        text="dark"
        style={{ width: '18rem' }}
        className="mb-2"
      >
        <Card.Header>POST TITLE OVER HERE</Card.Header>
        <Card.Body>
          <Card.Title>Card Title </Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk
            of the card's content.
          </Card.Text>
        </Card.Body>
    </Card>

    </div>

    </>


  );
}

export default LandingPage;
