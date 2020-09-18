import React from 'react';
import Card from 'react-bootstrap/Card';

const CardComponent = ({data}) => {


  console.log(data.title, data.content);

  return <div className="card__container">

    <Card
        bg="success"
        text="dark"
        style={{ width: '18rem' }}
        className="mb-2"
      >
        <Card.Header>{data.title}</Card.Header>
        <Card.Body>
          <Card.Title>Card Title </Card.Title>
          <Card.Text>
           {data.content}
          </Card.Text>
        </Card.Body>
    </Card>

  </div>
};

export default CardComponent;
