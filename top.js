function showPlan(plan, panelTitle) {
    // Change only the right panel's title
    document.getElementById('planTitle').innerText = `${panelTitle} - ${plan}`;

    // Check if the left panel's title is not "あなたの旅" and update it if needed
    const leftPanelTitle = document.querySelector('#left-panel .box-around-h2 h2');
    if (leftPanelTitle.innerText !== "あなたの旅") {
        leftPanelTitle.innerText = "あなたの旅";
        const planContainer = document.querySelector('#left-panel .bookmark-container');
        // Clear existing plan items, but keep the panel title
        while (planContainer.firstChild) {
            planContainer.removeChild(planContainer.firstChild);
        }

        const titleDiv = document.createElement('div');
        titleDiv.className = 'box-around-h2';
        const titleH2 = document.createElement('h2');
        titleH2.innerText = "あなたの旅";
        titleDiv.appendChild(titleH2);
        planContainer.appendChild(titleDiv);

        const plans = ["京都旅行２０２３", "イタリア", "北海道（仮）", "京都グルメ", "京都へ行こう", "新しいプラン"];
        plans.forEach(p => {
            const planItem = document.createElement('a');
            planItem.href = "#";
            planItem.className = "bookmark-link";
            planItem.innerHTML = `${p} <i class='fas fa-chevron-right'></i>`;
            planItem.onclick = function () {
                showPlan(p, "あなたの旅");
            };

            planContainer.appendChild(planItem);
        });

        const newPlanButton = document.createElement('button');
        newPlanButton.className = "bookmark-link";
        newPlanButton.innerHTML = "新たな旅";
        newPlanButton.onclick = function () {
            addNewPlan();
        };

        planContainer.appendChild(newPlanButton);
        // Additional code for other plans if needed
    }
}

let newPlanCount = 1; // Variable to keep track of the new plan count

function showPlan(plan, panelTitle) {
    // Change only the right panel's title
    document.getElementById('planTitle').innerText = `${panelTitle} - ${plan}`;

    // Check if the left panel's title is not "あなたの旅" and update it if needed
    const leftPanelTitle = document.querySelector('#left-panel .box-around-h2 h2');
    if (leftPanelTitle.innerText !== "あなたの旅") {
        leftPanelTitle.innerText = "あなたの旅";
        const planContainer = document.querySelector('#left-panel .bookmark-container');

        // Clear existing plan items, but keep the panel title
        planContainer.innerHTML = '';

        const titleDiv = document.createElement('div');
        titleDiv.className = 'box-around-h2';
        const titleH2 = document.createElement('h2');
        titleH2.innerText = "あなたの旅";
        titleDiv.appendChild(titleH2);
        planContainer.appendChild(titleDiv);

        const plans = ["京都旅行２０２３", "イタリア", "北海道（仮）", "京都グルメ", "京都へ行こう", "新しいプラン"];
        plans.forEach(p => {
            const planItem = document.createElement('a');
            planItem.href = "#";
            planItem.className = "bookmark-link";
            planItem.innerHTML = `${p} <i class='fas fa-chevron-right'></i>`;
            planItem.onclick = function () {
                showPlan(p, "あなたの旅");
            };

            planContainer.appendChild(planItem);
        });

        const newPlanButton = document.createElement('button');
        newPlanButton.className = "bookmark-button";
        newPlanButton.innerHTML = "新たな旅 <i class='fas fa-chevron-right'></i>";
        newPlanButton.onclick = function () {
            addNewPlan();
        };

        planContainer.appendChild(newPlanButton);
    }
}

function addNewPlan() {
    const planContainer = document.querySelector('#left-panel .bookmark-container');

    // Create a new plan item
    const newPlan = document.createElement('a');
    newPlan.href = "#";
    newPlan.className = "bookmark-link";
    newPlan.innerHTML = `新たな旅 ${newPlanCount} <i class='fas fa-chevron-right'></i>`;
    newPlan.onclick = function () {
        showPlan(`新たな旅 ${newPlanCount}`, 'あなたの旅');
    };

    // Add a line break if it's not the first plan
    if (newPlanCount > 1) {
        const lineBreak = document.createElement('br');
        planContainer.appendChild(lineBreak);
    }

    // Append the new plan to the existing container
    planContainer.appendChild(newPlan);

    // Increment the new plan count for the next plan
    newPlanCount++;
}


// Initial call to set up the default plans
showPlan('京都旅行２０２３', 'あなたの旅');

// Function to initialize the "新たな旅" button
function initNewPlanButton() {
    const planContainer = document.querySelector('#left-panel .bookmark-container');

    // Create the "新たな旅" button
    const newPlanButton = document.createElement('button');
    newPlanButton.className = "bookmark-button new-plan-button";
    newPlanButton.innerHTML = "新たな旅 <i class='fas fa-chevron-right'></i>";
    newPlanButton.onclick = addNewPlan;

    // Append the button to the container
    planContainer.appendChild(newPlanButton);
}

// Call the initialization function
initNewPlanButton();
