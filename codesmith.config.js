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
    codesmith.setGenerator('eslint(simple-ts)', {
        description: 'create eslint for typescript with simple config',
        questions: [
            {
                type: 'checkbox',
                name: 'template',
                message: 'What template do you like?',
                choices: [
                    {name: 'plain', value: 'plain', checked: true},
                    {name: 'React', value: 'React'},
                ]
            }
        ],
        actions: [
            `you are running a eslint(ts) generator`,
            {
                type: 'shell',
                command: 'npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev'
            },
            {
                type: 'shell',
                when: (data, config) => {
                    if(data.template.indexOf('React') !== -1) {
                        return true
                    }
                    return false
                },
                command: 'npm install eslint-plugin-react --save-dev'
            },
            {
                when: (data, config) => {
                    if(data.template.indexOf('plain') !== -1) {
                        return true
                    }
                    return false
                },
                type: 'add',
                path: '.eslintrc.js',
                templateFile: 'generators/eslint-for-typescript/.eslint-plain.js',
                abortOnFail: true
            },
            {
                when: (data, config) => {
                    if(data.template.indexOf('React') !== -1) {
                        return true
                    }
                    return false
                },
                type: 'add',
                path: '.eslintrc.js',
                templateFile: 'generators/eslint-for-typescript/.eslint-react.js',
                abortOnFail: true
            },
        ]
    });
};
