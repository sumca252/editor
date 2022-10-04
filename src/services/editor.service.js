import axios from "axios";

class EditorService {
    queryAllDocuments() {
        return axios({
            method: "post",
            url: "https://jsramverk-editor-isal-20.azurewebsites.net/graphql",
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
}

export default new EditorService();
