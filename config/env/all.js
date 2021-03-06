'use strict';

module.exports = {
	app: {
		title: 'IM',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 3000,
	sslport: process.env.SSLPORT || 444,
	key_file: './config/cert/localhost-key.pem',
	cert_file: './config/cert/localhost-cert.pem',
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/forms-angular/css/forms-angular-bs3.css',
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/bootstrap-glyphicons/css/bootstrap.icon-large.css',
				'public/lib/leaflet-dist/leaflet.css',
				'public/lib/cartodb.js/dist/cartodb.css',
				'public/lib/jquery-ui/themes/smoothness/jquery-ui.css',
				'public/lib/angular-centered/angular-centered.css',
				'public/lib/ng-grid/ng-grid.css',
				'public/lib/select2/select2.css',	
				'public/lib/leaflet-search/dist/leaflet-search.src.css',
				'public/lib/angular-busy/dist/angular-busy.css',
				'public/lib/leaflet-gps/dist/leaflet-gps.src.css',
				'public/lib/font-awesome/css/font-awesome.css',
				'public/lib/Humanitarian-Font/css/font-humanitarian.css',
				'public/lib/reliefweb-disaster-icons/reliefweb-disaster-icons-webfont.css',
				'public/lib/angular/angular-csp.css',
				'public/lib/ui-iconpicker/dist/styles/ui-iconpicker.css',
				'public/lib/angular-carousel/dist/angular-carousel.css'
			],
			js: [

				'public/lib/jquery/jquery.js',
				'public/lib/jquery-ui/ui/jquery-ui.js',
				'public/lib/lodash/dist/lodash.min.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-lodash/angular-lodash.js',
				'public/lib/angular-route/angular-route.min.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js',  
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/angular-leaflet/dist/angular-leaflet-directive.js',
				'public/lib/leaflet/dist/leaflet-src.js',
				'public/lib/cartodb.js/dist/cartodb.noleaflet.js',
				'public/lib/cartodb.js/activelayers.js',
				'public/lib/angular-centered/angular-centered.js',
				'public/lib/angular-deckgrid/angular-deckgrid.js',
				'public/lib/smart-table/Smart-Table.min.js',
				'public/lib/angular-ui-sortable/sortable.min.js',
				'public/lib/angular-ui-date/src/date.js',
				'public/lib/ngInfiniteScroll/build/ng-infinite-scroll.js',
				'public/lib/jspdf/dist/jspdf.debug.js',
				'public/lib/ng-grid/build/ng-grid.debug.js',
				'public/lib/angular-elastic/elastic.js',
				'public/lib/angular-ui-select2/src/select2.js',
				'public/lib/ckeditor/ckeditor.js',
				'public/lib/ng-ckeditor/ng-ckeditor.js',
				'public/lib/forms-angular/forms-angular.js',
				'https://maps.googleapis.com/maps/api/js?v=3&sensor=true',
				'public/lib/leaflet-search/dist/leaflet-search.src.js',
				'public/lib/Leaflet.NonTiledLayer/NonTiledLayer.js',
				'public/lib/Leaflet.NonTiledLayer/NonTiledLayer.WMS.js',
				'public/lib/leaflet-betterwms/L.TileLayer.BetterWMS.js',
				'public/lib/Leaflet.WMS.GetLegendGraphic/leaflet-wms-getlegendgraphic.js',
				'public/lib/azgs-leaflet/js/lib/less-1.2.2.min.js',
				'public/lib/azgs-leaflet/js/lib/jade.js',
				'public/lib/leaflet.ajax/dist/leaflet.ajax.js',
				'public/lib/azgs-leaflet/js/azgs-leaflet/GeoJSON.WFS.js',
				'public/lib/azgs-leaflet/js/azgs-leaflet/GeoJSON.WFS.ClickResponder.js',
				'public/lib/angular-busy/dist/angular-busy.js',
				'public/lib/leaflet-gps/dist/leaflet-gps.src.js',
				'public/lib/angular-gettext/dist/angular-gettext.js',
				'public/dist/translations.js',
				'public/lib/ui-iconpicker/dist/scripts/ui-iconpicker.js',
				'public/lib/angular-carousel/dist/angular-carousel.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};