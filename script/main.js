if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "index.html";
};

let allIssues = [];



// Priority badge
const getPriorityBadge = (priority) => {
    if (priority === "high") {
        return `<span class="badge badge-error badge-soft text-xs">${priority.toUpperCase()}</span>`;
    } else if (priority === "medium") {
        return `<span class="badge badge-warning badge-soft text-xs">${priority.toUpperCase()}</span>`;
    } else {
        return `<span class="badge badge-ghost text-xs">${priority.toUpperCase()}</span>`;
    }
};

// Status badge
const getStatusBadge = (status) => {
    if (status === "open") {
        return `<span class="badge badge-success badge-soft text-xs">${status}</span>`;
    } else {
        return `<span class="badge badge-ghost badge-soft text-xs">${status}</span>`;
    }
};



const renderIssues = (issues) => {
    const issuesDiv = document.getElementById("issues-div");

      document.getElementById("issue-count").innerText = `${issues.length} Issues`;

    issuesDiv.innerHTML = "";

    issues.forEach(issue => {

        const isOpen = issue.status === "open";

        const borderColor = isOpen ? "border-t-green-500" : "border-t-purple-500";

        issuesDiv.innerHTML += `
            <div class="card bg-base-100 shadow-sm p-4 border-t-4 ${borderColor}">
                
                <!-- Top: Status + Priority -->
                <div class="flex justify-between items-center mb-3">
                    ${getStatusBadge(issue.status)}
                    ${getPriorityBadge(issue.priority)}
                </div>

                <!-- Title -->
                <h3 class="font-semibold text-sm mb-1">${issue.title}</h3>

                <!-- Description -->
                <p class="text-gray-400 text-xs mb-3">${issue.description}</p>

                <!-- Labels -->
                <div class="flex gap-1 flex-wrap mb-3">
                    ${issue.labels.map(label => `
                        <span class="badge badge-outline text-xs">${label}</span>
                    `).join("")}
                </div>

                <!-- Footer: Author + Date -->
                <div class="border-t pt-2 mt-auto">
                    <p class="text-xs text-gray-400">#${issue.id} by ${issue.author}</p>
                    <p class="text-xs text-gray-400">${issue.createdAt}</p>
                </div>

            </div>
        `;
    });
};



const loadIssues = async () => {
    const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await response.json();

    const issues = data.data;
    console.log(issues);

    renderIssues(issues);
};

loadIssues();