describe("Pruebas E2E para ProductorDetail", () => {
  const productorId = 1;
  const reviewKey = `review-productor-${productorId}`;

  beforeEach(() => {
    cy.clearLocalStorage(reviewKey);
    cy.visit(`http://localhost:3000/productores/${productorId}`);
  });

  it("Renderiza correctamente los detalles del productor", () => {
    cy.contains("Cargando...").should("exist");
    cy.get(".productor-detail-container").should("exist");
    cy.get(".productor-detail-img").should("be.visible");
    cy.get("h2").should("not.be.empty");
    cy.contains(/ubicación/i).should("exist");
    cy.get(".btn-volver").should("have.attr", "href", "/productores");
  });

  it("Permite calificar y guardar comentario", () => {
    cy.get('[data-testid="estrella-4"]').click();

    cy.get('[data-testid^="estrella-"]').then(($stars) => {
      expect($stars.eq(3).text()).to.equal("⭐");
      expect($stars.eq(4).text()).to.equal("☆");
    });

    cy.get(".comentario").type("Gran trabajo, muy amable y comprometida.");

    cy.window().then((win) => {
      cy.stub(win, "alert").as("alert");
    });

    cy.get(".btn-calificar").click();

    cy.get("@alert").should("have.been.calledWith", "productores.mensajeGuardado");

    cy.window().then((win) => {
      const guardado = JSON.parse(win.localStorage.getItem(reviewKey));
      expect(guardado.calificacion).to.equal(4);
      expect(guardado.comentario).to.include("Gran trabajo");
    });
  });
});
