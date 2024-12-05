import React, { useState } from "react";
import logo from "../assets/Bemol.png";
import imagem from "../assets/lavitan.png";
import imagem2 from "../assets/imagem2.webp";

const NotaFiscal = () => {
  const [notaFiscal, setNotaFiscal] = useState("");
  const [materiais, setMateriais] = useState([]);
  const [quantidadesSeparadas, setQuantidadesSeparadas] = useState({});
  const [indiceAtual, setIndiceAtual] = useState(0);
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
          posicao: "PR.01.02",
          imagem: imagem,
        },
        {
          id: 2,
          descricao: "Dorflex 300+35+50mg 10 Comprimidos",
          quantidade: 5,
          unidade: "Un",
          skuBemol: "4004205",
          ean: "7890987654321",
          posicao: "PR.08.05",
          imagem: imagem2,
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
    const materialAtual = materiais[indiceAtual];

    if (materialAtual && eanInput === materialAtual.ean) {
      const quantidadeSeparada =
        quantidadesSeparadas[materialAtual.id] || 0;

      if (
        quantidadeSeparada + Number(quantidadeInput) <= materialAtual.quantidade
      ) {
        setMensagemErro("");
        setQuantidadesSeparadas((prev) => ({
          ...prev,
          [materialAtual.id]: quantidadeSeparada + Number(quantidadeInput),
        }));
        setEanInput("");
        setQuantidadeInput("");

        if (indiceAtual < materiais.length - 1) {
          setIndiceAtual(indiceAtual + 1);
        } else {
          alert("Todos os itens foram separados!");
        }
      } else {
        setMensagemErro("Quantidade inválida ou excedente.");
      }
    } else {
      setMensagemErro("EAN inválido. Tente novamente.");
    }
  };

  const handleProximoProduto = () => {
    if (indiceAtual < materiais.length - 1) {
      setIndiceAtual(indiceAtual + 1);
      setMensagemErro("");
      setEanInput("");
      setQuantidadeInput("");
    }
  };

  const handleVoltarProduto = () => {
    if (indiceAtual > 0) {
      setIndiceAtual(indiceAtual - 1);
      setMensagemErro("");
      setEanInput("");
      setQuantidadeInput("");
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
      setIndiceAtual(0);
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
    materialCard: {
      padding: "15px",
      marginBottom: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: "#fff",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "600px",
      textAlign: "left",
    },
    centralButtonGroup: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      marginTop: "20px",
    },
  };

  const materialAtual = materiais[indiceAtual];

  if (!materialAtual) {
    return (
      <div style={styles.container}>
        <img src={logo} alt="Bemol Farma Logo" style={styles.logo} />
        <h2>Nota Fiscal</h2>
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
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Detalhe do Produto</h2>
      <div style={styles.materialCard}>
        <p><strong>Descrição:</strong> {materialAtual.descricao}</p>
        <p><strong>EAN:</strong> {materialAtual.ean}</p>
        <p><strong>SKU:</strong> {materialAtual.skuBemol}</p>
        <p><strong>Posição no Depósito:</strong> {materialAtual.posicao}</p>
        <p>
          <strong>Quantidade Total:</strong> {materialAtual.quantidade}{" "}
          {materialAtual.unidade}
        </p>
        <div style={{ textAlign: "center", padding: "15px" }}>
          <img src={materialAtual.imagem} alt="Imagem Produto" width="150px" />
        </div>
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
            placeholder="Qtd"
            value={quantidadeInput}
            onChange={(e) => setQuantidadeInput(e.target.value)}
            style={styles.input}
          />
        </div>
        <button onClick={handleValidarEAN} style={styles.button}>
          Validar Produto
        </button>
        {mensagemErro && <p style={{ color: "red" }}>{mensagemErro}</p>}
      </div>
      <div style={styles.centralButtonGroup}>
        <button
          onClick={handleVoltarProduto}
          style={styles.button}
          disabled={indiceAtual === 0}
        >
          {"<"}
        </button>
        <button
          onClick={handleProximoProduto}
          style={styles.button}
          disabled={indiceAtual === materiais.length - 1}
        >
          {">"}
        </button>
      </div>
      <div style={styles.centralButtonGroup}>
        <button
          onClick={handleFinalizarSeparacao}
          style={{
            ...styles.button,
            backgroundColor: podeFinalizarSeparacao() ? "#007BFF" : "#ccc",
            cursor: podeFinalizarSeparacao() ? "pointer" : "not-allowed",
          }}
          disabled={!podeFinalizarSeparacao()}
        >
          Finalizar Separação
        </button>
      </div>
    </div>
  );
};

export default NotaFiscal;
