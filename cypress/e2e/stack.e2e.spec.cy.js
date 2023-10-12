import { url } from './utils';
import { DEFAULT_COLOR, CHANGING_COLOR, circle, head } from "./constants";

describe('Корректно отображается страница Cтек', function() {
  before(function() {
    cy.visit(`${url}/queue`);
  });

  it('Если инпут пустой, то кнопка заблокирована', function() {
    cy.get('input').should('have.value', '');
    cy.get('button').contains('Добавить').should('be.disabled');
    cy.get('button').contains('Удалить').should('be.disabled');
    cy.get('button').contains('Очистить').should('be.disabled');
  });

  it('Корректно добавляется элемент в стек и удаляется из стека', function() {
    cy.get('input').type('8');
    cy.get('button').contains('Добавить').click();

    cy.get(circle).first().should('have.css', 'border', CHANGING_COLOR).contains('8');
    cy.get(head).first().contains('top');
    cy.get(circle).first().should('have.css', 'border', DEFAULT_COLOR).contains('8');


    cy.get('input').type('27');
    cy.get('button').contains('Добавить').click();

    cy.get(head).first().contains('not.exist');
    cy.get(circle).eq(1).should('have.css', 'border', CHANGING_COLOR).contains('27');
    cy.get(head).eq(1).contains('top');
    cy.get(circle).eq(1).should('have.css', 'border', DEFAULT_COLOR).contains('27');


    cy.get('button').contains('Удалить').click();

    cy.get(circle).eq(1).should('have.css', 'border', CHANGING_COLOR).contains('27');
    cy.get(circle).eq(1).should('not.exist');
    cy.get(head).eq(1).contains('not.exist');

    cy.get(head).first().contains('top');
  });

  it('Корректно очищается стек', function() {
    cy.get('input').type('8');
    cy.get('button').contains('Добавить').click();

    cy.get('input').type('27');
    cy.get('button').contains('Добавить').click();

    cy.get('button').contains('Очистить').click();

    cy.get('[class*=list]').should('have.length', 0);
  });
}); 