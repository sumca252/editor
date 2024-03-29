/// <references types="cypress" />
describe("Editor", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173");
        cy.get("input[name='email']").type("john.doe@test.com");
        cy.get("input[name='password']").type("pass");
        cy.get("button[type='submit']").click();
    });

    it("should display the editor login page", () => {
        expect(cy.get("h1").should("contain", "Login")).to.exist;
    });

    it("should login and create a new document", () => {
        expect(cy.get("h1").should("contain", "All Documents")).to.exist;
        cy.get(".bg-transparent").click();

        // load test data
        cy.fixture("create.json").then((data) => {
            cy.get("form").within(() => {
                cy.get("input[name='title']").type(data.title); // fill the title field
            });

            // fill the quill editor
            cy.get(".ql-editor").type(data.content);

            // click the save button
            cy.get("button").contains("Save text").click();

            // check if new text with test title and content exists
            expect(cy.get("h5").should("contain", data.title)).to.exist;
        });
    });
});
