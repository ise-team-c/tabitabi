const allPlans = ["京都グルメ", "京都へ行こう", "大阪ユニバを楽しむ", "大阪グリコ", "大阪たこやき", "イタリアピザ", "イタリアおいしい", "イタリアパスタ", "東京タワー", "浅草", "東京温泉", "フランス美術館巡り", "フランスモンサンミシェル", "IBM"];

// 旅仲間の旅のプランを表示するための要素
const travelCompanionPlansContainer = document.getElementById('travelCompanionPlans2');

// 旅仲間の旅のプランをHTMLに追加
allPlans.forEach(p => {
    const planItem = document.createElement('div');
    planItem.className = "bookmark-link";
    planItem.innerText = p;
    planItem.href = "#";
    travelCompanionPlansContainer.appendChild(planItem);
});


function showPlan(plan, panelTitle) {
    // Change only the right panel's title
    const rightPanelTitle = document.getElementById('planTitle');

    if (panelTitle === "あなたの旅") {
        rightPanelTitle.innerText = `${panelTitle} - ${plan}`;
    } else if (panelTitle === "旅仲間の旅") {
        rightPanelTitle.innerText = `${panelTitle} - ${plan}`;
    }
    
    // Backendからもらった旅の配列（スタブ）
    const plans = {

    }

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
            const planItem = document.createElement('div');
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
            addNewPlan(planContainer);
        };

        planContainer.appendChild(newPlanButton);
        // Additional code for other plans if needed
    }
}

let newPlanCounter = 1;

function addNewPlan(planContainer) {
    const newPlanName = `新たな旅${newPlanCounter}`;
    newPlanCounter++;

    const planItem = document.createElement('div');
    planItem.href = "#";
    planItem.className = "bookmark-link";
    planItem.innerHTML = `${newPlanName} <i class='fas fa-chevron-right'></i>`;
    planItem.onclick = function () {
        showPlan(newPlanName, "あなたの旅");
    };

    planContainer.appendChild(planItem);
}

function filterPlansBySearch() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    console.log("a")
    const plansContainer = document.getElementById('travelCompanionPlans2');

    // Clear existing plan items
    while (plansContainer.firstChild) {
        plansContainer.removeChild(plansContainer.firstChild);
    }

    // Get the plans based on the search input
    const filteredPlans = getFilteredPlans(searchInput);

    // Display the filtered plans
    const titleDiv = document.createElement('div');
    titleDiv.className = 'box-around-h2';
    const titleH2 = document.createElement('h2');
    titleH2.innerText = "あなたの旅";
    titleDiv.appendChild(titleH2);
    plansContainer.appendChild(titleDiv);

    filteredPlans.forEach(p => {
        const planItem = document.createElement('div');
        planItem.href = "#";
        planItem.className = "bookmark-link";
        planItem.innerHTML = `${p} <i class='fas fa-chevron-right'></i>`;
        planItem.onclick = function () {
            showPlan(p, "あなたの旅");
        };

        plansContainer.appendChild(planItem);
    });
}

function getFilteredPlans(searchInput) {
    // Filter plans based on the search input
    const filteredPlans = allPlans.filter(plan => plan.toLowerCase().includes(searchInput));

    return filteredPlans;
}

function showCompanionPlans(...plans) {
    const companionPlans = document.getElementById('companionPlans');
    companionPlans.innerHTML = plans.join('<br>');

    // Update the right panel's title when clicking on a plan in "旅仲間の旅"
    if (plans.length > 0) {
        const planTitle = document.getElementById('planTitle');
        planTitle.innerText = `旅仲間の旅 - ${plans[0]}`;

        // Update the left panel's plans dynamically
        const leftPanelTitle = document.querySelector('#left-panel .box-around-h2 h2');
        leftPanelTitle.innerText = "旅仲間の旅";

        const planContainer = document.querySelector('#left-panel .bookmark-container');
        // Clear existing plan items, but keep the panel title
        while (planContainer.firstChild) {
            planContainer.removeChild(planContainer.firstChild);
        }

        const titleDiv = document.createElement('div');
        titleDiv.className = 'box-around-h2';
        const titleH2 = doscument.createElement('h2');
        titleH2.innerText = "旅仲間の旅";
        titleDiv.appendChild(titleH2);
        planContainer.appendChild(titleDiv);

        plans.forEach(p => {
            const planItem = document.createElement('div');
            planItem.href = "#";
            planItem.className = "bookmark-link";
            planItem.innerHTML = `${p} <i class='fas fa-chevron-right'></i>`;
            planItem.onclick = function () {
                showCompanionPlans(p);
            };

            planContainer.appendChild(planItem);
        });
    }
}
