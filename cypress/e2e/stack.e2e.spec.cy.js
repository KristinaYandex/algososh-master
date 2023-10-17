import { url } from './utils';
import { DEFAULT_COLOR, CHANGING_COLOR, circle, head } from "./constants";

describe('Корректно отображается страница Cтек', function() {
  beforeEach(function() {
    cy.visit(`${url}/stack`);
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

  it('Корректно добавляется элемент в стек и удаляется из стека', function() {
    cy.get('input').type('8');
    cy.get('button').contains('Добавить').click();

    cy.get(circle).eq(0).should('have.css', 'border', CHANGING_COLOR).contains('8');
    
    cy.get(circle).eq(0).should('have.css', 'border', DEFAULT_COLOR).contains('8');
    
    cy.get('input').type('27');
    cy.get('button').contains('Добавить').click();

    cy.get(circle).eq(1).should('have.css', 'border', CHANGING_COLOR).contains('27');

    cy.get(circle).eq(1).should('have.css', 'border', DEFAULT_COLOR).contains('27');


    cy.get('button').contains('Удалить').click();

    cy.get(circle).eq(0).should('have.css', 'border', DEFAULT_COLOR).contains('8');
  });

  it('Корректно очищается стек', function() {
    cy.get('input').type('8');
    cy.get('button').contains('Добавить').click();

    cy.get('input').type('27');
    cy.get('button').contains('Добавить').click();

    cy.contains('Очистить').click();
    cy.get(circle).should('have.length', 0);
  });
}); 