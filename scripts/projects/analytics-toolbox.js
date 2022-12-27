#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const yaml = require('yaml');

const cloud = process.env.CLOUD || '';
const targetPath = process.env.TARGETPATH || '';

const index = [];
// let changelogs = [];

// Execute script
updateModules('core');
updateModules('');
updateOverview();
// updateReleaseNotes();

function extractMetadata (markdown) {
    let metadata = {};
    if (markdown.startsWith('---\n')) {
        const i = markdown.indexOf('\n---\n',3);
        if (i >= 0) {
            metadata = yaml.parse(markdown.slice(4, i));
        }
    }
    return metadata;
}

function removeMetadata (markdown) {
    if (markdown.startsWith('---\n')) {
        const i = markdown.indexOf('\n---\n',3);
        if (i >= 0) {
            markdown = markdown.slice(i + 5);
        }
    }
    return markdown;
}

function sortedFiles (files, metadata) {
    return files.sort((first, second) => {
        let first_i = -1;
        let second_i = -1;
        let n = 0;
        if (metadata.order) {
            n = metadata.order.length;
            first_i = metadata.order.indexOf(path.parse(first).name);
            second_i = metadata.order.indexOf(path.parse(second).name);
        }
        if (first_i < 0 && !first.startsWith('_')) {
            first_i = n;
        }
        if (second_i < 0 && !second.startsWith('_')) {
            second_i = n;
        }
        if (first_i === second_i) {
            return first < second ? -1 : first === second ? 0 : +1;
        }
        return first_i < second_i ? -1 : +1;
    });
}

function updateModules (type) {
    const referenceFolder = cloud === 'databricks' ? 'reference': 'sql-reference'
    const repo = `analytics-toolbox${type ? `/${type}` : ''}`;
    const sourcePath = path.join('.', '.checkout', repo, 'clouds', cloud, 'modules', 'doc');
    const modules = fs.readdirSync(sourcePath);
    modules.forEach(module => {
        const docPath = path.join(sourcePath, module);
        if (fs.existsSync(docPath) && module != 'quadkey' && module != 'geocoding') {
            console.log(`- Update ${module} module`);
            const metadata = extractMetadata(fs.readFileSync(path.join(docPath, '_INTRO.md')).toString());
            const files = sortedFiles(fs.readdirSync(docPath).filter(f => f.endsWith('.md')), metadata);
            let content = aliasesHeader(`${referenceFolder}/${module}`)
            content += files.map(f => removeMetadata(fs.readFileSync(path.join(docPath, f)).toString())).join('\n\n');
            if (cloud === 'bigquery') {
                content += '\n\n{{% euFlagFunding %}}'
            }
            fs.writeFileSync(path.join(targetPath, referenceFolder, `${module}.md`), content);
            index.push({
                module,
                type: type || 'advanced',
                functions: files.map(f => path.parse(f).name).filter(f => !f.startsWith('_'))
            });
        }
    });

    // const changelogPath = path.join(`./.checkout/${repo}/clouds/${cloud}/CHANGELOG.md`);
    // const changelogContent = fs.readFileSync(changelogPath).toString();
    // changelogs = changelogs.concat(parseChangelog(module, changelogContent));
}

function updateOverview () {
    const referenceFolder = cloud === 'databricks' ? 'reference': 'sql-reference'

    let content = aliasesHeader(`${referenceFolder}/overview`)
    content += `## Overview

The CARTO Analytics Toolbox's functions are organized in modules based on the functionality they offer. On this page you will find the full list with direct links to their definition.

{{% tableWrapper %}}
| Module | Type | Function or Procedure |
| :----- | :------ | :------ |
`;
    const indexSorted = index.sort((a, b) => {
        if (a.module < b.module) return -1;
        if (a.module > b.module) return 1;
        return 0;
    });
    indexSorted.forEach(({ module, type, functions }) => {
        content += `| ${module} | ${type} |<ul style="list-style:none">${functions.map(f => `<li><a href="../${module}/#${f.toLowerCase()}">${f.toUpperCase()}</a></li>`).join('')}</ul>|\n`;
    });

    content += '{{%/ tableWrapper %}}'

    if (cloud === 'bigquery') {
        content += '\n\n{{% euFlagFunding %}}'
    }

    console.log(`- Update overview`);
    fs.writeFileSync(path.join(targetPath, referenceFolder, 'overview.md'), content);
}

// function updateReleaseNotes () {
//     let content = aliasesHeader(`release-notes`)
//     content += `## Release notes\n\n`;

//     const dates = [ ...new Set(changelogs.map(c => c.date).sort().reverse()) ];

//     for (const date of dates) {
//         content += `### ${formatDate(date)}\n\n`;
//         const items = changelogs.filter(c => c.date === date);
//         for (const item of items) {
//             content += `${item.changes.replace(/^Added/gm, 'Feature')}\n\n`;
//         }
//     }

//     if (cloud === 'bigquery') {
//         content += '\n\n{{% euFlagFunding %}}'
//     }

//     console.log(`- Update release notes`);
//     fs.writeFileSync(path.join(targetPath, 'release-notes.md'), content);
// }

// function parseChangelog (module, content) {
//     const pattern = /\[(?<version>.*)\] - (?<date>[\d\.-]+)(?<changes>(.|\n)+?(?=\#\# \[|$))/g;
//     const output = [];
//     const matches = [ ...content.matchAll(pattern) ];
//     for (const match of matches) {
//         let { version, date, changes } = match.groups;
//         changes = trimChar(changes, '\n').trim()
//             .replace(/^####\s/gm, '')
//             .replace(/^###\s/gm, '#### ');
//         output.push({ module, version, date, changes });
//     }
//     return output;
// }

// function formatDate (date) {
//     const d = new Date(date);
//     const months = [
//         'January',
//         'February',
//         'March',
//         'April',
//         'May',
//         'June',
//         'July',
//         'August',
//         'September',
//         'October',
//         'November',
//         'December'
//     ];
//     const month = months[d.getMonth()];
//     const day = d.getDate();
//     const year = d.getFullYear();
//     return `${month} ${day}, ${year}`;
// }

// function trimChar (string, charToRemove) {
//     while (string.charAt(0) === charToRemove) {
//         string = string.substring(1);
//     }
//     while (string.charAt(string.length - 1) === charToRemove) {
//         string = string.substring(0, string.length - 1);
//     }
//     return string;
// }

function aliasesHeader (path) {
    let content = '';
    if (cloud === 'bigquery') {
        content = `---
aliases:
    - /analytics-toolbox-bq/${path}/
---
`;
    } else if (cloud === 'snowflake') {
        content = `---
aliases:
    - /analytics-toolbox-sf/${path}/
---
`;
    }
    return content;
}
