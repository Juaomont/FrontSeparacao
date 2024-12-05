import React, { useState } from "react";
import logo from "../assets/Bemol.png";

const NotaFiscal = () => {
  const [notaFiscal, setNotaFiscal] = useState("");
  const [materiais, setMateriais] = useState([]);
  const [quantidadesSeparadas, setQuantidadesSeparadas] = useState({});
  const [eanInput, setEanInput] = useState("");
  const [quantidadeInput, setQuantidadeInput] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  const handleBuscarNota = () => {
    if (notaFiscal === "123456") {
      setMateriais([
        {
          id: 1,
          descricao: "Lavitan A-Z Mulher 60 Comprimidos",
          quantidade: 10,
          unidade: "Un",
          skuBemol: "4004205",
          ean: "7897947606500",
          posicao: "PR.01.02", // Posição no depósito
          imagem: "imagem"
        },
        {
          id: 2,
          descricao: "Dorflex 300+35+50mg 10 Comprimidos",
          quantidade: 5,
          unidade: "Un",
          skuBemol: "4004205",
          ean: "7890987654321",
          posicao: "PR.08.05", // Posição no depósito
          imagem: "imagem"
          
        },
      ]);
      setQuantidadesSeparadas({});
      setMensagemErro("");
      setEanInput("");
      setQuantidadeInput("");
    } else {
      alert("Nota fiscal não encontrada.");
    }
  };

  const handleValidarEAN = () => {
    const materialEncontrado = materiais.find((material) => material.ean === eanInput);

    if (materialEncontrado) {
      const quantidadeSeparada = Number(quantidadeInput);
      if (
        quantidadeSeparada > 0 &&
        (quantidadesSeparadas[materialEncontrado.id] || 0) + quantidadeSeparada <=
          materialEncontrado.quantidade
      ) {
        setMensagemErro("");
        setQuantidadesSeparadas((prev) => ({
          ...prev,
          [materialEncontrado.id]: (prev[materialEncontrado.id] || 0) + quantidadeSeparada,
        }));
        setEanInput("");
        setQuantidadeInput("");
      } else {
        setMensagemErro("Quantidade inválida ou excedente.");
      }
    } else {
      setMensagemErro("EAN inválido. Tente novamente.");
    }
  };

  const podeFinalizarSeparacao = () => {
    return materiais.every(
      (material) =>
        quantidadesSeparadas[material.id] >= material.quantidade &&
        quantidadesSeparadas[material.id] !== undefined
    );
  };

  const handleFinalizarSeparacao = () => {
    if (podeFinalizarSeparacao()) {
      alert("Separação finalizada com sucesso!");
      setMateriais([]);
      setQuantidadesSeparadas({});
    } else {
      alert("Ainda há produtos pendentes.");
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      fontFamily: "'Roboto', sans-serif",
      backgroundColor: "#f4f4f4",
      minHeight: "100vh",
    },
    logo: {
      width: "220px",
      marginBottom: "20px",
    },
    header: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "",
      marginBottom: "50px",
    },
    inputGroup: {
      display: "flex",
      gap: "10px",
      marginBottom: "10px",
    },
    input: {
      padding: "6px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "14px",
      width: "150px",
      outline: "none",
    },
    button: {
      padding: "10px 20px",
      borderRadius: "5px",
      backgroundColor: "#007BFF",
      color: "#fff",
      fontSize: "16px",
      border: "none",
      cursor: "pointer",
    },
    buttonDisabled: {
      backgroundColor: "#ccc",
      color: "#666",
      cursor: "not-allowed",
    },
    materialCard: {
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      marginBottom: "15px",
      backgroundColor: "#fff",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      width: "80%",
      maxWidth: "600px",
    },
    errorMessage: {
      color: "red",
      marginTop: "10px",
    },
    centralButtonGroup: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <img src={logo} alt="Bemol Farma Logo" style={styles.logo} />
      <h2 style={styles.header}>Nota Fiscal </h2>
      {materiais.length === 0 && (
        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Nota Fiscal"
            value={notaFiscal}
            onChange={(e) => setNotaFiscal(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleBuscarNota} style={styles.button}>
            Buscar Nota
          </button>
        </div>
      )}
      {materiais.length > 0 && (
        <>
          {materiais.map((material) => {
            const quantidadeSeparada = quantidadesSeparadas[material.id] || 0;
            const faltando = material.quantidade - quantidadeSeparada;

            return (
              <div key={material.id} style={styles.materialCard}>
                <p><strong>Descrição:</strong> {material.descricao}</p>
                <p><strong>EAN:</strong> {material.ean}</p>
                <p><strong>Posição no Depósito:</strong> {material.posicao}</p>
                <p><strong>Quantidade Total:</strong> {material.quantidade} {material.unidade}</p>
                <p><strong>Faltando:</strong> {faltando > 0 ? faltando : "Completo"}</p>
              </div>
            );
          })}
          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="EAN"
              value={eanInput}
              onChange={(e) => setEanInput(e.target.value)}
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Quantidade"
              value={quantidadeInput}
              onChange={(e) => setQuantidadeInput(e.target.value)}
              style={styles.input}
            />
          </div>
          <button onClick={handleValidarEAN} style={styles.button}>
            Validar Produto
          </button>
          {mensagemErro && <p style={styles.errorMessage}>{mensagemErro}</p>}
          <div style={styles.centralButtonGroup}>
            <button
              style={{
                ...styles.button,
                ...(podeFinalizarSeparacao() ? {} : styles.buttonDisabled),
              }}
              onClick={handleFinalizarSeparacao}
              disabled={!podeFinalizarSeparacao()}
            >
              Finalizar Separação
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NotaFiscal;
