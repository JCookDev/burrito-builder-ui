import React, { Component } from "react";

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: "",
      ingredients: [],
    };
  }

  handleNameChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleIngredientChange = (event) => {
    event.preventDefault();
    this.setState({
      ingredients: [...this.state.ingredients, event.target.name],
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      id: Date.now(),
      ...this.state,
    };
    this.props.addOrder(newOrder);
    this.clearInputs();
  };

  clearInputs = () => {
    this.setState({ name: "", ingredients: [] });
  };

  render() {
    const possibleIngredients = [
      "beans",
      "steak",
      "carnitas",
      "sofritas",
      "lettuce",
      "queso fresco",
      "pico de gallo",
      "hot sauce",
      "guacamole",
      "jalapenos",
      "cilantro",
      "sour cream",
    ];
    const ingredientButtons = possibleIngredients.map((ingredient) => {
      return (
        <button
          key={ingredient}
          name={ingredient}
          onClick={(e) => this.handleIngredientChange(e)}
        >
          {ingredient}
        </button>
      );
    });

    return (
      <form>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={this.state.name}
          onChange={(e) => this.handleNameChange(e)}
        />
        <div className='ingredient-buttons-container'>
          {ingredientButtons}
        </div>

        <p>Order: {this.state.ingredients.join(", ") || "Nothing selected"}</p>

        <button onClick={(e) => this.handleSubmit(e)}>Submit Order</button>
      </form>
    );
  }
}

export default OrderForm;
