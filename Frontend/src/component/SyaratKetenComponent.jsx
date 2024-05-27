import { Card, Col, Container, Row } from 'react-bootstrap';
import '../assets/styles/sidebar.css';
const SyaratKetenComponent = () => {
  return (
    <div className="syaratketen">
      <Container>
        <Row>
          <Col>
            <h1 className=" p-5 text-center fw-bold animate__animated animate__fadeInUp animate__delay-1s">
              Syarat & Ketentuan
            </h1>
          </Col>
        </Row>
        <Card className="animate__animated animate__fadeInUp animate__delay-1s mb-5 rounded-3">
          <Row className="p-3">
            <Col>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Molestias, doloribus ea voluptatem nesciunt distinctio est
                possimus veritatis perspiciatis itaque eius, ut incidunt
                reprehenderit, enim placeat ipsa maxime illo atque ab?
              </p>
            </Col>
          </Row>
          <Row className="p-3">
            <Col>
              <h4>Lorem1</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
                in, ab ipsam sunt distinctio eaque commodi consequatur magni
                impedit consequuntur? Id est iusto provident reiciendis?
                Perspiciatis, accusamus nostrum. Ut, est.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit
                quia, ut a beatae neque suscipit. Tempore nam totam doloremque
                vero, ducimus modi ad recusandae laborum quidem architecto,
                asperiores quasi libero officiis! Corrupti eum illum modi
                inventore veritatis reiciendis odio sed, aliquid, autem totam
                consectetur accusamus accusantium adipisci explicabo qui nihil,
                vitae quidem minus quasi error. Perspiciatis magnam quam
                suscipit fugit.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam
                dolorum quod ducimus porro sint. Repellat tempore natus dicta
                error, corporis voluptate officia quidem veritatis nesciunt,
                aspernatur, neque minus. Eos nobis est quia veniam accusamus
                fuga, maxime, tempora, quisquam perferendis corrupti officiis
                explicabo doloribus quod optio ducimus doloremque aliquid iure
                sed? Pariatur, eos dolorem totam molestiae reiciendis culpa
                dolor numquam officia blanditiis facilis perspiciatis
                reprehenderit ullam autem aspernatur harum iure consequatur hic
                laudantium commodi tempore accusantium nisi. Officiis, dolores
                maiores! Earum.
              </p>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
};

export default SyaratKetenComponent;
