describe('Pruebas E2E para Productos', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/tienda');
  });

  it('Verifica que los elementos principales se rendericen', () => {
    cy.contains('h2', /productos/i).should('be.visible');
    cy.get('input.input-busqueda').should('exist');
    cy.get('select.select-precio').should('exist');
    cy.get('.producto-card').should('have.length.at.least', 1);
  });

  it('Filtra productos al escribir en la barra de búsqueda', () => {
    cy.get('input.input-busqueda').type('café');
    cy.get('.producto-card').each(($el) => {
      cy.wrap($el).contains(/café/i);
    });
  });

  it('Ordena productos por precio (menor a mayor)', () => {
    cy.get('select.select-precio').select('asc');
    cy.wait(500); // da tiempo al DOM para reordenar

    cy.get('[data-testid="producto-precio"]').then(($els) => {
      const precios = [...$els].map(el =>
        parseFloat(el.textContent.replace(/[^\d.]/g, ''))
      );
      const ordenado = [...precios].sort((a, b) => a - b);
      expect(precios).to.deep.equal(ordenado);
    });
  });

  it('Ordena productos por precio (mayor a menor)', () => {
    cy.get('select.select-precio').select('desc');
    cy.wait(500); // da tiempo al DOM para reordenar

    cy.get('[data-testid="producto-precio"]').then(($els) => {
      const precios = [...$els].map(el =>
        parseFloat(el.textContent.replace(/[^\d.]/g, ''))
      );
      const ordenado = [...precios].sort((a, b) => b - a);
      expect(precios).to.deep.equal(ordenado);
    });
  });

  it('Agrega un producto al carrito', () => {
    cy.get('.producto-card').first().within(() => {
      cy.get('[data-testid="producto-agregar"]').click();
    });

    cy.get('[data-testid="producto-modal"]').should('be.visible');
    cy.get('[data-testid="producto-cantidad"]').clear().type('2');
    cy.get('[data-testid="producto-confirmar"]').click();

    cy.window().then((win) => {
      const carrito = JSON.parse(win.localStorage.getItem('carrito'));
      expect(carrito.length).to.be.greaterThan(0);
      expect(carrito[0].cantidad).to.be.greaterThan(0);
    });
  });
});
