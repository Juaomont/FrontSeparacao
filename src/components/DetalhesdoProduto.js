import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (quantity) {
      alert(`Quantidade confirmada: ${quantity}`);
      navigate("/dashboard");
    } else {
      alert("Por favor, insira a quantidade!");
    }
  };

  const styles = {
    container: {
      padding: "20px",
      fontFamily: "'Arial', sans-serif",
    },
    card: {
      backgroundColor: "#f4f4f4",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      marginBottom: "20px",
    },
    title: {
      fontSize: "20px",
      marginBottom: "10px",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      fontSize: "16px",
      border: "1px solid #ddd",
      borderRadius: "5px",
    },
    button: {
      width: "100%",
      padding: "12px",
      fontSize: "16px",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#0044cc",
      color: "#fff",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Produto</h2>
        <p><strong>Descrição:</strong> Exemplo de Produto</p>
        <p><strong>EAN:</strong> 1234567890123</p>
        <p><strong>Nota Fiscal:</strong> 987654321</p>
      </div>
      <input
        type="number"
        placeholder="Quantidade"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        style={styles.input}
      />
      <button
        onClick={handleConfirm}
        style={styles.button}
      >
        Confirmar
      </button>
    </div>
  );
};

export default ProductDetails;

