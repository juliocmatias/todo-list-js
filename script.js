const butaoAdicionar = document.querySelector('#criar-tarefa');
const entradaTexto = document.querySelector('#texto-tarefa');
const listaOrdenada = document.querySelector('#lista-tarefas');
const butaoLimparLista = document.querySelector('#apaga-tudo');
const butaoLimparCompletados = document.querySelector('#remover-finalizados');
const butaoSalvarLista = document.querySelector('#salvar-tarefas');
const butaoMoveCima = document.querySelector('#mover-cima');
const butaoMoveBaixo = document.querySelector('#mover-baixo');
const butaoRemoverSelecionado = document.querySelector('#remover-selecionado');

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

const retiraCorDeFundoLI = () => {
  const listas = document.querySelectorAll('li');
  for (let index = 0; index < listas.length; index += 1) {
    const elemento = listas[index];
    elemento.style.backgroundColor = '';
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
  } else {
    retiraCorDeFundoLI();
  }
});

// 9 - Clicar duas vezes em um item, faz com que ele seja riscado, indicando que foi completado. Deve ser possível desfazer essa ação clicando novamente duas vezes no item

const riscaItemLista = (elemento) => {
  const itemLista = elemento;
  if (itemLista.style.textDecorationLine !== 'line-through') {
    itemLista.style.color = 'gray';
    itemLista.style.textDecorationLine = 'line-through';
    itemLista.style.textDecorationColor = 'black';
    itemLista.classList.add('completed');
  } else {
    itemLista.style.color = '';
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

butaoLimparLista.addEventListener('click', () => {
  localStorage.clear();
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
const removeItensCompletado = (array) => {
  const itensArray = Array.from(array);
  for (let index = 0; index < itensArray.length; index += 1) {
    const item = itensArray[index];
    listaOrdenada.removeChild(item);
  }
};
butaoLimparCompletados.addEventListener('click', () => {
  if (itensCompletados.length === 0) {
    window.alert('É necessario primeiro de marca os itens!');
  } else {
    removeItensCompletado(itensCompletados);
  }
});

// 12 - Adicione um botão que salva o conteúdo da lista. Se você fechar e reabrir a página, a lista deve continuar no estado em que estava

const salvaTarefas = (array) => {
  const arrayItens = JSON.parse(localStorage.getItem('itensSalvo'));
  const arrayListas = array;
  for (let index = 0; index < arrayListas.length; index += 1) {
    const elementoLista = arrayListas[index];
    const ItemListaObjeto = {
      text: elementoLista.innerHTML,
      backgroundColor: elementoLista.style.backgroundColor,
      textDecorationLine: elementoLista.style.textDecorationLine,
      Class: elementoLista.className,
      color: elementoLista.style.color,
      textDecorationColor: elementoLista.style.textDecorationColor,
    };
    arrayItens.push(ItemListaObjeto);
  }
  localStorage.setItem('itensSalvo', JSON.stringify(arrayItens));
};

butaoSalvarLista.addEventListener('click', () => {
  const listaParaSalvar = document.querySelectorAll('li');
  if (localStorage.getItem('itensSalvo') === null) {
    localStorage.setItem('itensSalvo', JSON.stringify([]));
  }
  if (listaParaSalvar.length === 0) {
    window.alert('É necessario ter sido adicionado item, para ser salvo!');
  } else {
    salvaTarefas(listaParaSalvar);
  }
});

const restauraLista = () => {
  if (localStorage.getItem('itensSalvo') !== null) {
    const restaraItens = JSON.parse(localStorage.getItem('itensSalvo'));
    for (let index = 0; index < restaraItens.length; index += 1) {
      const elementoItemObjeto = restaraItens[index];
      // console.log(elementoItemObjeto);
      const item = document.createElement('li');
      item.innerText = elementoItemObjeto.text;
      item.style.backgroundColor = elementoItemObjeto.backgroundColor;
      item.style.color = elementoItemObjeto.color;
      item.style.textDecorationLine = elementoItemObjeto.textDecorationLine;
      item.className = elementoItemObjeto.Class;
      item.style.textDecorationColor = elementoItemObjeto.textDecorationColor;
      listaOrdenada.appendChild(item);
    }
  }
};

window.onload = restauraLista;

// 13 - Adicione dois botões, que permitam mover o item selecionado para cima ou para baixo na lista de tarefas

const moveCima = (item) => {
  const itemMarcado = item;
  const itemAnterior = itemMarcado.previousElementSibling;
  if (itemAnterior !== null && itemAnterior !== undefined) {
    listaOrdenada.insertBefore(itemMarcado, itemAnterior);
  }
};

butaoMoveCima.addEventListener('click', () => {
  const lista = document.querySelectorAll('li');
  let itemMarcado = '';
  for (let index = 0; index < lista.length; index += 1) {
    const element = lista[index];
    if (element.style.backgroundColor === 'gray') {
      itemMarcado = element;
    }
  }
  if (itemMarcado !== null && lista.length <= 1) {
    window.alert('É necessario ter sido marcado um item, e a lista ser maior que 1 item!');
  }
  moveCima(itemMarcado);
});

const moveBaixo = (item) => {
  const itemMarcado = item;
  const proximoItem = itemMarcado.nextElementSibling;
  if (proximoItem !== null && proximoItem !== undefined) {
    listaOrdenada.insertBefore(proximoItem, itemMarcado);
  }
};

butaoMoveBaixo.addEventListener('click', () => {
  const lista = document.querySelectorAll('li');
  let itemMarcado = '';
  for (let index = 0; index < lista.length; index += 1) {
    const element = lista[index];
    if (element.style.backgroundColor === 'gray') {
      itemMarcado = element;
    }
  }
  if (itemMarcado !== null && lista.length <= 1) {
    window.alert('É necessario ter sido marcado um item, e a lista ser maior que 1 item!');
  }
  moveBaixo(itemMarcado);
});

// 14 - Adicione um botão que, quando clicado, remove o item selecionado

butaoRemoverSelecionado.addEventListener('click', () => {
  const lista = document.querySelectorAll('li');
  let itemMarcado = '';
  for (let index = 0; index < lista.length; index += 1) {
    const element = lista[index];
    if (element.style.backgroundColor === 'gray') {
      itemMarcado = element;
    }
  }
  if (itemMarcado === '') {
    window.alert('Deve ter pelo menos um item marcado!');
  } else {
    listaOrdenada.removeChild(itemMarcado);
  }
});
