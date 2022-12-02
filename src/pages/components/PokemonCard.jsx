import { Card, Badge } from "react-bootstrap";
const { Body, Title } = { ...Card };

const PokemonCard = ({ pokemon }) => {
  const { name, type, attack, defense, speed, totalStats } = pokemon;
  return (
    <Card>
      <Body>
        <Title className="d-flex align-items-center card-title">
          {name}
          <Badge className="mx-2 card-badge" bg="secondary">
            {type}
          </Badge>
        </Title>
        <div className="mt-3 mb-3">
          <Badge className="card-inner" bg="">
            Attack:{attack}
          </Badge>
          <Badge className="mx-2 card-inner" bg="">
            Defense: {defense}
          </Badge>
          <Badge className="mx-2 card-inner" bg="">
            Speed: {speed}
          </Badge>
        </div>
        <Badge className="mb-2 card-inner" bg="secondary">
          Total: {totalStats}
        </Badge>
      </Body>
    </Card>
  );
};

export default PokemonCard;
