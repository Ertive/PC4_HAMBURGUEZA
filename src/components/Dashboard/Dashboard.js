import React, { useState } from "react";
import { connect } from "react-redux";
import { loginSuccess, loginFailure } from "../../actions/authActions2";
import "./style.css";

import data from "./Ingredientes.json";

const Dashboard = ({ isAuthenticated, loginSuccess, loginFailure }) => {
  const ingredientes = data.cocina || [];
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState([]);

  const arrayOrdenEstablecido = [
    "Pan inferior",
    "Lechuga",
    "Tomate",
    "Mortadella",
    "Salsa secreta",
    "Pan superior",
  ];
  
  const handleIngredientClick = (ingrediente) => {
    const nuevosIngredientes = [...ingredientesSeleccionados];
    const index = nuevosIngredientes.findIndex((i) => i.nombre === ingrediente.nombre);

    if (index === -1) {
      nuevosIngredientes.push(ingrediente);
    } else {
      nuevosIngredientes.splice(index, 1);
    }

    setIngredientesSeleccionados(nuevosIngredientes);
  };

  const compararArrays = () => {
    const esOrdenCorrecto =
      JSON.stringify(ingredientesSeleccionados.map((i) => i.nombre)) ===
      JSON.stringify(arrayOrdenEstablecido);

    console.log("ingredientesSeleccionados:", ingredientesSeleccionados.map((i) => i.nombre));
    console.log("arrayOrdenEstablecido:", arrayOrdenEstablecido);

    if (esOrdenCorrecto) {
      setIngredientesSeleccionados([]);
      const additionalImage =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvsHPBkgK2ynYvLFrAOHKbtny1Kk4zMaSo4g&usqp=CAU";
      const img = new Image();
      img.src = additionalImage;
      img.alt = "Hamburguesa lograda";
      img.id = "img_flotante";
      document.body.appendChild(img);
      img.style.position = "fixed";
      img.style.width = "70vh";
      img.style.height = "70vh";
      img.style.zIndex = "999";
      img.style.right = "20%";
      img.style.top = "15%";
      img.style.borderRadius = "30px";
    }else {
      setIngredientesSeleccionados([]);
      alert("PREPARA BONITO BOB ESPONJA");
     
    }
  };

  const reversedIngredientesSeleccionados = [...ingredientesSeleccionados].reverse();

  return (
    <div className="container">
      <main>
        <section className="ingredientes">
          <div className="lista">
            <ul>
              {ingredientes.map((ingrediente, index) => (
                <li
                  key={index}
                  onClick={() => handleIngredientClick(ingrediente)}
                >
                  {ingrediente.nombre}
                </li>
              ))}
            </ul>
          </div>
          <button type="button" onClick={compararArrays}> Cocinar</button>
        </section>
        <section className="muestra">
          {reversedIngredientesSeleccionados.length > 0 ? (
            <>
              {reversedIngredientesSeleccionados.map((ingrediente, index) => (
                <span key={index}>
                  <img src={ingrediente.img} alt={ingrediente.nombre} />
                </span>
              ))}
            </>
          ) : (
            "Selecciona un ingrediente"
          )}
        </section>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps, { loginSuccess, loginFailure })(Dashboard);