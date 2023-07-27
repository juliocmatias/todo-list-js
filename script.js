const butaoAdicionar = document.querySelector('#criar-tarefa');
const entradaTexto = document.querySelector('#texto-tarefa');
const listaOrdenada = document.querySelector('#lista-tarefas');

const redefineEntrada = () => {
  entradaTexto.value = '';
};
const adicionaTextoALista = () => {
  butaoAdicionar.addEventListener('click', () => {
    const textoEntrada = entradaTexto.value;
    const lista = document.createElement('li');
    lista.innerHTML = textoEntrada;
    listaOrdenada.appendChild(lista);
    redefineEntrada();
  });
};
adicionaTextoALista();
