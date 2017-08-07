var app = new Vue({
	el: '#app',
	data: {
		msg: 'Hello',
		path: 'M -180 0  q 90 0 180 100 t 180 0 t 180 0 t 180 0 t 180 0 t 180 0 t 180 0 t 180 0 t 180 0 ',
		wavelength: 180,
		xOffset: 0,
		y_loc: window.innerHeight/4,
		y_width: window.innerWidth,
		frequency: 10,
		path_tail: null,
	},
	methods: {
		draw: function(){
			let vm = this;
			if(vm.frequency > 0) vm.xOffset += (+vm.frequency);

			let _wavelength = vm.wavelength;
			if(vm.xOffset >= _wavelength*2) vm.xOffset = 0;

			let _y = vm.y_loc;

			let _path = [];

			_path.push(['M', vm.xOffset- _wavelength*4, _y].join(' '));
			if(vm.path_tail == null){
				vm.redraw_tail();
			}

			_path.push(vm.path_tail);
			vm.path = _path.join(' ');

			requestAnimationFrame(vm.draw);
		},
		redraw_tail: function(){

			let vm = this;
			let _wavelength = vm.wavelength;
			let _y = vm.y_loc;

			let _path_tail = [];
			_path_tail.push(['q', _wavelength/2, 0, _wavelength, _y].join(' '));

			for (var i = (vm.y_width/_wavelength) + 3; i >= 0; i--) {
				_path_tail.push(['t', _wavelength, 0].join(' '));
			}
			vm.path_tail = _path_tail.join(' ');
		}
	},
	watch: {
		wavelength: function(){ this.redraw_tail() },
		frequency: function(){ this.redraw_tail() },
	},
	mounted: function(){
		this.draw();
	}
});