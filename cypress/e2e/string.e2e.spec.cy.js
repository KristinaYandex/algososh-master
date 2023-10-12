import { url } from './utils';
import { CHANGING_COLOR, DEFAULT_COLOR, MODIFIED_COLOR, circle } from "./constants";

describe('Корректно отображается страница Строка', function() {
  before(function() {
    cy.visit(`${url}/recursion`);
  });

  it('Если инпут пустой, то кнопка заблокирована', function() {
    cy.get('input').should('have.value', '');
    cy.get('button').should('be.disabled');
  });

  it('Корректно разворачивается строка', function() {
    const textInput = 'worker'
    cy.get('input').type(textInput);
    cy.get('button').contains('Развернуть').click();

    cy.get(circle).first().as('first');
    cy.get(circle).eq(1).as('second');
    cy.get(circle).eq(2).as('third');
    cy.get(circle).eq(3).as('forth');
    cy.get(circle).eq(4).as('fifth');
    cy.get(circle).eq(5).as('sixth');

    cy.get('@first').should('have.css', 'border', CHANGING_COLOR).contains('w');
    cy.get('@second').should('have.css', 'border', DEFAULT_COLOR).contains('o');
    cy.get('@third').should('have.css', 'border', DEFAULT_COLOR).contains('r');
    cy.get('@fourth').should('have.css', 'border', DEFAULT_COLOR).contains('k');
    cy.get('@fifth').should('have.css', 'border', DEFAULT_COLOR).contains('e');
    cy.get('@sixth').should('have.css', 'border', CHANGING_COLOR).contains('r');

    cy.get('@first').should('have.css', 'border', MODIFIED_COLOR).contains('r');
    cy.get('@second').should('have.css', 'border', CHANGING_COLOR).contains('o');
    cy.get('@third').should('have.css', 'border', DEFAULT_COLOR).contains('r');
    cy.get('@fourth').should('have.css', 'border', DEFAULT_COLOR).contains('k');
    cy.get('@fifth').should('have.css', 'border', CHANGING_COLOR).contains('e');
    cy.get('@sixth').should('have.css', 'border', MODIFIED_COLOR).contains('w');

    cy.get('@first').should('have.css', 'border', MODIFIED_COLOR).contains('r');
    cy.get('@second').should('have.css', 'border', MODIFIED_COLOR).contains('e');
    cy.get('@third').should('have.css', 'border', CHANGING_COLOR).contains('r');
    cy.get('@fourth').should('have.css', 'border', CHANGING_COLOR).contains('k');
    cy.get('@fifth').should('have.css', 'border', MODIFIED_COLOR).contains('o');
    cy.get('@sixth').should('have.css', 'border', MODIFIED_COLOR).contains('w');

    cy.get('@first').should('have.css', 'border', MODIFIED_COLOR).contains('r');
    cy.get('@second').should('have.css', 'border', MODIFIED_COLOR).contains('e');
    cy.get('@third').should('have.css', 'border', MODIFIED_COLOR).contains('k');
    cy.get('@fourth').should('have.css', 'border', MODIFIED_COLOR).contains('r');
    cy.get('@fifth').should('have.css', 'border', MODIFIED_COLOR).contains('o');
    cy.get('@sixth').should('have.css', 'border', MODIFIED_COLOR).contains('w');
  });
}); 
