import React, { useEffect, useState } from "react";
import logo from "../assets/Bemol.png";
import getProductSAP from "../services/getProductSAP";

const OrdemVenda = () => {
  const [centro, setCentro] = useState("");
  const [ordens, setOrdens] = useState([]);
  const [ordemSelecionada, setOrdemSelecionada] = useState(null);
  const [materiais, setMateriais] = useState([]);
  const [quantidadesSeparadas, setQuantidadesSeparadas] = useState({});
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [eanInput, setEanInput] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  const [imageURL, setImageURL] = useState(""); // Estado para armazenar a URL da imagem
  
  
  

  const handleBuscarOrdens = () => {
    if (centro >= 600 && centro <= 699) {
      setOrdens([
        {
          id: "OV12345",
          centro: "600",
          materiais: [
            {
              id: 1,
              descricao: "Lavitan A-Z Mulher 60 Comprimidos",
              quantidade: 10,
              unidade: "un",
              skuBemol: "4004205",
              ean: "7897947606500",
              posicao: "PR.01.02", // Posição no depósito
              imagem: "imagem"
            },
            {
              id: 2,
              descricao: "Dorflex 300+35+50mg 10 Comprimidos",
              quantidade: 5,
              unidade: "un",
              ean: "7890987654321",
              posicao: "PR.08.05", // Posição no depósito
              imagem: "imagem"
              
            },
          ],
          status: "Pendente",
        },
      ]);
    } else {
      alert("Nenhuma ordem encontrada para o centro especificado.");
    }
  };

  const materialAtual = materiais[indiceAtual];

  useEffect(() => {
    const fetchImage = async () => {
      const vtexService = new getProductSAP();
      try {
        const reference = await vtexService.getProductSAPReference(materialAtual.skuBemol);
        const image = await vtexService.getProductVTex(reference);
        if (image) {
          setImageURL(image);
        } else {
          console.error("Nenhuma imagem encontrada para este SKU.");
        }
      } catch (error) {
        console.error("Erro ao buscar a imagem do produto:", error);
      }
    };
    
      fetchImage();
    
  }, [materialAtual]);

  const handleSelecionarOrdem = (ordem) => {
    setOrdemSelecionada(ordem);
    setMateriais(ordem.materiais);
    setIndiceAtual(0);
    setQuantidadesSeparadas({});
    setMensagemErro("");
    setEanInput("");
  };

  const handleValidarEAN = () => {
    const materialAtual = materiais[indiceAtual];

    if (eanInput === materialAtual.ean) {
      const quantidadeSeparada = quantidadesSeparadas[materialAtual.id] || 0;
      if (quantidadeSeparada >= materialAtual.quantidade) {
        setMensagemErro("");
        alert("Produto validado com sucesso!");
        if (indiceAtual < materiais.length - 1) {
          setIndiceAtual(indiceAtual + 1);
        }
        setEanInput("");
      } else {
        setMensagemErro("Quantidade separada insuficiente.");
      }
    } else {
      setMensagemErro("EAN inválido. Tente novamente.");
    }
  };

  const handleSepararQuantidade = (id, quantidade) => {
    setQuantidadesSeparadas((prev) => ({
      ...prev,
      [id]: quantidade,
    }));
  };

  const podeFaturar = () => {
    return materiais.every(
      (material) =>
        quantidadesSeparadas[material.id] >= material.quantidade &&
        quantidadesSeparadas[material.id] !== undefined
    );
  };

  const handleFaturarOrdem = () => {
    if (podeFaturar()) {
      alert("Ordem faturada com sucesso!");
      setOrdens((prev) =>
        prev.map((ordem) =>
          ordem.id === ordemSelecionada.id
            ? { ...ordem, status: "Finalizado" }
            : ordem
        )
      );
      setOrdemSelecionada(null);
    } else {
      alert("Ainda há produtos pendentes.");
    }
  };

  const handleEstornarSeparacao = () => {
    const confirmacao = window.confirm(
      "Você realmente deseja estornar esta separação?"
    );
    if (confirmacao) {
      alert("Separação estornada com sucesso!");
      setQuantidadesSeparadas({});
      setIndiceAtual(0);
      setMensagemErro("");
      setEanInput("");
      setOrdens((prev) =>
        prev.map((ordem) =>
          ordem.id === ordemSelecionada.id
            ? {
                ...ordem,
                status: "Pendente",
                mensagem: "Problemas na separação. Transferir Ordem de Venda",
              }
            : ordem
        )
      );
      setOrdemSelecionada(null);
    }
  };

  const handleProximoProduto = () => {
    if (indiceAtual < materiais.length - 1) {
      setIndiceAtual(indiceAtual + 1);
      setMensagemErro("");
      setEanInput("");
    }
  };

  const handleVoltarProduto = () => {
    if (indiceAtual > 0) {
      setIndiceAtual(indiceAtual - 1);
      setMensagemErro("");
      setEanInput("");
    }
  };

  const styles = {
    inputQtd: {
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "14px",
      width: "100px", // Reduzido
      outline: "none",
      textAlign: "center", // Centraliza o texto
    },
    centralButtonGroupNavigation: {
      display: "flex",
      justifyContent: "center", // Centraliza horizontalmente
      gap: "10px", // Ajuste de espaçamento entre os botões
      marginTop: "10px",
      width: "100%", // Garante alinhamento correto
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center", // Centraliza verticalmente
      padding: "20px",
      fontFamily: "'Roboto', sans-serif",
      backgroundColor: "#f4f4f4",
      minHeight: "100vh",
    },
    logo: {
      width: "220px",
      marginBottom: "20px",
    },
    formGroup: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "20px",
    },
    input: {
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "14px",
      width: "150px",
      outline: "none",
    },
    button: {
      padding: "10px 20px", // Ajuste de tamanho
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
      alignItems: "center", // Centraliza verticalmente
      gap: "15px",
      marginTop: "15px",
      width: "100%", // Garante alinhamento
    },
  };
  

  if (!ordemSelecionada) {
    return (
      <div style={styles.container}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <h2>Filtrar Ordens de Venda</h2>
        <div style={styles.formGroup}>
          <input
            type="text"
            placeholder="Centro"
            value={centro}
            onChange={(e) => setCentro(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleBuscarOrdens} style={styles.button}>
            Buscar Ordens
          </button>
        </div>
        {ordens.map((ordem) => (
          <div key={ordem.id} style={styles.materialCard}>
            <p><strong>Ordem:</strong> {ordem.id}</p>
            <p><strong>Status:</strong> {ordem.status}</p>
            <button
              style={styles.button}
              onClick={() => handleSelecionarOrdem(ordem)}
            >
              Acessar Ordem
            </button>
          </div>
        ))}
      </div>
    );
  }

  

  return (
    <div style={styles.container}>
      <h2>Detalhe da Ordem OV12345 </h2>
      <div style={styles.materialCard}>
        <p><strong>Descrição:</strong> {materialAtual.descricao}</p>
        <p><strong>SKU: </strong> {materialAtual.skuBemol}</p>
        <p><strong>EAN:</strong> {materialAtual.ean}</p>
        <p><strong>Posição no Depósito:</strong> {materialAtual.posicao}</p>
        <p>
          <strong>Quantidade:</strong> {materialAtual.quantidade}{" "}
          {materialAtual.unidade}
        </p>
        {imageURL ? (
          <img src={imageURL} alt="Produto" style={{ maxWidth: "200px" }} />
        ) : (
          <p>Carregando imagem...</p>
        )}
        
        <div style={styles.formGroup}>
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
  value={quantidadesSeparadas[materialAtual.id] || ""}
  onChange={(e) => handleSepararQuantidade(materialAtual.id, Number(e.target.value))}
  style={styles.inputQtd} // Novo estilo aqui
/>

        </div>
        <button style={styles.button} onClick={handleValidarEAN}>
          Validar Produto
        </button>
        {mensagemErro && <p style={{ color: "red" }}>{mensagemErro}</p>}
      </div>
      <div style={styles.centralButtonGroup}>
        <button
          style={styles.button}
          onClick={handleVoltarProduto}
          disabled={indiceAtual === 0}
        >
          {"<"}
        </button>
        <button
          style={styles.button}
          onClick={handleProximoProduto}
          disabled={indiceAtual === materiais.length - 1}
        >
          {">"}
        </button>
      </div>
      <div style={styles.centralButtonGroup}>
        <button
          style={styles.button}
          onClick={handleFaturarOrdem}
          disabled={!podeFaturar()}
        >
          Faturar Ordem
        </button>
        <button
          style={{ ...styles.button, backgroundColor: "#dc3545" }}
          onClick={handleEstornarSeparacao}
        >
          Estornar Separação
        </button>
      </div>
    </div>
  );
};

export default OrdemVenda;
 