import { url } from './utils';
import { DEFAULT_COLOR, CHANGING_COLOR, MODIFIED_COLOR, circle, head, tail, circleSmall } from "./constants";

describe('Корректно отображается страница Cвязный список', function() {
  before(function() {
    cy.visit(`${url}/list`);
    cy.get("input[placeholder='Введите текст']").as('inputText')
    cy.get("input[placeholder='Введите индекс']").as('inputIndex')
  });

  it('Если инпут пустой, то кнопки заблокированы', function() {
    cy.get('@inputText').should('have.value', '');
    cy.get('@inputIndex').should('have.value', '');
    cy.get('button').contains('Добавить в head').should('be.disabled');
    cy.get('button').contains('Добавить в tail').should('be.disabled');
    cy.get('button').contains('Добавить по индексу').should('be.disabled');
    cy.get('button').contains('Удалить по индексу').should('be.disabled');
  });

  it('Корректно отображается список по умолчанию', function() {
    cy.get(circle).should('have.css', 'border', DEFAULT_COLOR);
    cy.get(head).first().contains('head');
    cy.get(tail).eq(3).contains('tail');
  });

  it('Корректно работает добавление в head', function() {
    cy.get('@inputText').type(4);
    cy.get('button').contains('Добавить в head').click();

    cy.get(circleSmall).should('have.css', 'border', CHANGING_COLOR).contains('4');
    cy.get(circleSmall).should('not.exist');

    cy.get(circle).first().should('have.css', 'border', MODIFIED_COLOR).contains('4');
    cy.get(head).first().contains('head');
    cy.get(tail).eq(4).contains('tail');
    cy.get(circle).first().should('have.css', 'border', DEFAULT_COLOR).contains('4');

    cy.get('@inputText').should('be.empty');
  });

  it('Корректно работает добавление в tail', function() {
    cy.get('@inputText').type(9);
    cy.get('button').contains('Добавить в tail').click();

    cy.get(circleSmall).should('have.css', 'border', CHANGING_COLOR).contains('9');
    cy.get(circleSmall).should('not.exist');

    cy.get(circle).eq(4).should('have.css', 'border', MODIFIED_COLOR).contains('9');
    cy.get(tail).eq(4).contains('tail');
    cy.get(circle).eq(4).should('have.css', 'border', DEFAULT_COLOR).contains('9');

    cy.get('@inputText').should('be.empty');
  });

  it('Корректно работает добавление по индексу', function() {
    cy.get('@inputText').type(11);
    cy.get('@inputIndex').type(2);
    cy.get('button').contains('Добавить по индексу').click();

    cy.get(circleSmall).first().should('have.css', 'border', CHANGING_COLOR).contains('11');
    cy.get(circle).first().should('have.css', 'border', CHANGING_COLOR).contains('0');

    cy.get(circleSmall).eq(1).should('have.css', 'border', CHANGING_COLOR).contains('11');
    cy.get(circle).eq(1).should('have.css', 'border', CHANGING_COLOR).contains('34');

    cy.get(circleSmall).eq(2).should('have.css', 'border', CHANGING_COLOR).contains('11');
    cy.get(circleSmall).eq(2).should('not.exist');
    cy.get(circle).eq(2).should('have.css', 'border', MODIFIED_COLOR).contains('11');

    cy.get(circle).eq(2).should('have.css', 'border', DEFAULT_COLOR).contains('11');

    cy.get('@inputText').should('be.empty');
    cy.get('@inputIndex').should('be.empty');
  });

  it('Корректно работает удаление по индексу', function() {
    cy.get('@inputIndex').type(2);
    cy.get('button').contains('Удалить по индексу').click();

    cy.get(circle).first().should('have.css', 'border', CHANGING_COLOR).contains('0');
    cy.get(circle).eq(1).should('have.css', 'border', CHANGING_COLOR).contains('34');
    cy.get(circle).eq(2).should('have.css', 'border', CHANGING_COLOR).contains('8');

    cy.get(circleSmall).eq(2).should('have.css', 'border', CHANGING_COLOR).contains('8');
    cy.get(circle).eq(2).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '');
    
    cy.get(circleSmall).should('not.exist');
    cy.get(circle).should('not.exist');
    cy.get(tail).eq(2).contains('tail');

    cy.get('@inputIndex').should('be.empty');
  });

  it('Корректно работает удаление из head', function() {
    cy.get('button').contains('Удалить из head').click();

    cy.get(circle).first().should('have.css', 'border', DEFAULT_COLOR).should('have.text', '');
    cy.get(circleSmall).first().should('have.css', 'border', CHANGING_COLOR).contains('0');

    cy.get(circleSmall).should('not.exist');
    cy.get(circle).should('not.exist');

    cy.get(head).first().contains('head');
    cy.get(tail).eq(2).contains('tail');
  })

  it('Корректно работает удаление из tail', function() {
    cy.get('button').contains('Удалить из tail').click();

    cy.get(circle).eq(3).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '');
    cy.get(circleSmall).eq(3).should('have.css', 'border', CHANGING_COLOR).contains('1');

    cy.get(circleSmall).should('not.exist');
    cy.get(circle).should('not.exist');

    cy.get(tail).eq(2).contains('tail');
  })
}); 