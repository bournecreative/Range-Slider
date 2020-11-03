import Data from "../../data/planData.json";

export default function () {
    let setPrice = document.querySelectorAll('[data-plan]');
    Array.prototype.slice.call(setPrice).map((item, index) => {
        const targetEle = item.getAttribute('data-plan')
        const targetDataPlan = Data.plans[index][targetEle]
        const planPrice = targetDataPlan["startPrice"]
        item.innerHTML = priceTemplate(planPrice);
    })
}

function priceTemplate(data) {
    return `${data}`
}