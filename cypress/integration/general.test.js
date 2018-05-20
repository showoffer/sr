describe("General", () => {
  // beforeEach(() => {
  //   cy.visit("/");
  // });
  //
  // it("Focuses 'Check All' button", () => {
  //   cy.focused().should("have.class", "check-all-btn");
  // });
  //
  // it("Click North America btn has appropriate class", () => {
  //   cy.get(":nth-child(2) > .checkbox-outer > .checkbox").as("nAm");
  //   cy.get("@nAm").click();
  //   cy.get("@nAm").should("have.class", "checked");
  // });

  it("First stubbed test", () => {
    const url = "http://syngenta.inside.cactussoft.biz/api/Regions";
    cy.server();
    cy.route("GET", url, "fixture:regions").as("load");
    cy.visit("/");
    cy.wait("@load");
    cy.get(".regions-form .checkbox").should("have.length", 5);
  });

  it("Load territories and check them", () => {
    const url = "http://syngenta.inside.cactussoft.biz/api/Regions";
    cy.server();
    cy.route("GET", url, "fixture:regions").as("load");
    cy.visit("/");
    cy.get(".regions-form :nth-child(3) > .checkbox-outer > .checkbox").click();
    cy.get(".sidebar .checkbox").should("have.length", 1);
  });
});
