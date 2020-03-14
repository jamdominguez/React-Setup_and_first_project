import React, { Component } from "react"; //imports necessary
import ReactDom from "react-dom";

class Form extends Component { //inheritance from Component
  constructor(){ //reserved method
    super();
    this.state = {
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    const { value } = event.target;
    this.setState(()=>{
      return {
        value
      };
    });
  }

  render(){ //how print the component
    return (
      <form>
        <input type="text" value="this.state.value" onChange={this.handleChange}/>
      </form>
    );
  }
}

export default Form; //export the class
const wrapper = document.getElementById("container");
wrapper ? ReactDom.render(<Form />, wrapper) : false;