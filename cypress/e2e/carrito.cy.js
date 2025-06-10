describe("Pruebas E2E para el Carrito", () => {
  const nombreProducto = "Café Orgánico de Nariño";

  beforeEach(() => {
    cy.visit("http://localhost:3000/carrito", {
      onBeforeLoad(win) {
        win.localStorage.setItem("carrito", JSON.stringify([{ id: 1, cantidad: 1 }]));
      }
    });
  });

  it("Renderiza producto y muestra totales correctamente", () => {
    cy.contains(nombreProducto).should("exist");

    // Formato tolerante a . o , como separador de miles
    cy.get(".total-carrito")
      .invoke("text")
      .should("match", /25[.,]000\s?COP/);

    cy.get(".cantidad-total").should("contain", "1");
  });

  it("Permite incrementar cantidad de un producto", () => {
    cy.get(".boton-carrito").contains("➕").click();
    cy.get(".cantidad-total").should("contain", "2");

    cy.get(".total-carrito")
      .invoke("text")
      .should("match", /50[.,]000\s?COP/);
  });

  it("Permite decrementar cantidad y elimina al llegar a 0", () => {
    cy.get(".boton-carrito").contains("➖").click();
    cy.contains(nombreProducto).should("not.exist");

    // Usa texto renderizado traducido o fallback en español
    cy.contains(/(Tu carrito está vacío|carrito\.vacio)/i).should("exist");
  });

  it("Elimina producto con botón eliminar", () => {
    cy.get(".boton-info").click();
    cy.contains(nombreProducto).should("not.exist");

    cy.contains(/(Tu carrito está vacío|carrito\.vacio)/i).should("exist");
  });
});
