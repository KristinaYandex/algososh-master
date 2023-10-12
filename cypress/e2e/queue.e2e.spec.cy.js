import { url } from './utils';
import { DEFAULT_COLOR, CHANGING_COLOR, circle, head, tail } from "./constants";

describe('Корректно отображается страница Cтек', function() {
  before(function() {
    cy.visit(`${url}/stack`);
  });

  it('Если инпут пустой, то кнопка заблокирована', function() {
    cy.get('input').should('have.value', '');
    cy.get('button').contains('Добавить').should('be.disabled');
    cy.get('button').contains('Удалить').should('be.disabled');
    cy.get('button').contains('Очистить').should('be.disabled');
  });

  it('Корректно добавляется элемент в очередь и удаляется из очереди', function() {
    cy.get('input').type('8');
    cy.get('button').contains('Добавить').click();

    cy.get(circle).first().should('have.css', 'border', CHANGING_COLOR).contains('8');
    cy.get(head).first().contains('top');
    cy.get(tail).first().contains('tail');
    cy.get(circle).first().should('have.css', 'border', DEFAULT_COLOR).contains('8');


    cy.get('input').type('27');
    cy.get('button').contains('Добавить').click();

    cy.get(circle).eq(1).should('have.css', 'border', CHANGING_COLOR).contains('27');
    cy.get(head).first().contains('top');
    cy.get(tail).first().contains('not.exist');
    cy.get(tail).eq(1).contains('tail');
    cy.get(circle).eq(1).should('have.css', 'border', DEFAULT_COLOR).contains('27');


    cy.get('button').contains('Удалить').click();

    cy.get(circle).first().should('have.text', '');
    cy.get(circle).first().should('have.css', 'border', CHANGING_COLOR);
    cy.get(circle).first().should('have.css', 'border', DEFAULT_COLOR);

    cy.get(head).first().contains('not.exist');
    cy.get(head).eq(1).contains('top');
  });

  it('Корректно очищается стек', function() {
    cy.get('input').type('8');
    cy.get('button').contains('Добавить').click();

    cy.get('input').type('27');
    cy.get('button').contains('Добавить').click();

    cy.get('button').contains('Очистить').click();

    cy.get(circle).first().should('have.text', '');
    cy.get(circle).eq(1).should('have.text', '');
    cy.get(circle).eq(2).should('have.text', '');
    cy.get(circle).eq(3).should('have.text', '');
    cy.get(circle).eq(4).should('have.text', '');
    cy.get(circle).eq(5).should('have.text', '');
    cy.get(circle).eq(6).should('have.text', '');

    cy.get('[class*=list]').should('have.length', 0);
  });
}); 