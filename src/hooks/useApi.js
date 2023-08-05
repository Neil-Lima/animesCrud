import axios from 'axios';
import { useEffect, useState } from 'react';

const useApi = (url, itensPorPagina = 0) => {
  const [dados, setDados] = useState([]); // Armazena os dados obtidos da API
  const [carregando, setCarregando] = useState(true); // Indica se os dados estão sendo carregados
  const [erro, setErro] = useState(''); // Armazena uma mensagem de erro, se ocorrer algum problema
  const [paginaAtual, setPaginaAtual] = useState(1); // Indica a página atual dos dados
  const [totalPaginas, setTotalPaginas] = useState(0); // Indica o total de páginas disponíveis
  const [mensagemExcluir, setMensagemExcluir] = useState(''); // Armazena uma mensagem de sucesso ao excluir um item
  const [erroExcluir, setErroExcluir] = useState(''); // Armazena uma mensagem de erro ao excluir um item
  const [mensagemAdicionar, setMensagemAdicionar] = useState(''); // Armazena uma mensagem de sucesso ao adicionar um item
  const [erroAdicionar, setErroAdicionar] = useState(''); // Armazena uma mensagem de erro ao adicionar um item
  const [valoresCamposAdicionar, setValoresCamposAdicionar] = useState({}); // Armazena os valores dos campos do formulário de adição
  const [mensagemEditar, setMensagemEditar] = useState(''); // Armazena uma mensagem de sucesso ao editar um item
  const [erroEditar, setErroEditar] = useState(''); // Armazena uma mensagem de erro ao editar um item
  const [termoPesquisa, setTermoPesquisa] = useState(''); // Armazena o termo de pesquisa para filtrar os dados
  const [listaVisivel, setListaVisivel] = useState(false); // Estado para controlar a visibilidade da lista
  const [mensagemDeletarSucesso, setMensagemDeletarSucesso] = useState('');
  const [itemEditando, setItemEditando] = useState(null); // Estado para armazenar o item em edição
  const [exibindoMensagemEditar, setExibindoMensagemEditar] = useState(false); // Estado para controlar a exibição da mensagem de "Editado com sucesso"
  const [detalhesItem, setDetalhesItem] = useState(null); // Armazena os detalhes do item por ID
  const [erroDetalhesItem, setErroDetalhesItem] = useState(''); // Armazena uma mensagem de erro ao buscar os detalhes do item por ID

  // Função assíncrona para buscar os dados da API
  const buscarDados = async () => {
    try {
      setCarregando(true); // Define carregando como true para exibir um indicador de carregamento
      const resposta = await axios.get(url);

      // Se itensPorPagina for maior que 0, realiza a paginação
      if (itensPorPagina > 0) {
        const totalItens = resposta.data.length; // Obtém o total de itens da resposta
        const totalPaginas = Math.ceil(totalItens / itensPorPagina); // Calcula o total de páginas com base na quantidade de itens
        setTotalPaginas(totalPaginas); // Define o total de páginas
        const indiceInicio = (paginaAtual - 1) * itensPorPagina; // Calcula o índice de início dos itens na página atual
        const indiceFim = indiceInicio + itensPorPagina; // Calcula o índice de fim dos itens na página atual
        const dadosFatiados = resposta.data.slice(indiceInicio, indiceFim); // Extrai os dados correspondentes à página atual
        setDados(dadosFatiados); // Atualiza os dados com os dados da página atual
      } else {
        // Caso contrário, exibe todos os dados sem paginação
        setDados(resposta.data);
        setTotalPaginas(1);
      }

      setCarregando(false); // Define carregando como false para indicar o fim do carregamento
    } catch (erro) {
      setErro('Ocorreu um erro ao buscar os dados da API.'); // Define uma mensagem de erro em caso de falha na requisição
      setCarregando(false); // Define carregando como false para indicar o fim do carregamento
    }
  };

  useEffect(() => {
    buscarDados(); // Chama a função para buscar os dados assim que o componente é montado ou quando url ou paginaAtual são alterados
  }, [url, itensPorPagina, paginaAtual]);

  // Função para navegar para uma página específica dos dados
  const irParaPagina = (numeroPagina) => {
    if (numeroPagina >= 1 && numeroPagina <= totalPaginas) {
      setPaginaAtual(numeroPagina); // Define a página atual com base no número fornecido, desde que esteja dentro do intervalo válido
    }
  };

    // Função assíncrona para buscar os detalhes do item por ID na API
    const buscarId = async (itemId) => {
      try {
        setCarregando(true); // Define carregando como true para exibir um indicador de carregamento
        const resposta = await axios.get(`${url}/${itemId}`);
        setDetalhesItem(resposta.data); // Define os detalhes do item por ID
        setCarregando(false); // Define carregando como false para indicar o fim do carregamento
      } catch (erro) {
        setErroDetalhesItem('Ocorreu um erro ao buscar os detalhes do item.'); // Define uma mensagem de erro em caso de falha na requisição
        setCarregando(false); // Define carregando como false para indicar o fim do carregamento
      }
    };

  // Função assíncrona para excluir um item da API com base no ID
  const excluirItem = async (itemId) => {
    const confirmado = window.confirm('Tem certeza de que deseja excluir este item?');
    if (!confirmado) return;

    try {
      await axios.delete(`${url}/${itemId}`);
      const dadosAtualizados = dados.filter((item) => item.id !== itemId);
      setDados(dadosAtualizados);
      setMensagemExcluir('Item excluído com sucesso.'); // Define a mensagem de sucesso ao excluir o item
      setErroExcluir('');

      setTimeout(() => {
        setMensagemExcluir('');
      }, 6000); // Após 6 segundos, remove a mensagem de sucesso
    } catch (erro) {
      setErro('Ocorreu um erro ao excluir o item da API.');
      setMensagemExcluir('');
      setErroExcluir('Falha ao excluir.');
    }
  };

  // Função para adicionar um campo ao formulário de adição
  const adicionarCampo = (nomeCampo) => {
    setValoresCamposAdicionar((valoresAnteriores) => ({
      ...valoresAnteriores,
      [nomeCampo]: '',
    }));
  };

  // Função para atualizar o valor de um campo no formulário de adição
  const atualizarValorCampo = (nomeCampo, valorCampo) => {
    setValoresCamposAdicionar((valoresAnteriores) => ({
      ...valoresAnteriores,
      [nomeCampo]: valorCampo,
    }));
  };

  // Função assíncrona para enviar os valores do formulário de adição para a API
  const AdicionarForm = async () => {
    const novoItem = { ...valoresCamposAdicionar }; // Cria um novo objeto com os valores do formulário
    try {
      await axios.post(url, novoItem); // Faz uma requisição POST para a API para adicionar o novo item
      setValoresCamposAdicionar({}); // Limpa os valores dos campos do formulário
      setMensagemAdicionar('Item adicionado com sucesso.'); // Define uma mensagem de sucesso ao adicionar o item

      setTimeout(() => {
        setMensagemAdicionar('');
      }, 3000); // Após 3 segundos, remove a mensagem de sucesso
    } catch (erro) {
      setErroAdicionar('Falha ao adicionar o item à API.'); // Define uma mensagem de erro em caso de falha na requisição
    }
  };

  // Função assíncrona para editar um item da API com base no ID
  const editarItem = (item) => {
    setItemEditando(item);
  };

  // Função para exibir a mensagem de "Editado com sucesso"
  const exibirMensagemEditar = () => {
    setExibindoMensagemEditar(true);

    setTimeout(() => {
      setExibindoMensagemEditar(false);
    }, 3000); // Após 3 segundos, remove a mensagem de sucesso
  };

  // Função para salvar as alterações feitas em um item
  const salvarItemEditado = async () => {
    try {
      await axios.put(`${url}/${itemEditando.id}`, itemEditando);
      exibirMensagemEditar(); // Exibe a mensagem de "Editado com sucesso"
    } catch (erro) {
      setErro('Ocorreu um erro ao editar o item da API.');
      setMensagemEditar('');
      setErroEditar('Falha ao editar.');
    }
    setItemEditando(null); // Limpa o estado do item em edição após salvar ou cancelar
  };

  // Função para cancelar a edição de um item
  const cancelarEdicao = () => {
    setItemEditando(null);
  };

  // Função para lidar com as mudanças nos campos do formulário de edição
  const lidarComMudancaFormularioEditar = (evento) => {
    setItemEditando((itemEditando) => ({
      ...itemEditando,
      [evento.target.name]: evento.target.value,
    }));
  };

  // Função para lidar com as mudanças no campo de pesquisa
  const lidarComPesquisa = (evento) => {
    setTermoPesquisa(evento.target.value); // Atualiza o termo de pesquisa com o valor do campo
  };

  // Função assíncrona para buscar os dados da API com base no termo de pesquisa
  const pesquisarItens = async (termo) => {
    try {
      setCarregando(true); // Define carregando como true para exibir um indicador de carregamento
      const resposta = await axios.get(url, {
        params: {
          q: termo, // Envia o termo de pesquisa como parâmetro na requisição
        },
      });

      // Se itensPorPagina for maior que 0, realiza a paginação
      if (itensPorPagina > 0) {
        const totalItens = resposta.data.length; // Obtém o total de itens da resposta
        const totalPaginas = Math.ceil(totalItens / itensPorPagina); // Calcula o total de páginas com base na quantidade de itens
        setTotalPaginas(totalPaginas); // Define o total de páginas
        const indiceInicio = (paginaAtual - 1) * itensPorPagina; // Calcula o índice de início dos itens na página atual
        const indiceFim = indiceInicio + itensPorPagina; // Calcula o índice de fim dos itens na página atual
        const dadosFatiados = resposta.data.slice(indiceInicio, indiceFim); // Extrai os dados correspondentes à página atual
        setDados(dadosFatiados); // Atualiza os dados com os dados da página atual
      } else {
        // Caso contrário, exibe todos os dados sem paginação
        setDados(resposta.data);
        setTotalPaginas(1);
      }

      setCarregando(false); // Define carregando como false para indicar o fim do carregamento
    } catch (erro) {
      setErro('Ocorreu um erro ao buscar os dados da API.'); // Define uma mensagem de erro em caso de falha na requisição
      setCarregando(false); // Define carregando como false para indicar o fim do carregamento
    }
  };


  // Função para carregar a lista manualmente
  const carregarListaManualmente = () => {
    buscarDados();
    setListaVisivel((prevState) => !prevState); // Inverte o valor do estado (true para false e vice-versa)
  };

  return {
    dados,
    carregando,
    erro,
    paginaAtual,
    totalPaginas,
    irParaPagina,
    excluirItem,
    valoresCamposAdicionar,
    adicionarCampo,
    atualizarValorCampo,
    AdicionarForm,
    exibindoMensagemEditar, // Novo estado para controlar a exibição da mensagem de "Editado com sucesso"
    editarItem,
    itemEditando,
    salvarItemEditado,
    cancelarEdicao,
    lidarComMudancaFormularioEditar,
    termoPesquisa,
    lidarComPesquisa,
    mensagemAdicionar,
    erroAdicionar,
    mensagemExcluir,
    erroExcluir,
    mensagemEditar,
    erroEditar,
    pesquisarItens,
    carregarListaManualmente,
    listaVisivel,
    mensagemDeletarSucesso,
    detalhesItem,
    erroDetalhesItem,
    buscarId,
  };
};

export default useApi;