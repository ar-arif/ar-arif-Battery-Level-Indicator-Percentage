initBatteery()

let charging_text = "Charging";
let charging_text_index = 0;
var charging_interval_id;
function chargingTextAnimation(batteryStatus) {

	if (charging_text_index == 0) {
		charging_text = "Charging"
		charging_text_index++
	}
	else if (charging_text_index == 1) {
		charging_text = "Charging."
		charging_text_index++
	}
	else if (charging_text_index == 2) {
		charging_text = "Charging.."
		charging_text_index++
	}
	else if (charging_text_index >= 3) {
		charging_text = "Charging..."
		charging_text_index = 0
	}

	batteryStatus.innerHTML = `${charging_text} <i class="ri-flashlight-line animated-green"></i>`;

}

function timeUpdate() {
	let time = new Date().toLocaleTimeString()
	let date = new Date().toDateString()
	let time_element = document.querySelector('.time')
	time_element.innerHTML = `<span>${time}</span><br/>${date}`
}

setInterval(timeUpdate, 1000)

function initBatteery() {
	const batteeryLiquid = document.querySelector('.battery__liquid'),
		batteryStatus = document.querySelector('.battery__status'),
		batteryPercentage = document.querySelector('.battery__percentage');

	navigator.getBattery().then((batt) => {
		updateBattery = () => {
			let level = Math.floor(batt.level * 100);
			batteryPercentage.innerHTML = level + ' %';
			batteeryLiquid.style.height = `${parseInt(batt.level * 100)}%`;

			if (level == 100) {
				batteryStatus.innerHTML = `Full battery <i class="ri-battery-2-fill green-color"></i>`;
				batteeryLiquid.style.height = '103%';
			}
			else if (level <= 20 && !batt.charging) {
				batteryStatus.innerHTML = `Low batterey <i class="ri-plug-line animated-red"></i>`;
			}
			else if (batt.charging) {
				charging_interval_id = setInterval(() => chargingTextAnimation(batteryStatus), 1000);
			}
			else if (!batt.charging) {
				clearInterval(charging_interval_id);
				batteryStatus.innerHTML = '';
			}
			else {
				batteryStatus.innerHTML = '';
			}

			if (level <= 20) {
				batteeryLiquid.classList.add('gradient-color-red');
				batteeryLiquid.classList.remove('gradient-color-orange', 'gradient-color-yellow', 'gradient-color-green');
			}
			else if (level <= 40) {
				batteeryLiquid.classList.add('gradient-color-orange');
				batteeryLiquid.classList.remove('gradient-color-red', 'gradient-color-yellow', 'gradient-color-green');
			}
			else if (level <= 80) {
				batteeryLiquid.classList.add('gradient-color-yellow');
				batteeryLiquid.classList.remove('gradient-color-red', 'gradient-color-orange', 'gradient-color-green');
			}
			else {
				batteeryLiquid.classList.add('gradient-color-green');
				batteeryLiquid.classList.remove('gradient-color-red', 'gradient-color-orange', 'gradient-color-yellow');
			}
		}
		updateBattery();
		batt.addEventListener('chargingchange', () => { updateBattery() })
		batt.addEventListener('levelchange', () => { updateBattery() })
	})
}