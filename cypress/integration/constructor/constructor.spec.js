describe('template spec', () => {

  before(function () {
    cy.visit('http://localhost:3000/react-burger/login');
    cy.get('input[type=email]').type('ssizoff@rambler.ru');
    cy.get('input[type=password]').type('qwerty');
    cy.get('button[type=submit]').click();
  });

  it('Opened constructor', function () {
    cy.contains('Соберите бургер');
  });

  it('Click by ingredient', function () {
    cy.get('[class^=burger_item__]').first().as('item');

    cy.get('@item').click();
    cy.contains('Детали ингредиента');

    cy.get('body').type("{esc}");
    cy.get('Детали ингредиента').should('not.exist');
  });

  it('Drag ingredient', function () {
    cy.get('[class^=constructor_middle_panel__]').first().as('dropTarget');
    cy.get('#group-bun [class^=burger_item__]').first().as('bunItem');
    cy.get('#group-sauce [class^=burger_item__]').first().as('sauceItem');
    cy.get('#group-main [class^=burger_item__]').first().as('mainItem');

    cy.get('@bunItem').trigger('dragstart');
    cy.get('@dropTarget').trigger('drop');

    cy.get('@sauceItem').trigger('dragstart');
    cy.get('@dropTarget').trigger('drop');

    cy.get('@mainItem').trigger('dragstart');
    cy.get('@dropTarget').trigger('drop');

    cy.get('@dropTarget').children().should('have.length', 2);

    cy.get('@bunItem').contains("p[class^=counter]", "2");
    cy.get('@sauceItem').contains("p[class^=counter]", "1");
    cy.get('@mainItem').contains("p[class^=counter]", "1");

    cy.get('div[class^=constructor_total_price__] button').click();
    // eslint-disable-next-line testing-library/await-async-utils, cypress/no-unnecessary-waiting
    cy.wait(20000);    
    cy.contains('Ваш заказ начали готовить');
  });
})