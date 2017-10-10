(function(w){
	/* From Modernizr */
	function whichTransitionEvent(){
		var t;
		var el = document.createElement('fakeelement');
		var transitions = {
		  'transition':'transitionend',
		  'OTransition':'oTransitionEnd',
		  'MozTransition':'transitionend',
		  'WebkitTransition':'webkitTransitionEnd'
		}

		for(t in transitions){
			if( el.style[t] !== undefined ){
				return transitions[t];
			}
		}
	}

	function whichAnimationEvent(){
		var t;
		var el = document.createElement('fakeelement');
		var transitions = {
		  'animation':'animationend',
		  'OAnimation':'oAnimationEnd',
		  'MozAnimation':'animationend',
		  'WebkitAnimation':'webkitAnimationEnd'
		}

		for(t in transitions){
			if( el.style[t] !== undefined ){
				return transitions[t];
			}
		}
	}

	var transitionEvent = whichAnimationEvent();


	function handleClick(e){
		if(!e.classList.contains('expand')){
			e.classList.add('expand');
			e.classList.remove('collapse');
		}
		else{
			e.classList.remove('expand');
			e.classList.add('collapse');
		}
	}

	var pushPanel = document.createElement('div');
	pushPanel.classList.add('push-panel');
	pushPanel.id = 'push-panel';
	document.body.appendChild(pushPanel);

	function pushNotification(params){
		let options = {
			title : 'like your photo',
			description : "how are you today? I'm fine thank and you. Thank you so much. haha",
			user_image : 'http://social.dmobisoft.com/u/i/xcFl3842ZDr7guCswEQf1b9Z1hxibjCzz7AmKOhk.jpeg',
			item_image : 'http://social.dmobisoft.com/u/i/eAJX7E8lJhkSKG3twqKfvWkPpxxMSLOrOfcEI1Wm.jpeg',
			position : 'top right'
		};
		if(params){
			Object.assign(options, params);
		}
		let item = document.createElement('div');
		item.classList.add('push-item');
		
		var color = randomColor({luminosity : 'dark'});
		item.style.backgroundColor = color;
		let template = `
			<div class="push-item-content">
				<div>
					<div>
						<h4>${options.title}</h4>
						<p>${options.description}</p>
					</div>
				</div>
			</div>
			<div class="push-item-user-image" style="background-image: url(${options.user_image})">
			</div>
			<div class="push-item-image" style="background-image: url(${options.item_image})">
			</div>
		`;
		
		item.innerHTML = template;
		
		if(!pushPanel.childElementCount){
			pushPanel.appendChild(item);
		}
		else{
			pushPanel.insertBefore(item, pushPanel.childNodes[0]);
		}
		
		item.addEventListener('click', () => {
			handleClick(item);
		});
		
		setTimeout(() => {
			handleClick(item);
			setTimeout(() => {
				item.addEventListener('animationend', () => {
					pushPanel.removeChild(item);
				});
				handleClick(item);
			}, 5000)
		})
	}
	
	w.pushNotification = pushNotification;
})(window);