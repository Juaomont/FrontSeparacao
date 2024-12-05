import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Bemol.png";

const Menu = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f9f9f9",
      fontFamily: "'Roboto', sans-serif",
    },
    logo: {
      width: "300px",
      marginBottom: "20px",
    },
    button: {
      padding: "10px 10px", // Ajuste no tamanho do botão
      fontSize: "18px", // fonte para melhorar a aparência
      fontWeight: "bold",
      backgroundColor: "#007BFF",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      marginBottom: "15px",
      width: "20%", // botão responsivo
      textAlign: "center",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <div style={styles.container}>
      <img src={logo} alt="Bemol Logo" style={styles.logo} />
      <button
        style={styles.button}
        onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        onClick={() => navigate("/ordem-venda")}
      >
        Separação por Ordem de Venda
      </button>
      <button
        style={styles.button}
        onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        onClick={() => navigate("/nota-fiscal")}
      >
        Separação por Nota Fiscal
      </button>
    </div>
  );
};

export default Menu;
