import Odometer from "odometer";
import Data from "../../data/planData.json";

export default function () {
	const slider = document.getElementById('priceRange'),
		tickMarkContainer = document.querySelector('.ticks'),
		tickMarks = Array.prototype.slice.call(document.querySelectorAll('.tick'));

	function setActive() {
		tickMarks.map(function (tick) {
			var tickIndex = parseInt(tick.getAttribute('data-range'));
			tick.classList.remove('active');
			tick.classList.remove('passed');
			if (tickIndex <= Math.floor(slider.value)) {
				tick.classList.add('passed');
				if (tickIndex === Math.round(slider.value)) {
					tick.classList.add('active');
				}
			}
		});
	}

	function updateSlider() {
		const threeMonthTick = document.querySelector('.tick:nth-child(4)'),
			tenMonthTick = document.querySelector('.tick:nth-child(10)'),
			min = this.getAttribute('min'),
			perc = (this.value - min) * 11,
			currentRange = Math.floor(this.value);

		this.style.backgroundImage = '-webkit-gradient(linear, left top, right top, ' +
			'color-stop(' + perc + '%, #b8b8b8), ' +
			'color-stop(' + perc + '%, #3b3a3b' +
			')';
		this.style.backgroundImage = 'linear-gradient(to right, #b8b8b8 ' + perc + '%, #3b3a3b ' + perc + '%)';

		if (currentRange > 4) {
			this.style.backgroundImage = '-webkit-gradient(linear, left top, right top, ' +
				'color-stop(' + perc + '%, #008631), ' +
				'color-stop(' + perc + '%, #3b3a3b' +
				')';
			this.style.backgroundImage = 'linear-gradient(to right, #008631 ' + perc + '%, #3b3a3b ' + perc + '%)';
			threeMonthTick.textContent = "✓"
			updatePrice()
		} else {
			threeMonthTick.textContent = "4"
			updatePrice()
		}

		if (currentRange >= 10) {
			tenMonthTick.textContent = "✓"
			updatePrice()
		} else {
			tenMonthTick.textContent = "10+"
			updatePrice()
		}
		setActive();
	};

	function updatePrice() {
		let setPrice = document.querySelectorAll('[data-plan]');
		Array.prototype.slice.call(setPrice).map((item, index) => {
			const targetEle = item.getAttribute('data-plan')
			const targetDataPlan = Data.plans[index][targetEle]
			const planPrice = targetDataPlan["startPrice"]
			item.innerHTML = calcPrice(planPrice);
			calcPrice()
		})
	}

	function calcPrice(price) {
		let computedValue = price;
		if (slider.value >= 4) {
			computedValue = computedValue - Data.discounts.overThree
		}
		if (slider.value >= 10) {
			computedValue = computedValue - Data.discounts.overTen
		}
		return `${computedValue}`
	}

	slider.addEventListener('change', updateSlider)
}