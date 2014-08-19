var fs = require("fs");
var zlib = require("zlib");
var tar = require("tar");
var tmp = require("tmp");
var path = require("path");

var tarball = fs.readFileSync(path.join(__dirname, "foo.tar.gz"));

tmp.dir(function (err, path) {
  if (err) throw err;

  var gunzip = zlib.createGunzip()
        .on('error', function (e) {
          throw e;
        });
  var extractor = new tar.Extract({ path: path })
        .on('error', function (e) {
          throw e;
        });

  // write the buffer to the (gunzip|untar) pipeline; these calls
  // cause the tar to be extracted to disk.
  gunzip.pipe(extractor);
  gunzip.end(tarball);
});
