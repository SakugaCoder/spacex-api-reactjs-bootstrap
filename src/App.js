import React, {useEffect, useState}  from 'react';
import { Card, Container, Row, Col, Button, Spinner, Alert} from 'react-bootstrap';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const spacex_api = "https://api.spacexdata.com/v3/launches";

function App() {

  const [launches, set_launches] = useState(<div></div>);

  const [spinner_visibility, set_spinner_visibility] = useState("block");

  useEffect(() => {
    fetch(spacex_api)
    .then(res => res.json())
    .then((res) => {
      console.log(res);
      set_launches(res.map( (launch, index) =>
      <Col key={index} md={4}  sm={6} xs={12} style={ {marginTop: "20px"} }>
        <Card>
          <Card.Img variant="top" src={launch.links.mission_patch_small} />
          <Card.Body>
            <Card.Title>{launch.mission_name}</Card.Title>
            <Card.Text className="text-justify">
              {launch.details}
            </Card.Text>
            <Button  size="sm" variant="outline-primary" href={launch.links.wikipedia} target="_blank">Wikipedia</Button>
            <Button className="ml-2" size="sm" variant="outline-danger" href={launch.links.video_link} target="_blank">Video</Button>
          </Card.Body>
        </Card>
      </Col>
    ));
    set_spinner_visibility("none");
    }, (error) => console.log(error));
  }, []);

  return (
    <Container>

      <Alert variant="dark">
        <h2 className="text-center">SpaceX Launches</h2>
      </Alert>
      
      <div className="launches">
        <div className="d-flex justify-content-center mt-5">
            <Spinner animation="border" variant="dark" style={ {display:spinner_visibility} }></Spinner>
        </div>
        <Row>
          {launches}
        </Row>
      </div>
    </Container>
  );
}

export default App;
