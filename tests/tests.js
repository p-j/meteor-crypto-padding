var C = CryptoJS;


/* AnsiX923 */

Tinytest.add('MeteorCryptoPadding - AnsiX923 Pad', function (t) {
    var data = C.lib.WordArray.create([0xdddddd00], 3);
    C.pad.AnsiX923.pad(data, 2);

    t.equal(data.toString(), C.lib.WordArray.create([0xdddddd00, 0x00000005]).toString());
});

Tinytest.add('MeteorCryptoPadding - AnsiX923 PadClamp', function (t) {
    var data = C.lib.WordArray.create([0xdddddddd, 0xdddddddd], 3);
    C.pad.AnsiX923.pad(data, 2);

    t.equal(data.toString(), C.lib.WordArray.create([0xdddddd00, 0x00000005]).toString());
});

Tinytest.add('MeteorCryptoPadding - AnsiX923 Unpad', function (t) {
    var data = C.lib.WordArray.create([0xdddddd00, 0x00000005]);
    C.pad.AnsiX923.unpad(data);

    t.equal(data.toString(), C.lib.WordArray.create([0xdddddd00], 3).toString());
});


/* Iso10126 */

(function () {
    var save = {};

    // Save original random method
    save.random = C.lib.WordArray.random;

    // Replace random method with one that returns a predictable value
    var notSoRandomFn = function (nBytes) {
        var words = [];
        for (var i = 0; i < nBytes; i += 4) {
            words.push([0x11223344]);
        }

        return C.lib.WordArray.create(words, nBytes);
    };

    Tinytest.add('MeteorCryptoPadding - Iso10126 Pad', function (t) {
        C.lib.WordArray.random = notSoRandomFn;
        var data = C.lib.WordArray.create([0xdddddd00], 3);
        C.pad.Iso10126.pad(data, 2);

        t.equal(data.toString(), C.lib.WordArray.create([0xdddddd11, 0x22334405]).toString());
        C.lib.WordArray.random = save.random;
    });

    Tinytest.add('MeteorCryptoPadding - Iso10126 PadClamp', function (t) {
        C.lib.WordArray.random = notSoRandomFn;
        var data = C.lib.WordArray.create([0xdddddddd, 0xdddddddd], 3);
        C.pad.Iso10126.pad(data, 2);

        t.equal(data.toString(), C.lib.WordArray.create([0xdddddd11, 0x22334405]).toString());
        C.lib.WordArray.random = save.random;
    });

    Tinytest.add('MeteorCryptoPadding - Iso10126 Unpad', function (t) {
        C.lib.WordArray.random = notSoRandomFn;
        var data = C.lib.WordArray.create([0xdddddd11, 0x22334405]);
        C.pad.Iso10126.unpad(data);

        t.equal(data.toString(), C.lib.WordArray.create([0xdddddd00], 3).toString());
        C.lib.WordArray.random = save.random;
    });

}());


/* Iso97971 */

Tinytest.add('MeteorCryptoPadding - Iso97971 Pad1', function (t) {
    var data = C.lib.WordArray.create([0xdddddd00], 3);
    C.pad.Iso97971.pad(data, 1);

    t.equal(data.toString(), C.lib.WordArray.create([0xdddddd80]).toString());
});

Tinytest.add('MeteorCryptoPadding - Iso97971 Pad2', function (t) {
    var data = C.lib.WordArray.create([0xdddddd00], 3);
    C.pad.Iso97971.pad(data, 2);

    t.equal(data.toString(), C.lib.WordArray.create([0xdddddd80, 0x00000000]).toString());
});

Tinytest.add('MeteorCryptoPadding - Iso97971 PadClamp', function (t) {
    var data = C.lib.WordArray.create([0xdddddddd, 0xdddddddd], 3);
    C.pad.Iso97971.pad(data, 2);

    t.equal(data.toString(), C.lib.WordArray.create([0xdddddd80, 0x00000000]).toString());
});

Tinytest.add('MeteorCryptoPadding - Iso97971 Unpad', function (t) {
    var data = C.lib.WordArray.create([0xdddddd80, 0x00000000]);
    C.pad.Iso97971.unpad(data);

    t.equal(data.toString(), C.lib.WordArray.create([0xdddddd00], 3).toString());
});


/* Pkcs7 */

Tinytest.add('MeteorCryptoPadding - Pkcs7 Pad', function (t) {
    var data = C.lib.WordArray.create([0xdddddd00], 3);
    C.pad.Pkcs7.pad(data, 2);

    t.equal(data.toString(), C.lib.WordArray.create([0xdddddd05, 0x05050505]).toString());
});

Tinytest.add('MeteorCryptoPadding - Pkcs7 PadClamp', function (t) {
    var data = C.lib.WordArray.create([0xdddddddd, 0xdddddddd], 3);
    C.pad.Pkcs7.pad(data, 2);

    t.equal(data.toString(), C.lib.WordArray.create([0xdddddd05, 0x05050505]).toString());
});

Tinytest.add('MeteorCryptoPadding - Pkcs7 Unpad', function (t) {
    var data = C.lib.WordArray.create([0xdddddd05, 0x05050505]);
    C.pad.Pkcs7.unpad(data);

    t.equal(data.toString(), C.lib.WordArray.create([0xdddddd00], 3).toString());
});


/* ZeroPadding */

Tinytest.add('MeteorCryptoPadding - ZeroPadding Pad', function (t) {
    var data = C.lib.WordArray.create([0xdddddd00], 3);
    C.pad.ZeroPadding.pad(data, 2);

    t.equal(data.toString(), C.lib.WordArray.create([0xdddddd00, 0x00000000]).toString());
});

Tinytest.add('MeteorCryptoPadding - ZeroPadding PadClamp', function (t) {
    var data = C.lib.WordArray.create([0xdddddddd, 0xdddddddd], 3);
    C.pad.ZeroPadding.pad(data, 2);

    t.equal(data.toString(), C.lib.WordArray.create([0xdddddd00, 0x00000000]).toString());
});

Tinytest.add('MeteorCryptoPadding - ZeroPadding Unpad', function (t) {
    var data = C.lib.WordArray.create([0xdddddd00, 0x00000000]);
    C.pad.ZeroPadding.unpad(data);

    t.equal(data.toString(), C.lib.WordArray.create([0xdddddd00], 3).toString());
});
