describe('Land on the homepage', () => {
  it('it should find the h1 element that contains Modal', () => {
    cy.visit('http://localhost:3000/');

    cy.get('.cypressTest').contains('MODAL');
  });
});
