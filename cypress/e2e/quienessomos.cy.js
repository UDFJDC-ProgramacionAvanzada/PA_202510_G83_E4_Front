describe("Página ¿Quiénes somos?", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/quienes-somos");
  });

  it("Renderiza la sección correctamente", () => {
    cy.get(".quienes").should("exist");
    cy.get(".quienes-left").should("exist");
    cy.get(".quienes-right").should("exist");
  });

  it("Contiene el círculo decorativo y la imagen", () => {
    cy.get(".circulo-decorativo").should("exist");
    cy.get(".quienes-img").should("be.visible");
  });

  it("Muestra títulos y descripciones", () => {
    cy.contains(/misión/i).should("exist");
    cy.contains(/visión/i).should("exist");
    cy.contains(/valores/i).should("exist");
  });

  it("Contiene valores clave listados", () => {
    cy.get(".quienes-right ul").within(() => {
      cy.contains(/autenticidad/i);
      cy.contains(/comunidad/i);
      cy.contains(/sostenibilidad/i);
    });
  });
});
