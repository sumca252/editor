/// <references types="cypress" />
describe("Editor", () => {
    before(() => {
        cy.request(
            "DELETE",
            "https://jsramverk-editor-isal-20.azurewebsites.net/api/users/reset"
        );
    });

    beforeEach(() => {
        cy.visit("http://localhost:5173");
    });

    it("should display the login page", () => {
        expect(cy.get("h1").should("contain", "Login")).to.exist;
    });

    it("should display the register page", () => {
        cy.get("a").contains("Register").click();
        expect(cy.get("h1").should("contain", "Register")).to.exist;
    });

    it("should register a new user and login", () => {
        cy.get("a").contains("Register").click();
        cy.get("input[name='email']").type("test@example.com");
        cy.get("input[name='password']").type("password");
        cy.get("input[name='confirmPassword']").type("password");
        // get button type submit and click
        cy.get("button[type='submit']").click();

        expect(cy.get("h1").should("contain", "Login")).to.exist;

        cy.window().then((win) => {
            expect(win.localStorage.getItem("email")).to.equal(
                "test@example.com"
            );
        });

        cy.get("input[name='email']").should("have.value", "test@example.com");

        cy.get("input[name='password']").type("password");

        cy.get("button[type='submit']").click();

        expect(cy.get("h1").should("contain", "All Documents")).to.exist;
    });
});
