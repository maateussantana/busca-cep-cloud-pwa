const CACHE_NAME = 'deli-doces-v2'
const urlsToCache = [
		'/',
		'index.html',
		//JS
		'js/logic/busca-cep.js',
		'js/logic/busca-uf.js',
		'js/logic/valid-cep.js',
		'js/logic/log-load.js',
		'js/init.js',
		'js/script.js',
		// CSS
		'css/style.css',
		'manifest.json',
	  'images/deli-doce.png',
		'sw.js'
	]

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(CACHE_NAME).then(function(cache){
			return cache.addAll(urlsToCache)
		})
	)
})

self.addEventListener('fetch', function(event){
	event.respondWith(
		caches.match(event.request).then(function(response){
			return response || fetch(event.request)
		})
	)
})