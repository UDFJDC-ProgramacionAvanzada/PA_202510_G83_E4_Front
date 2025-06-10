describe("Pruebas E2E para Productores", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/productores");
  });

  it("Renderiza título, input y al menos un productor", () => {
    cy.contains("h2", /productores/i).should("be.visible");
    cy.get("input.input-busqueda").should("exist");
    cy.get(".productores-grid").find(".productor-card").should("have.length.at.least", 1);
  });

  it("Filtra productores por nombre o ubicación", () => {
    cy.get("input.input-busqueda").type("maría");

    cy.get(".productor-card").each(($el) => {
      cy.wrap($el).invoke("text").should("match", /maría/i);
    });

    cy.get("input.input-busqueda").clear().type("córdoba");

    cy.get(".productor-card").each(($el) => {
      cy.wrap($el).invoke("text").should("match", /córdoba/i);
    });
  });
  it("Cada productor tiene un botón de calificar funcional", () => {
  cy.get(".productor-card").each(($el) => {
    // Verifica que dentro del card exista el botón con clase
    cy.wrap($el).find(".btn-compra").should("exist");

    // Opcional: verificar que sea un <a> con href correcto
    cy.wrap($el).find(".btn-compra").should("have.attr", "href").and("include", "/productores/");
  });
});

});
