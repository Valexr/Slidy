import { writable } from 'svelte/store'

let settingX = {
	wrap: {
		id: 'slidy',
		width: '100%',
		height: '100%',
		padding: '0',
		align: 'middle',
		alignmargin: 50
	},
	slide: {
		gap: 50,
		class: 'slide',
		width: '50%',
		height: '50%',
		backimg: false,
		imgsrckey: 'src',
		objectfit: 'cover',
		overflow: 'visible',
	},
	controls: {
		dots: true,
		dotsnum: true,
		dotsarrow: true,
		dotspure: true,
		arrows: false,
		keys: true,
		drag: true,
		wheel: true,
	},
	options: {
		// axisy: false,
		axis: 'x',
		loop: false,
		duration: 550,
		intersecting: true
	},
	// loader: {
	//     color: 'red',
	//     size: 75,
	//     thickness: 1,
	//     speed: 550,
	// },
	// index: 4,
	// limit: 9,
	// slides: `local`,
	// activescale: false,
	// text: true,
	// mode: 'cards',
	// extcontrols: true,
	// extthumbs: true,
	// attention: 'limit * page <= 1000',
	// page: 25,
	// slidyinit: false
}

export const settings = writable(JSON.parse(sessionStorage.getItem("slidySettings")) || settingX);
settings.subscribe(val => sessionStorage.setItem("slidySettings", JSON.stringify(val)));

export const set = writable({
	open: false,
	input: false
})

export const con = writable({
	open: false
})

export const index = writable(4)
export const limit = writable(9)
export const page = writable(25)
