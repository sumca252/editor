/// <references types="cypress" />
const path = require("path");

describe("Project", () => {
    before(() => {
        cy.request("DELETE", "http://localhost:3000/api/editor/reset");
        cy.request("DELETE", "http://localhost:3000/api/users/reset");
        cy.request("DELETE", "http://localhost:3000/api/comments");
    });

    beforeEach(() => {
        cy.visit("http://localhost:5173");
        cy.get("input[name='email']").type("john.doe@test.com");
        cy.get("input[name='password']").type("pass");
        cy.get("button[type='submit']").click();
    });

    it("should export a document as a PDF", () => {
        cy.get(":nth-child(1) > .p-6 > .text-underlined").click();
        cy.get(":nth-child(2) > .flex-wrap > .flex > :nth-child(1)").click();
        cy.verifyDownload(".pdf", { contains: true });
    });

    it("should comment a document", () => {
        cy.get(":nth-child(1) > .p-6 > .text-underlined").click();
        cy.get(".ql-editor > :nth-child(3)");
        cy.get("#custom-button").click();
        cy.get(".swal2-input").type("test comment");
        cy.get(".swal2-confirm").click();

        expect(
            cy
                .get(".no-underline > .text-black")
                .should("contain", "test comment")
        ).to.exist;
    });

    it("should send invite", () => {
        cy.get(":nth-child(2) > .p-6 > .text-underlined").click();
        cy.get(":nth-child(2) > .flex-wrap > .flex > :nth-child(2)").click();
        cy.get(".swal2-confirm").click();

        cy.get("#swal2-title").should("contain", "Invite sent");
    });

    it("should display codemode page", () => {
        cy.get("#codemode").click();
        cy.get(".text-2xl").should("contain", "Codemode");
    });

    it("should execute code", () => {
        cy.get("#codemode").click();

        cy.get(".p-6 > .flex > :nth-child(2)").click();
        cy.get(".output").should("contain", "Hello World");
    });

    it("should save code", () => {
        cy.get("#codemode").click();

        cy.get(".p-6 > .flex > :nth-child(1)").click();
        cy.verifyDownload(".js", { contains: true });
    });
});
