const axios = require('axios');

class getProductSAP {
  constructor() {
    // As credenciais da API podem ser armazenadas como constantes ou configuradas no ambiente
    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-VTEX-API-AppKey': 'VTEXAPPKEY-BEMOL-BHUJXW',
      'X-VTEX-API-AppToken':
        'HYGPTENGOSYPEKPDYXLCUDGBSEQSWWXEADMIGHIKWWSJCBIAOIWIWEOVWWOLBVJBHBJCSUXCWNCAHDUJHRMPNSACYUJCEWUVFFBIDPQSWFIXOZWITRYCOKQNSLSYSEFU',
    };
  }

  // Método para retornar os headers
  getHeaders() {
    return this.headers;
  }

  // Método para buscar referência de produto no SAP
  async getProductSAPReference(refId) {
    const urlSAP = `https://bemol.vtexcommercestable.com.br/api/catalog_system/pvt/products/productgetbyrefid/${refId}`;

    try {
      const response = await axios.get(urlSAP, {
        headers: this.getHeaders(),
      });

      const productSap = response.data.Id;

      return productSap;
    } catch (error) {
      console.error('Erro ao buscar o produto SAP:', error);
      return undefined;
    }
  }

  // Método para buscar dados do produto na VTEX
  async getProductVTex(refIDVTEX) {
    const urlVTEX = `https://bemol.vtexcommercestable.com.br/api/catalog_system/pub/products/variations/${refIDVTEX}`;

    try {
      const response = await axios.get(urlVTEX, {
        headers: this.getHeaders(),
      });

      const productVTexData = response.data;

      if (productVTexData.skus && productVTexData.skus.length > 0) {
        const productVTexImage = productVTexData.skus[0].image;
        return productVTexImage;
      }

      console.error('Nenhum SKU disponível para o produto');
      return undefined;
    } catch (error) {
      console.error('Erro ao buscar o produto VTEX:', error);
      return undefined;
    }
  }
}

 
export default getProductSAP;
 