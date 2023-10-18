import { url } from './utils';

describe('Роутинг корректно настроен', function() {
  beforeEach(function() {
    cy.visit(url);
  });

  it('Доступна главная страница', function() {
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('Доступна главная страница алгоритма Строка', function() {
    cy.visit(`${url}/recursion`);
    cy.contains('Строка');
  });

  it('Доступна главная страница алгоритма Последовательность Фибоначчи', function() {
    cy.visit(`${url}/fibonacci`);
    cy.contains('Последовательность Фибоначчи');
  });

  it('Доступна главная страница алгоритма Сортировка массива', function() {
    cy.visit(`${url}/sorting`);
    cy.contains('Сортировка массива');
  });

  it('Доступна главная страница алгоритма Сортировка массива', function() {
    cy.visit(`${url}/sorting`);
    cy.contains('Сортировка массива');
  });

  it('Доступна главная страница алгоритма Стек', function() {
    cy.visit(`${url}/stack`);
    cy.contains('Стек');
  });

  it('Доступна главная страница алгоритма Очередь', function() {
    cy.visit(`${url}/queue`);
    cy.contains('Очередь');
  });

  it('Доступна главная страница алгоритма Связный список', function() {
    cy.visit(`${url}/list`);
    cy.contains('Связный список');
  });
}); 
