import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../../assets/img/header.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

const styles = {
  textContainer: {
    marginTop: '-200px', // Adjust this value as needed
  },
};

export const Banner = () => {
  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div
                  className={isVisible ? "animate__animated animate__fadeIn" : ""}
                  style={styles.textContainer}
                >
                  <h1>Hi! I'm Sychonix</h1>
                  <h4>is an Independent node validator.</h4>
                  <br></br>
                  <i>
                    <q>
                      Dedicated to running reliable and efficient blockchain nodes, contributing to the future of
                      blockchain technology.
                    </q>
                  </i>
                </div>
              }
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img" />
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
