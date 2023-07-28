const butaoAdicionar = document.querySelector('#criar-tarefa');
const entradaTexto = document.querySelector('#texto-tarefa');
const listaOrdenada = document.querySelector('#lista-tarefas');
const butaoApagaTudo = document.querySelector('#apaga-tudo');
const butaoRemoveCompletados = document.querySelector('#remover-finalizados');

// 5 - Adicione um botão e, ao clicar nesse botão, um novo item deverá ser criado ao final da lista e o texto do input deve ser limpo
// 6 - Adicione três novas tarefas e ordene todas as tarefas da lista por ordem de criação

const adicionaTextoALista = () => {
  butaoAdicionar.addEventListener('click', () => {
    const textoEntrada = entradaTexto.value;
    if (entradaTexto.value === '') {
      window.alert('É necessario escrever um item para ser adicionado!');
    } else {
      const lista = document.createElement('li');
      lista.innerHTML = textoEntrada;
      listaOrdenada.appendChild(lista);
      entradaTexto.value = '';
    }
  });
};
adicionaTextoALista();

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    butaoAdicionar.click();
  }
});

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

// 10 - Adicione um botão que quando clicado deve apagar todos os itens da lista

butaoApagaTudo.addEventListener('click', () => {
  const listas = document.querySelectorAll('#lista-tarefas li');
  if (listas.length !== 0) {
    for (let index = 0; index < listas.length; index += 1) {
      const element = listas[index];
      listaOrdenada.removeChild(element);
    }
  } else {
    window.alert('É necessario ter sido adicionado um item, para ser limpado!');
  }
});

// 11 - Adicione um botão que quando clicado remove somente os elementos finalizados da sua lista

// Uma possível razão pela qual não está removendo todos os itens completados é que o HTMLCollection retornado por document.getElementsByClassName('completed') é uma coleção viva, o que significa que ela é atualizada em tempo real conforme os elementos da página mudam. Portanto, quando você remove um item da lista, a coleção itensCompletados é atualizada e o seu comprimento (length) diminui.

// Isso pode levar a um comportamento imprevisível ao iterar pela coleção itensCompletados usando um loop for, pois a quantidade de elementos na coleção está mudando durante o loop.

const itensCompletados = document.getElementsByClassName('completed');
const removeItensCompretado = (array) => {
  const itensArray = Array.from(array);
  for (let index = 0; index < itensArray.length; index += 1) {
    const item = itensArray[index];
    listaOrdenada.removeChild(item);
  }
};
butaoRemoveCompletados.addEventListener('click', () => {
  if (itensCompletados.length === 0) {
    window.alert('É necessario primeiro de marca os itens!');
  } else {
    removeItensCompretado(itensCompletados);
  }
});
