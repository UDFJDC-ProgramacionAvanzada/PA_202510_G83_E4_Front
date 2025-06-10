describe("Formulario de Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("Renderiza correctamente el formulario de login", () => {
    cy.get("h2").contains("Iniciar Sesión");
    cy.get("label").should("have.length", 2);
    cy.get("input").should("have.length", 2);
    cy.get("button").contains("Ingresar");
  });

  it("Permite escribir en los campos de usuario y contraseña", () => {
  cy.get("input[name='username']")
    .scrollIntoView()
    .type("usuarioPrueba", { force: true });

  cy.get("input[name='contrasena']")
    .scrollIntoView()
    .type("123456", { force: true });
});


 it("No permite enviar el formulario si algún campo está vacío", () => {
  // Solo llenamos el campo de usuario
  cy.get("input[name='username']")
    .scrollIntoView()
    .type("usuarioPrueba", { force: true });

  // Stub del alert para capturar el mensaje
  cy.window().then((win) => {
    cy.stub(win, "alert").as("alerta");
  });

  // Enviamos el formulario
  cy.get("form").scrollIntoView().submit();

  // Verificamos que el alert se haya llamado con el texto esperado
  cy.get("@alerta").should(
    "have.been.calledWith",
    "Por favor, completa todos los campos."
  );
});

});
