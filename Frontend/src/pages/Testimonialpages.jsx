import {Container, Row, Col} from "react-boostrap";
import {testimonial} from "../data/index";

import FaqComponent from "../component/FaqComponent";

const Testimonialpages = () => {
  return (
    <div className="testimonial-page">
      <div className="testimonial">
        <Container>
          <Row>
            <Col>
            <h1 className="text-center fw-bold">Testimonial</h1>
            <p className="text-center">yuk simak apa kata mereka</p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Testimonialpages;