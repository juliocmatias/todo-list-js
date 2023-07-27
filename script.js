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
    if (entradaTexto.value === '') {
      window.alert('É necessario digitar um item');
    } else {
      const lista = document.createElement('li');
      lista.innerHTML = textoEntrada;
      listaOrdenada.appendChild(lista);
      redefineEntrada();
    }
  });
};
adicionaTextoALista();

// 7 - Clicar em um item da lista deve alterar a cor de fundo do item para cinza

const mudaCorDeFundo = (elemento) => {
  const itemLista = elemento;
  if (itemLista.style.backgroundColor !== 'gray') {
    itemLista.style.backgroundColor = 'gray';
  }
};

listaOrdenada.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    // 8 - Não deve ser possível selecionar mais de um elemento da lista ao mesmo tempo
    const listas = document.querySelectorAll('#lista-tarefas li');
    for (let index = 0; index < listas.length; index += 1) {
      const elemento = listas[index];
      elemento.style.backgroundColor = '';
    }
    mudaCorDeFundo(event.target);
  }
});

// 9 - Clicar duas vezes em um item, faz com que ele seja riscado, indicando que foi completado. Deve ser possível desfazer essa ação clicando novamente duas vezes no item

const riscaItemLista = (elemento) => {
  const itemLista = elemento;
  console.log(itemLista);
  if (itemLista.style.textDecorationLine !== 'line-through') {
    itemLista.style.textDecorationLine = 'line-through';
    itemLista.classList.add('completed');
  } else {
    itemLista.style.textDecorationLine = '';
    itemLista.classList.remove('completed');
  }
};

listaOrdenada.addEventListener('dblclick', (event) => {
  if (event.target.tagName === 'LI') {
    riscaItemLista(event.target);
  }
});
