import { url } from './utils';
import { DEFAULT_COLOR, CHANGING_COLOR, circle, head, tail } from "./constants";

describe('Корректно отображается страница Очереди', function() {
  beforeEach(function() {
    cy.visit(`${url}/queue`);
    cy.get(head)
    cy.get(tail)
  });

  it('Если инпут пустой, то кнопка заблокирована', function() {
    cy.get('input').should('have.value', '');
    cy.contains('Добавить').should('be.disabled');
  });

  it('Если инпут непустой, то кнопка разблокирована', function() {
    cy.get('input').type('1');
    cy.get('button').contains('Добавить').should('not.be.disabled');
    cy.get('input').clear();
  });

  it('Корректно добавляется элемент в очередь и удаляется из очереди', function() {
    cy.get('input').type('8');
    cy.get('button').contains('Добавить').click();

    cy.get(circle).first().should('have.css', 'border', CHANGING_COLOR).contains('8');
    cy.get(head).contains('head');
    cy.get(tail).contains('tail');
    cy.get(circle).first().should('have.css', 'border', DEFAULT_COLOR).contains('8');

    cy.get('input').type('27');
    cy.get('button').contains('Добавить').click();

    cy.get(circle).eq(1).should('have.css', 'border', CHANGING_COLOR).contains('27');
    cy.get(head).first().contains('head')
    cy.get(tail).eq(1).contains('tail')
    cy.get(tail).first().should('be.empty')
    cy.get(circle).eq(1).should('have.css', 'border', DEFAULT_COLOR).contains('27');


    cy.get('button').contains('Удалить').click();

    cy.get(circle).first().should('have.text', '');
    cy.get(head).first().should('be.empty');
    cy.get(circle).first().should('have.css', 'border', CHANGING_COLOR);
    cy.get(circle).first().should('have.css', 'border', DEFAULT_COLOR);
    cy.get(head).eq(1).contains('head');

    cy.get('button').contains('Удалить').click();

    cy.get(circle).eq(1).should('have.text', '');
    cy.get(head).eq(1).should('be.empty');
    cy.get(tail).eq(1).should('be.empty');
    cy.get(circle).eq(1).should('have.css', 'border', CHANGING_COLOR);
    cy.get(circle).eq(1).should('have.css', 'border', DEFAULT_COLOR);
  });

  it('Корректно очищается стек', function() {
    cy.get('input').type('8');
    cy.get('button').contains('Добавить').click();

    cy.get('input').type('27');
    cy.get('button').contains('Добавить').click();

    cy.contains('Очистить').click();

    cy.get('[class*="circle_circle"]').should('have.text', '');
    cy.get(head).should('be.empty');
    cy.get(tail).should('be.empty');
  });
}); 