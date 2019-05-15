'use strict';
const path = require('path');

module.exports = function (codesmith) {
    codesmith.setGenerator('simple-stylelint', {
        description: 'create stylelint for 🚧💩',
        questions: [
            {
                type: 'checkbox',
                name: 'extends',
                message: 'What config standard do you like?',
                choices: [
                    {name: 'stylelint-config-standard', value: 'stylelint-config-standard', checked: true},
                ]
            }
        ],
        actions: [
            `this is a comment`,
            'this is another comment',
            {
                type: 'add',
                path: 'stylelint.config.js',
                templateFile: 'generators/simple-stylelint/stylelint.config.js',
                abortOnFail: true
            },
            {
                type: 'shell',
                command: 'yarn add stylelint stylelint-config-standard'
            }
        ]
    });
    codesmith.setGenerator('simple-commitlint', {
        description: 'create commitlint for commit 🚧💩',
        questions: [

        ],
        actions: [
            `you are running a commitlint generator`,
            {
                type: 'shell',
                command: 'yarn add -D @commitlint/{config-conventional,cli}'
            },
            {
                type: 'shell',
                command: `echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js`
            },
            {
                type: 'shell',
                command: `yarn add -D husky`
            },
            {
                type: 'js/modify-package',
                path: 'scripts.commitmsg',
                replacer: 'commitlint -e $GIT_PARAMS'
            },
        ]
    });
};
