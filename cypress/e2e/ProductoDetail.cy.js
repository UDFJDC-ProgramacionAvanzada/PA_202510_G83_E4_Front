describe("Pruebas E2E para ProductoDetail", () => {
  const productoId = 1;
  const reviewKey = `review-${productoId}`;

  beforeEach(() => {
    cy.clearLocalStorage(reviewKey);
    cy.visit(`http://localhost:3000/productos/${productoId}`);
  });

  it("Muestra los detalles del producto correctamente", () => {
    cy.contains("Cargando...").should("exist");

    cy.get(".producto-detail-container").should("exist");
    cy.get(".producto-detail-img").should("be.visible");
    cy.get("h2").should("not.be.empty");
    cy.contains(/precio/i).should("exist");
    cy.contains(/descripción/i).should("exist");
    cy.get(".btn-volver").should("have.attr", "href", "/tienda");
  });

  it("Permite calificar con estrellas, escribir un comentario y guardar", () => {
    // Click en la estrella 4
    cy.get('[data-testid="estrella-4"]').click();

    // Verificar que 4 son llenas y la 5 es vacía
    cy.get('[data-testid^="estrella-"]').then(($stars) => {
      expect($stars.length).to.equal(5);
      expect($stars.eq(0).text()).to.equal("⭐");
      expect($stars.eq(3).text()).to.equal("⭐");
      expect($stars.eq(4).text()).to.equal("☆");
    });

    // Escribir un comentario
    cy.get(".comentario").type("Muy buen producto, lo recomiendo!");

    // Interceptar alert
    cy.window().then((win) => {
      cy.stub(win, "alert").as("alert");
    });

    // Clic en "Enviar Calificación"
    cy.get(".btn-calificar").click();

    // Verifica que alert fue llamado con el ID del mensaje (sin traducción)
    cy.get("@alert").should("have.been.calledWith", "productos.mensajeGuardado");

    // Verificar que se guardó en localStorage
    cy.window().then((win) => {
      const guardado = JSON.parse(win.localStorage.getItem(reviewKey));
      expect(guardado.calificacion).to.equal(4);
      expect(guardado.comentario).to.include("Muy buen producto");
    });
  });
});
