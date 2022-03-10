const { generateMarkdown } = require('../lib');
const path = require('path');

generateMarkdown(path.resolve(__dirname, './Button.vue'));
