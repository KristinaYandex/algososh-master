import { url } from './utils';

describe('Приложение поднялось', function() {
  it('Приложение работает по адресу localhost:3000', function() {
    cy.visit(url);
  });
}); 
