import { url } from './utils';
import { DEFAULT_COLOR, circle } from "./constants";

describe('Корректно отображается страница Фибоначчи', function() {
  before(function() {
    cy.visit(`${url}/fibonacci`);
  });

  it('Если инпут пустой, то кнопка заблокирована', function() {
    cy.get('input').should('have.value', '');
    cy.get('button').should('be.disabled');
  });

  it('Корректно генерируются числа', function() {
    const textInput = '8'
    cy.get('input').type(textInput);
    cy.get('button').contains('Рассчитать').click();

    cy.get(circle).first().as('first');
    cy.get(circle).eq(1).as('second');
    cy.get(circle).eq(2).as('third');
    cy.get(circle).eq(3).as('forth');
    cy.get(circle).eq(4).as('fifth');
    cy.get(circle).eq(5).as('sixth');
    cy.get(circle).eq(6).as('seventh');
    cy.get(circle).eq(7).as('eighth');

    cy.wait(500);
    cy.get('@first').should('have.css', 'border', DEFAULT_COLOR).contains('1');

    cy.wait(500);
    cy.get('@second').should('have.css', 'border', DEFAULT_COLOR).contains('1');

    cy.wait(500);
    cy.get('@third').should('have.css', 'border', DEFAULT_COLOR).contains('2');

    cy.wait(500);
    cy.get('@fourth').should('have.css', 'border', DEFAULT_COLOR).contains('3');

    cy.wait(500);
    cy.get('@fifth').should('have.css', 'border', DEFAULT_COLOR).contains('5');

    cy.wait(500);
    cy.get('@sixth').should('have.css', 'border', DEFAULT_COLOR).contains('8');

    cy.wait(500);
    cy.get('@seventh').should('have.css', 'border', DEFAULT_COLOR).contains('13');

    cy.wait(500);
    cy.get('@eighth').should('have.css', 'border', DEFAULT_COLOR).contains('21');
  });
}); 
