describe('template spec', () => {

  before(function () {
    //cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });

    cy.visit('http://localhost:3000/react-burger/login');
    cy.get('input[type=email]').type('ssizoff@rambler.ru');
    cy.get('input[type=password]').type('qwerty');
    cy.get('button[type=submit]').click();
  });

  beforeEach(function () { });

  it('Opened constructor', function () {
    cy.contains('Соберите бургер');
  });

  it('Click by ingredient', function () {
    cy.get('[data-testid=ingredient-card]').first().as('item');

    cy.get('@item').click();
    cy.contains('Детали ингредиента');

    cy.get('[data-testid=modal-window] [data-testid=ingredient-name]')
      .then(modalName => {
        const textModal = modalName[0].innerText;

        cy.get('@item')
          .within(() => {
            cy.get('[data-testid=ingredient-name]').contains(textModal);
          });
      });

    cy.get('body').type("{esc}");
    cy.get('Детали ингредиента').should('not.exist');
  });

  it('Drag ingredient', function () {
    cy.get('[class^=constructor_middle_panel__]').first().as('dropTarget');
    cy.get('#group-bun [data-testid=ingredient-card]').first().as('bunItem');
    cy.get('#group-sauce [data-testid=ingredient-card]').first().as('sauceItem');
    cy.get('#group-main [data-testid=ingredient-card]').first().as('mainItem');

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