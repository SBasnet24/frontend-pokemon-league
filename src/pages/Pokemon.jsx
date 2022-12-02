import { Container, Row, Col } from "react-bootstrap";
import { usePokemonContext } from "../context/PokemonContext";
import { useEffect } from "react";
import PokemonCard from "./components/PokemonCard";
import Loader from "./components/Spinner";

const PokemonPage = () => {
  const { pokemons, getTrainersPokemons, isLoading } = usePokemonContext();

  useEffect(() => {
    getTrainersPokemons();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {pokemons.length === 0 ? (
        <>
          <Container className="mt-4 text-center">
            <h3>You do not have any pokemons, Add pokemons</h3>
          </Container>
        </>
      ) : (
        <div className="App">
          <Container className="mt-4">
            <Row>
              {pokemons.map((pokemon) => (
                <Col key={pokemon.id} md={3} className="mb-3">
                  <PokemonCard pokemon={pokemon} />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default PokemonPage;
