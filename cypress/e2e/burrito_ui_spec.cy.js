describe('Burrito Builder', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {fixture: 'getData'})
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {fixture: 'post'})
    cy.visit('http://localhost:3000/')
  })
  it('Should have a title', () => {
    cy.get('h1').should('contain', "Burrito Builder")
  })
  it('should show existing orders', () => {
    cy.get('section > :nth-child(1)')
      .and('contain', 'Jeff')
      .and('contain', 'steak')
      .and('contain', 'beans')
      .and('contain', 'carnitas')
    cy.get('section > :nth-child(2)')
      .and('contain', 'Asia')
      .and('contain', 'steak')
      .and('contain', 'beans')
  })
  it('should have a form with a name input', () => {
    cy.get('form').should('exist')
    cy.get('input').should('have.value', '')
  })
  it('should have ingredients buttons', () => {
    cy.get('[name="beans"]').should('exist')
    cy.get('[name="steak"]').should('exist')
    cy.get('[name="carnitas"]').should('exist')
    cy.get('[name="sofritas"]').should('exist')
    cy.get('[name="lettuce"]').should('exist')
    cy.get('[name="queso fresco"]').should('exist')
    cy.get('[name="pico de gallo"]').should('exist')
    cy.get('[name="hot sauce"]').should('exist')
    cy.get('[name="guacamole"]').should('exist')
    cy.get('[name="jalapenos"]').should('exist')
    cy.get('[name="cilantro"]').should('exist')
    cy.get('[name="sour cream"]').should('exist')
  })

  it('should allow users to add a name to the input', () => {
    cy.get('input')
      .should('have.value', '')
      .type("Test")
      .should('have.value', 'Test')
  })

  it("When a user fills out the form, the input is reflected field's value", () => {
    cy.get('form').get('input[name="name"]').type('text');
    cy.get('form').get('input[name="name"]').should('have.value', 'text');

    cy.get('form').get('button[name="beans"]').click();
    cy.get('form').get('p').should('contain', 'Order: beans');
    cy.get('form').get('button[name="steak"]').click();
    cy.get('form').get('p').should('contain', 'Order: beans, steak');
    cy.get('form').get('button[name="carnitas"]').click();
    cy.get('form').get('p').should('contain', 'Order: beans, steak, carnitas');
    cy.get('form').get('button[name="sofritas"]').click();
    cy.get('form').get('p').should('contain', 'Order: beans, steak, carnitas, sofritas');
    cy.get('form').get('button[name="lettuce"]').click();
    cy.get('form').get('p').should('contain', 'Order: beans, steak, carnitas, sofritas, lettuce');
  });
})