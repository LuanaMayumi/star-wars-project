import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

import mockData from './mockData';
import userEvent from '@testing-library/user-event';

describe('Testando a renderização do APP',() => {
  beforeEach(() => {
    // fazer o fetch no mock
    // o fetch esta presente no obj global (obj do JS) .fetch(função do JS)
    // global. (acessar as chaves do obj global)
    // o fetch recebe o jest (framework de teste)
    // preciso usar o async pq o mock precisa ser o mais próximo da resposta verdadeira da API, mas sendo controlado
    // acessar uma função do jest .fn
    // dentro da função, acessar o json
    // json - linguagem que o browser entende
    global.fetch = jest.fn(async() => ({
      json: async() => mockData,
    }))
  })

  test('Verifica se existe um titulo' , async () => {
    render(<App />)
    // preciso usar find pq é assincrono
    // RTL library
    const tittle = await screen.findByText(/star wars project/i)
    expect(tittle).toBeInTheDocument()
  })

  test('Testa o campo de input pelo nome do planeta', async () => {
    render(<App />)
    const inputNameSearch = await screen.findAllByTestId('name-filter')

    userEvent.type(inputNameSearch, 'ta')
    const planet = await screen.findByText(/tatooine/i)
    expect(planet).toBeInTheDocument()

  })

  test('Testa o comparision Maior que', async () => {
    render(<App />)
    const columnOption = await screen.findByTestId('column-filter')
    const comparisionOption = await screen.findByTestId('comparison-filter')
    const inputValue = await screen.findByTestId('value-filter')
    const btn = await screen.findByTestId('button-filter')

    userEvent.selectOptions(columnOption, 'population')
    userEvent.selectOptions(comparisionOption, 'maior que')
    userEvent.type(inputValue, '200000')
    userEvent.click(btn)

    const idPlanets = await screen.findAllByTestId('planet-name')
    expect(idPlanets).toHaveLength(6)

    userEvent.selectOptions(columnOption, 'diameter')
    userEvent.selectOptions(comparisionOption, 'menor que')
    userEvent.type(inputValue, '7200')
    userEvent.click(btn)

    const idPlanetss = await screen.findAllByTestId('planet-name')
    expect(idPlanetss).toHaveLength(1)


  })

  test('Testa o comparision Menor que', async () => {
    render(<App />)
    const columnOption = await screen.findByTestId('column-filter')
    const comparisionOption = await screen.findByTestId('comparison-filter')
    const inputValue = await screen.findByTestId('value-filter')
    const btn = await screen.findByTestId('button-filter')

    userEvent.selectOptions(columnOption, 'diameter')
    userEvent.selectOptions(comparisionOption, 'menor que')
    userEvent.type(inputValue, '7200')
    userEvent.click(btn)

    const idPlanets = await screen.findAllByTestId('planet-name')
    expect(idPlanets).toHaveLength(1)
  })

  test('Testa o comparision Igual a', async () => {
    render(<App />)
    const columnOption = await screen.findByTestId('column-filter')
    const comparisionOption = await screen.findByTestId('comparison-filter')
    const inputValue = await screen.findByTestId('value-filter')
    const btn = await screen.findByTestId('button-filter')

    userEvent.selectOptions(columnOption, 'rotation_period')
    userEvent.selectOptions(comparisionOption, 'igual a')
    userEvent.type(inputValue, '23')
    userEvent.click(btn)

    const idPlanets = await screen.findAllByTestId('planet-name')
    expect(idPlanets).toHaveLength(3)
  })
  // // testa usando maior que...colocando um numero no input
  // // espera que o retorno tenha length = ...

  // test('Aplicando multiplos filtros')
  // // filtro, clica no botão// segundo filtro

  // test('Veficicar se o globalFetch ta sendo chamado')
  // //tohave been called
  // // se o endpoint ta correto beencalledwith


})
