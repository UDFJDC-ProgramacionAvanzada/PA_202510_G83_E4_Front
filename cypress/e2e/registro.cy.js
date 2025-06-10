describe("Registro Formulario", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/registro");
  });

  it("Carga el formulario correctamente", () => {
    cy.get("h2").contains("Registrarse");
    cy.get("label").should("have.length", 5); // ✅ Ahora sí hay 5 etiquetas
    cy.get("input").should("have.length", 4); // username, correo, contraseña, confirmar
    cy.get("select").should("have.length", 1); // tipoUsuario
    cy.get("button").contains("Registrarse");
  });

  it("Muestra alerta si las contraseñas no coinciden", () => {
    cy.get("input[name='username']").type("testuser");
    cy.get("input[name='correo']").type("test@correo.com");
    cy.get("input[name='contrasena']").type("123456");
    cy.get("input[name='confirmarContrasena']").type("654321");
    cy.get("select[name='tipoUsuario']").select("vendedor");

    cy.on("window:alert", (str) => {
      expect(str).to.equal("Las contraseñas no coinciden");
    });

    cy.get("form").submit();
  });
});
