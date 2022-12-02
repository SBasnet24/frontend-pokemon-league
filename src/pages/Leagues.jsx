import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  ListGroup,
} from "react-bootstrap";
import { useLeagueContext } from "../context/LeagueContext";
import { useEffect } from "react";
import Spinner from "./components/Spinner";
import { useNavigate } from "react-router-dom";

const { Header, Body, Title } = { ...Card };

const Leagues = () => {
  const navigate = useNavigate();
  const { leagues, getAllLeagues, isLoading } = useLeagueContext();
  const trainerId = localStorage.getItem('trainerId');

  useEffect(() => {
    getAllLeagues();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="App">
      <Container className="mt-4">
        <Row>
          {leagues.map((league) => {
            const participants = league.participants;
            const hasUserAlreadyParticipated = !!participants.find((participant) => participant.trainerId === parseInt(trainerId));
            return (
              <Col key={league.id} md="6" className="mb-3">
                <Card className="league-card">
                  <Header as="h5">
                    {league.title}
                    <Badge className="mx-2 card-badge" bg="secondary">
                      {new Date(league.leagueStartDate).toDateString()}
                    </Badge>
                  </Header>

                  <Body>
                    <Title>{league.location}</Title>
                    <div className="mt-3 mb-3">
                      <Badge className="card-inner" bg="">
                        Number of Slots:{league.numberOfSlots}
                      </Badge>
                      <Badge className="mx-2 card-inner" bg="">
                        Maximum Stat Limit: {league.statLimit}
                      </Badge>
                      <Badge className="mx-2 card-inner" bg="">
                        Terrain: {league.terrain}
                      </Badge>
                    </div>
                    <div>
                      <Card className="w-50">
                        <Header>Participants</Header>
                        <ListGroup variant="flush">
                          {participants.map((participant) => (
                            <>
                              <ListGroup.Item key={participant.id}>
                                {participant?.trainer?.username}
                              </ListGroup.Item>
                            </>
                          ))}
                        </ListGroup>
                      </Card>
                    </div>
                    <Button
                      onClick={(e) =>
                        navigate(`/league/${league.id}/fill-slot`)
                      }
                      className="mt-3"
                      variant="primary"
                      disabled={hasUserAlreadyParticipated}
                    >
                      Fill Slot
                    </Button>
                  </Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Leagues;
