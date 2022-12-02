import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, Container, Spinner } from "react-bootstrap";
import { addPokemon } from "../service/PokemonService";
import { useState } from 'react';

const { Group, Label, Control, Select } = { ...Form };
const pokemonTypes = [
  {
    title: "Water",
    value: "water",
  },
  {
    title: "Air",
    value: "air",
  },
  {
    title: "Land",
    value: "land",
  },
  {
    title: "Dark",
    value: "dark",
  },
  {
    title: "Fire",
    value: "fire",
  },
  {
    title: "Electric",
    value: "electric",
  },
];

const AddPokemon = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, control } = useForm();
  const [isLoading, setLoading] = useState();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await addPokemon(data);
      if (response) {
        toast.success("Pokemon addedd successfully");
        setLoading(false);
        navigate("/pokemons");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error);
    }
  };

  const onError = (errors) => {
    errors &&
      Object.values(errors).map((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div className="App">
      <Container className="login-container">
        <form className="login-form" onSubmit={handleSubmit(onSubmit, onError)}>
          <h3>Add Pokemon </h3>
          <Group className="mt-3">
            <Label className="label-login">Name</Label>
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Name is required",
              }}
              defaultValue=""
              render={({ field }) => (
                <Control type="text" className="login-input" {...field} />
              )}
            />
          </Group>
          <Group className="mt-3">
            <Label className="label-login">Type</Label>
            <Select
              className="login-input"
              {...register("type", {
                required: { value: true, message: "Type is required" },
              })}
            >
              {pokemonTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.title}
                </option>
              ))}
            </Select>
          </Group>
          <Group className="mt-3">
            <Label className="label-login">Attack</Label>
            <Controller
              name="attack"
              control={control}
              rules={{
                required: "Attack is required",
              }}
              defaultValue=""
              render={({ field }) => (
                <Control type="number" min={1} className="login-input" {...field} />
              )}
            />
          </Group>
          <Group className="mt-3">
            <Label className="label-login">Speed</Label>
            <Controller
              name="speed"
              control={control}
              rules={{
                required: "Speed is required",
              }}
              defaultValue=""
              render={({ field }) => (
                <Control type="number" min={1} className="login-input" {...field} />
              )}
            />
          </Group>
          <Group className="mt-3">
            <Label className="label-login">Defense</Label>
            <Controller
              name="defense"
              control={control}
              rules={{
                required: "Defense is required",
              }}
              defaultValue=""
              render={({ field }) => (
                <Control type="number" min={1} className="login-input" {...field} />
              )}
            />
          </Group>
          <Group className="login-btn">
            <Button type="submit">{isLoading ? <Spinner animation="border" /> : "Add"}</Button>
          </Group>
        </form>
      </Container>
    </div>
  );
};

export default AddPokemon;
