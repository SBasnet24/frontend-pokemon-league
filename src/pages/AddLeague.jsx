import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, Container, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { addLeague } from "../service/LeagueService";
import { useState } from "react";

const { Group, Label, Control } = { ...Form };

const AddLeague = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await addLeague(data);
      if (response) {
        setLoading(false);
        toast.success("League addedd successfully");
        navigate("/leagues");
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
          <h3>Add League </h3>
          <Group className="mt-3">
            <Label className="label-login">Title</Label>
            <Controller
              name="title"
              control={control}
              rules={{
                required: "Title is required",
              }}
              defaultValue=""
              render={({ field }) => (
                <Control type="text" className="login-input" {...field} />
              )}
            />
          </Group>
          <Group className="mt-3">
            <Label className="label-login">Location</Label>
            <Controller
              name="location"
              control={control}
              rules={{
                required: "Location is required",
              }}
              defaultValue=""
              render={({ field }) => (
                <Control type="text" className="login-input" {...field} />
              )}
            />
          </Group>
          <Group className="mt-3">
            <Label className="label-login">Terrain</Label>
            <Controller
              name="terrain"
              control={control}
              rules={{
                required: "Terrain is required",
              }}

              defaultValue=""
              render={({ field }) => (
                <Control type="text"  className="login-input" {...field} />
              )}
            />
          </Group>
          <Group className="mt-3">
            <Label className="label-login">League Start Date</Label>
            <Controller
              name={"leagueStartDate"}
              control={control}
              rules={{ required: "League Start Date is required" }}
              defaultValue={new Date()}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  onChange={onChange}
                  selected={value}
                  placeholderText="Enter your birth date"
                />
              )}
            />
          </Group>
          <Group className="mt-3">
            <Label className="label-login">Number Of Slots</Label>
            <Controller
              name="numberOfSlots"
              control={control}
              rules={{
                required: "Number of Slots is required",
              }}
              defaultValue=""
              render={({ field }) => (
                <Control type="number" min={1} className="login-input" {...field} />
              )}
            />
          </Group>
          <Group className="mt-3">
            <Label className="label-login">Stats Limit</Label>
            <Controller
              name="statLimit"
              control={control}
              rules={{
                required: "Stats Limit is required",
              }}
              defaultValue=""
              render={({ field }) => (
                <Control type="number" min={1} className="login-input" {...field} />
              )}
            />
          </Group>
          <Group className="login-btn">
            <Button type="submit">
              {isLoading ? <Spinner animation="border" /> : "Add"}
            </Button>
          </Group>
        </form>
      </Container>
    </div>
  );
};

export default AddLeague;
