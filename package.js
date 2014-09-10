Package.describe({
	summary: 'Crypto Padding Package for CryptoJS, standard secure algorithms',
	version: '0.1.0',
	git: 'https://github.com/p-j/meteor-crypto-padding.git'
});

Package.onUse(function (api) {
	api.versionsFrom('METEOR@0.9.1.1');

	api.use([
    'jparker:crypto-core@0.1.0',
    'jparker:crypto-cipher-core@0.1.0'
  ], ['client', 'server']);

	api.imply([
    'jparker:crypto-core',
    'jparker:crypto-cipher-core'
  ], ['client', 'server']);

	api.addFiles([
		'lib/pad-ansix923.js',
		'lib/pad-iso10126.js',
		'lib/pad-iso97971.js',
		'lib/pad-nopadding.js',
		'lib/pad-zeropadding.js'
	], ['client', 'server']);
});

Package.onTest(function (api) {
	api.use([
  	'jparker:crypto-core@0.1.0',
  	'jparker:crypto-cipher-core@0.1.0',
  	'jparker:crypto-padding@0.1.0',
    'tinytest'
  ], ['client', 'server']);

	api.addFiles('tests/tests.js', ['client', 'server']);
});