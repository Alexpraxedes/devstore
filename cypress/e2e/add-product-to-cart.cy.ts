describe('add product to cart spec', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should be able to navigate to the product page and add it to the cart', () => {
    cy.get('a[href^="/products"]').first().click()
    cy.location('pathname').should('match', /\/products\/.+/)
    cy.contains('Adicionar ao carrinho').click()
    cy.contains('Cart (1)').should('exist')
  })

  it('should not count duplicated products on cart', () => {
    cy.get('a[href^="/products"]').first().click()
    cy.location('pathname').should('match', /\/products\/.+/)
    cy.contains('Adicionar ao carrinho').click()
    cy.contains('Adicionar ao carrinho').click()
    cy.contains('Cart (1)').should('exist')
  })

  it('should not count duplicated products on cart', () => {
    cy.get('input[name=q').type('camiseta').parent('form').submit()
    cy.get('a[href^="/products"]').first().click()
    cy.location('pathname').should('match', /\/products\/.+/)
    cy.contains('Adicionar ao carrinho').click()
    cy.contains('Cart (1)').should('exist')
  })
})