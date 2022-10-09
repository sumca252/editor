import axios from "axios";

const url = window.location.origin.includes("localhost")
    ? "http://localhost:3000"
    : "https://jsramverk-editor-isal-20.azurewebsites.net";

class EditorService {
    queryAllDocuments() {
        return axios({
            method: "post",
            url: `${url}/graphql`,
            data: {
                query: `
                    query {
                        documents {
                          _id
                          title
                          content
                          author
                          allowed_users
                        }
                    }
                `,
            },
        });
    }

    getAllData() {
        return axios.get("/editor");
    }

    saveData(data) {
        return axios.post("/editor", data);
    }

    getDataById(id) {
        return axios.get(`/editor/${id}`);
    }

    updateData(id, data) {
        return axios.put(`/editor/${id}`, data);
    }

    getAllComments() {
        return axios.get("/comments");
    }

    getCommentsByDocumentId(id) {
        return axios.get(`/comments/${id}`);
    }

    insertComment(data) {
        return axios.post("/comments", data);
    }
}

export default new EditorService();
