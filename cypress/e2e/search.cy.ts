describe('search products spec', () => {
  beforeEach(() => {
  })

  it('should be able to search for products', () => {
    cy.searchByQuery('camiseta')
    cy.location('pathname').should('include', '/search')
    cy.location('search').should('include', 'q=camiseta')
    cy.get('a[href^="/products"]').should('exist')
  })

  it('should not be able to visit search page without a search query', () => {
    cy.on('uncaught:exception', () => {
      return false
    })
    cy.visit('/search')
    cy.location('pathname').should('equal', '/')
  })
})