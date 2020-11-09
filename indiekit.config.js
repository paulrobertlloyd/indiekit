import 'dotenv/config.js'; // eslint-disable-line import/no-unassigned-import
import {Indiekit} from './packages/indiekit/index.js';
import {JekyllPreset} from './packages/preset-jekyll/index.js';
import {FtpStore} from './packages/store-ftp/index.js';
import {TwitterSyndicator} from './packages/syndicator-twitter/index.js';

// New indiekit instance
const indiekit = new Indiekit();

// Configure publication preset
const jekyll = new JekyllPreset();

// Configure content store
const ftp = new FtpStore({
  host: process.env.FTP_HOST,
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  directory: process.env.FTP_DIRECTORY
});

const twitter = new TwitterSyndicator({
  checked: true,
  forced: true,
  user: process.env.TWITTER_USER,
  apiKey: process.env.TWITTER_API_KEY,
  apiKeySecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// Application settings
indiekit.set('application.mongodbUrl', process.env.MONGODB_URL);

// Publication settings
indiekit.set('publication.me', process.env.PUBLICATION_URL);
indiekit.set('publication.preset', jekyll);
indiekit.set('publication.store', ftp);
indiekit.set('publication.syndicationTargets', [twitter]);
indiekit.set('publication.timeZone', process.env.TZ ? process.env.TZ : 'UTC');

// Server
const server = indiekit.server();

export default server;
