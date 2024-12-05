import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Bemol.png"; // Certifique-se de que a imagem está no diretório correto

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "16435" && password === "1234") {
      navigate("/selection");
    } else {
      setErrorMessage("Usuário ou senha incorretos.");
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "'Roboto', sans-serif",
      maxWidth: "400px",
      margin: "auto",
      backgroundColor: "#ffffff", // Fundo branco
      color: "#333",
      height: "100vh",
    },
    logo: {
      width: "300px",
      marginBottom: "20px",
    },
    header: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#007BFF", // Azul para destaque
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "10px",
      fontSize: "14px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      outline: "none",
      backgroundColor: "#f9f9f9",
      color: "#333",
    },
    button: {
      width: "50%",
      padding: "12px",
      fontSize: "16px",
      fontWeight: "bold",
      backgroundColor: "#007BFF", // Azul para os botões principais
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      marginBottom: "10px",
      marginLeft: "100px",
    },
    error: {
      color: "red",
      fontSize: "12px",
      marginTop: "10px",
    },
    showPassword: {
      display: "flex",
      alignItems: "center",
      marginBottom: "10px",
    },
    checkbox: {
      marginLeft: "5px",
    },
  };

  return (
    <div style={styles.container}>
      <img src={logo} alt="Logo Bemol Farma" style={styles.logo} />
      
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <div style={styles.showPassword}>
          <label>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              style={styles.checkbox}
            />
            Mostrar Senha
          </label>
        </div>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        <button type="submit" style={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
