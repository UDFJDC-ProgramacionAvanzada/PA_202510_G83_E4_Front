describe('Pruebas E2E para Home', () => {
  beforeEach(() => {
    // Asegúrate de que tu app esté corriendo en http://localhost:3000
    cy.visit('http://localhost:3000/');
  });

  it('Verifica todos los elementos', () => {
    // Estructura
    cy.get('[data-test-id="home-section"]').should('exist');
    cy.get('[data-test-id="decorative-circle"]').should('exist');
    
    // Imagen
    cy.get('[data-test-id="artesanos-image"]')
      .should('be.visible')
      .and('have.attr', 'alt', 'Artesanos')
      .and(($img) => {
        const src = $img.attr('src');
        expect(src).to.match(/artesanos/);
      });

    // Textos
    cy.get('[data-test-id="title"]').should('contain', 'Kapchy Market');
    cy.get('[data-test-id="subtitle"]').should('exist');
    cy.get('[data-test-id="description"]').should('exist');

    // Botones
    cy.get('[data-test-id="products-button"]')
      .should('exist')
      .click();
    cy.url().should('include', '/tienda');
    cy.go('back');

   
  });
});
