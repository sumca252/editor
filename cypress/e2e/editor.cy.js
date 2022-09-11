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
        cy.fixture("create.json").then((data) => {
            // click the text with test title
            cy.get("h5").contains(data.title).click();

            cy.get("form").within(() => {
                // fill the title field
                cy.get("input").clear().type("Test update title");
            });

            // clear the editor  and fill the quill editor
            cy.get(".ql-editor")
                .type("{selectall}{backspace}")
                .type("My updated text content");

            // click the save button
            cy.get("button").contains("Update text").click();

            // check if new text with updated title and content exists
            expect(cy.get("h5").should("contain", "Test Title")).to.exist;
            expect(cy.get("p").should("contain", "My updated text content")).to
                .exist;
        });
    });
});
