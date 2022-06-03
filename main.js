initBatteery()

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
				batteryStatus.innerHTML = `Charging... <i class="ri-flashlight-line animated-green"></i>`;
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