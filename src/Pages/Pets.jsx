import { useState } from "react";
import { createPet } from "../client/pets";

const Pets = () => {
  const [error, setError] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const kind = form.kind.value;

    if (!name || !kind) {
      setError("Please fill all required fields");
      return;
    }

    setError("");

    const pet = {
      name: name,
      kind: kind
    }

    createPet(pet);
    alert("Your pet adopted!");
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <input type="text" name="name" />

      <input type="radio" id="cat" name="kind" value="cat" />
      <label htmlFor="cat">Cat</label>

      <input type="radio" id="dog" name="kind" value="dog" />
      <label htmlFor="dog">Dog</label>

      <input type="radio" id="reptile" name="kind" value="reptile" />
      <label htmlFor="reptile">Reptile</label>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Adopt</button>
    </form>
  )
}

export default Pets;