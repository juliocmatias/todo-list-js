const butaoAdicionar = document.querySelector('#criar-tarefa');
const entradaTexto = document.querySelector('#texto-tarefa');
const listaOrdenada = document.querySelector('#lista-tarefas');
const redefineEntrada = () => {
  entradaTexto.value = '';
};

// 5 - Adicione um botão e, ao clicar nesse botão, um novo item deverá ser criado ao final da lista e o texto do input deve ser limpo
// 6 - Adicione três novas tarefas e ordene todas as tarefas da lista por ordem de criação

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

// 7 - Clicar em um item da lista deve alterar a cor de fundo do item para cinza

const mudaCorDeFundo = (elemento) => {
  const itemLista = elemento;
  if (itemLista.style.backgroundColor !== 'rgb(128, 128, 128)') {
    itemLista.style.backgroundColor = 'rgb(128, 128, 128)';
  } else {
    itemLista.style.backgroundColor = '';
  }
};
listaOrdenada.addEventListener('click', (event) => {
  console.log(event.target.tagName);
  if (event.target.tagName === 'LI') {
    mudaCorDeFundo(event.target);
  }
});
