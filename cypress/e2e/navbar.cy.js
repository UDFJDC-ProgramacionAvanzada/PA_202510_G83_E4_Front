describe('Pruebas E2E para Navbar', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Verifica todos los elementos visibles y funcionalidad de los links', () => {
    // Logo
    cy.get('.logo')
      .should('be.visible')
      .and('have.attr', 'alt', 'Kapchy Market Logo')
      .click(); // Prueba que sea clickeable
    cy.url().should('eq', 'http://localhost:3000/');

    // Links de navegación
    const navLinks = [
      { index: 0, href: '/tienda' },
      { index: 1, href: '/productores' },
      { index: 2, href: '/quienes-somos' },
    ];

    navLinks.forEach(({ index, href }) => {
      cy.get('.nav-links li').eq(index).find('a')
        .should('have.attr', 'href', href)
        .click();
      cy.url().should('include', href);
      cy.go('back'); // Volver para seguir probando
    });

    // Icono de usuario y links de sesión
    cy.get('.icono-user')
      .should('be.visible')
      .and('have.attr', 'alt', 'Iniciar Sesión');

    cy.contains('a', /iniciar/i)
      .should('have.attr', 'href', '/login')
      .click();
    cy.url().should('include', '/login');
    cy.go('back');

    cy.contains('a', /registrarse/i)
      .should('have.attr', 'href', '/registro')
      .click();
    cy.url().should('include', '/registro');
    cy.go('back');

    // Icono y link del carrito
    cy.get('.icono-carrito')
      .should('be.visible')
      .and('have.attr', 'alt', 'Carrito de Compras')
      .parent('a')
      .should('have.attr', 'href', '/carrito')
      .click();
    cy.url().should('include', '/carrito');
  });
});
