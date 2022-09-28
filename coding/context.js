const object = {
	a: 10,
};

function normal(b) {
	return `Normal: Tổng của a và b là: ${this.a + b}`;
}

const anonymous = function (b) {
	return `Anonymous: Tổng của a và b là: ${this.a + b}`;
};

const arrow = (b) => `Arrow: Tổng của a và b là: ${this.a + b}`;

console.log(normal.call(object, 20));
console.log(anonymous.call(object, 20));
console.log(arrow.call(object, 20));
