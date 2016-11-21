function renderCircle(c, p, r) {
	c.beginPath();
    c.arc(p.x, p.y, r, 0, 2 * Math.PI);
    c.closePath();
    c.stroke();
}

function clear(c, w, h) {
	c.clearRect(0, 0, w, h);
}

function agentBody(pos, r, a, pb) {
	this.position = pos;
	this.radius = r;
	this.angle = a;
	this.pbound = pb;
	this.render = function(c) {
		 c.lineWidth = 1;
      	 c.strokeStyle = '#000000';
      	 c.save();
      	 c.translate(this.position.x, this.position.y);
      	 c.rotate(this.angle);
		 renderCircle(c, ZERO(), this.radius);
		 renderCircle(c, ZERO().subt(v(this.radius / 2, 0)), this.radius / 4);
		 renderCircle(c, ZERO().add(v(this.radius / 2, 0)), this.radius / 4);
		 c.restore();
	}
}

function mother(target, tpos, cent, r, n) {
	this.children = new Array();
	this.target = target;
	this.targetPosition = tpos;
	this.center = cent;
	this.radius = r;
	for(var i = 0; i < n; i++) {
		var xrad = Disque.random(0, 2 * Math.PI);
		var xr = Disque.random(0, r);
		this.children.push(new agent(v(this.center.x + xr*Math.cos(xrad), this.center.y + xr*Math.sin(xrad))));
		console.log("wtf");
	}
	this.render = function(c) {
		for(var i = 0; i < this.children.length; i++)
			this.children[i].body.render(c);
	}

}

function agent(pos) {
	this.position = pos;
	this.body = new agentBody(this.position, 8, 0);
}