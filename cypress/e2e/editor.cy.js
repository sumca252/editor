/// <references types="cypress" />
describe("Editor", () => {
    beforeEach(() => {
        cy.visit("http://127.0.0.1:5173");
    });

    it("should display the editor front page", () => {
        expect(cy.get("h1").should("contain", "All Documents")).to.exist;
        expect(cy.get("a").should("contain", "Create new text")).to.exist;
    });

    it("should create a new text", () => {
        cy.get("a").contains("Create new text").click();

        // load test data
        cy.fixture("create.json").then((data) => {
            cy.get("form").within(() => {
                cy.get("input").type(data.title); // fill the title field
            });

            // fill the quill editor
            cy.get(".ql-editor").type(data.content);

            // click the save button
            cy.get("button").contains("Save text").click();

            // check if new text with test title and content exists
            expect(cy.get("h5").should("contain", data.title)).to.exist;
            expect(cy.get("p").should("contain", data.content)).to.exist;
        });
    });

    it("should update newly created text", () => {
        // click the text with test title
        cy.get("h5").contains("Test title").click();

        // get input named title
        cy.get("input[name='title']").then(($input) => {
            // clear the title field
            cy.wrap($input).clear();

            // write new title
            cy.wrap($input).type("New title");
        });

        // click the save button
        cy.get("button").contains("Update text").click();

        // check if new text with new title and content exist

        // check if new title exists
        expect(cy.get("h5").should("contain", "New title")).to.exist;
    });
});
