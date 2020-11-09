# @indiekit/store-ftp

Store IndieWeb content via FTP.

## Installation

`npm i @indiekit/store-ftp`

## Configuration

```js
const FtpStore = require('@indiekit/store-ftp');

const ftp = new FtpStore({
  // config options here
});
```

## Options

### `host`

The server files will be saved to.

Type: `string`\
*Required*

### `user`

FTP username.

Type: `string`\
*Required*

### `password`

FTP password.

Type: `string`\
*Required*
