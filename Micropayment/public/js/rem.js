var html = document.querySelector('html');
html.style.fontSize = html.offsetWidth / 640 * 100 + 'px';
try {
console.dir((html.offsetWidth / 640 * 100).toFixed(4));
} catch (e) {
		        console.error(e);
}
addEventListener('resize', function() {
html.style.fontSize = html.offsetWidth / 640 * 100 + 'px';
try {
console.clear();
console.dir((html.offsetWidth / 640 * 100).toFixed(4));
} catch (e) {
console.error(e);
}
}, false)