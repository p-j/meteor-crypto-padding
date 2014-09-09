Package.describe({
	summary: 'Crypto Padding Package for CryptoJS, standard secure algorithms',
	version: '3.1.2',
	git: 'https://github.com/p-j/meteor-crypto-padding.git'
});

Package.onUse(function(api) {
	api.versionsFrom('METEOR@0.9.1.1');
	api.use('jparker:crypto-core@3.1.2', ['client', 'server']);
	api.imply('jparker:crypto-core', ['client', 'server']);

	api.addFiles([
		'lib/pad-ansix923.js',
		'lib/pad-iso10126.js',
		'lib/pad-iso97971.js',
		'lib/pad-nopadding.js',
		'lib/pad-zeropadding.js'
	], ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('jparker:crypto-core');
  api.use('jparker:crypto-padding');
  api.addFiles('tests/tests.js');
});
