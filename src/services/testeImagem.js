const getProductSAP = require('./getProductSAP');

async function main() {
  const vtexService = new getProductSAP();

  try {
    // Busca o ID do produto no SAP
    const productIdSap = await vtexService.getProductSAPReference('4000862');
    console.log('ID do SAP:', productIdSap);

    if (!productIdSap) {
      throw new Error('ID do SAP não encontrado.');
    }

    // Usa o ID para buscar os dados do produto na VTEX
    const productVTex = await vtexService.getProductVTex(productIdSap);
    console.log('Dados do produto VTEX:', productVTex);
  } catch (error) {
    console.error('Erro ao executar a operação:', error);
  }
}

// Executa a função principal
main();
