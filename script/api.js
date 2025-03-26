let getProjectsApi = async () => {
    let res = await $fetch("https://ebot.moderndata.ir/api/v1/public/all", {
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
        },
    });
    return res;
};

let askQuestionApi = async (projectId, question) => {
    let res = await $fetch("https://ebot.moderndata.ir/api/v1/public/ask", {
        method: "POST",
        body: {
            project: projectId,
            question: question,
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Token ${localStorage.getItem("token")}`,
        },
    });    
    return res;
};
export { getProjectsApi, askQuestionApi };
