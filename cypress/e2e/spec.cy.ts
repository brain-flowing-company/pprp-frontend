describe('first test', () => {
  it('Visit', () => {
    cy.visit('http://localhost:3000/register')
    
    cy.contains('type').click();

  })

})