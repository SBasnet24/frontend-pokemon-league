import { usePokemonContext } from "../context/PokemonContext";
import { useState, useEffect } from "react";
import { useLeagueContext } from "../context/LeagueContext";
import { useForm } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, Form, Container, Spinner, Alert } from "react-bootstrap";
import { fillPokemonToSlot } from "../service/SlotService";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./components/Spinner";

const { Group, Label } = { ...Form };
const FillSlot = () => {
  const navigate = useNavigate();
  const { id: leagueId } = useParams();

  let { pokemons, getTrainersPokemons, isLoading } = usePokemonContext();
  const { leagues, getAllLeagues } = useLeagueContext();

  const league = leagues.length > 0 && leagues.find((league) => league.id === parseInt(leagueId));
  const [errors, setErrors] = useState({});

  const { control, handleSubmit } = useForm({
    defaultValue: {
      slot: [],
    },
  });

  const { fields, update } = useFieldArray({
    control,
    name: "slot",
  });

  useEffect(() => {
    if (league && pokemons.length) {
      [...Array(league.numberOfSlots).keys()].map((x, index) =>
        update(x, { id: index, pokemonIds: [] })
      );
    }
  }, [league, pokemons, leagueId]);

  useEffect(() => {
    getTrainersPokemons();
    getAllLeagues();
  }, []);

  const onSubmit = async (data) => {
    try {
      const buildSlotDetails = data.slot.map((value) => {
        return {
          id: value.id,
          pokemonIds: value.pokemonIds.map((pokemon) => pokemon.id),
          slotType: value.pokemonIds.length > 1 ? "pair" : "single",
        };
      });
      const response = await fillPokemonToSlot(buildSlotDetails, leagueId);
      if (response.success) {
        navigate("/leagues");
        toast.success("Slot filled successfully");
      }
    } catch (error) {
      if (Object.keys(error).length > 0) {
        setErrors(error);
      }
      toast.error(error);
    }
  };

  pokemons = pokemons.map((pokemon) => {
    return {
      ...pokemon,
      value: pokemon.id,
      label: pokemon.name,
    };
  });

  return isLoading || leagues.length === 0 ? (
    <Loader />
  ) : (
    <Container className="login-container">
      <div className="w-100">
        {
          <>
            <h3>{league.title}</h3>
            <Alert variant="warning">
              * Fill one or pair of pokemons for each slot
              <br />* Maximum stat limit for each slot is {league.statLimit}
            </Alert>
            <form onSubmit={handleSubmit(onSubmit)}>
              {fields.map((field, index) => {
                return (
                  <div key={index} className="mb-4">
                    <Controller
                      name={`slot[${index}].pokemonIds`}
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({
                        field: { value, onChange, ...otherOptions },
                      }) => {
                        return (
                          <div>
                            <Label className="label-login">
                              Slot {index + 1}
                            </Label>
                            <Select
                              onChange={(e) => {
                                if (e.length > 2) {
                                  return null;
                                }
                                return onChange(e);
                              }}
                              isMulti
                              value={value}
                              options={pokemons}
                              {...otherOptions}
                            />
                          </div>
                        );
                      }}
                    />
                    <div className="err-msg">{errors[index]?.errorMessage}</div>
                  </div>
                );
              })}
              <Group className="login-btn">
                <Button type="submit">
                  {isLoading ? <Spinner animation="border" /> : "Add"}
                </Button>
              </Group>
            </form>
          </>
        }
      </div>
    </Container>
  );
};

export default FillSlot;
