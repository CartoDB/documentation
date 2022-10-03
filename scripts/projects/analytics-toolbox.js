#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const cloud = process.env.CLOUD || '';
const targetPath = process.env.TARGETPATH || '';

const index = [];
let changelogs = [];

// Execute script
updateModules('core');
updateModules('', ['databricks']);
updateOverview();
updateReleaseNotes();

function updateModules (type, ignore) {
    if (ignore && ignore.includes(cloud)) {
        return;
    }
    const repo = `analytics-toolbox${type ? `/${type}` : ''}`;
    const sourcePath = path.join('.', '.checkout', repo, 'clouds', cloud, 'modules', 'doc');
    const modules = fs.readdirSync(sourcePath);
    modules.forEach(module => {
        const docPath = path.join(sourcePath, module);
        if (fs.existsSync(docPath) && module != 'quadkey' && module != 'geocoding') {
            console.log(`- Update ${module} module`);
            const files = fs.readdirSync(docPath).filter(f => f.endsWith('.md')).sort((first, second) => {
                if (first.startsWith('_') || first < second) return -1;
                if (second.startsWith('_') || first > second) return 1;
                return 0;
            });
            let content = aliasesHeader(`sql-reference/${module}`)
            content += files.map(f => fs.readFileSync(path.join(docPath, f)).toString()).join('\n\n');
            if (cloud === 'bigquery') {
                content += '\n\n{{% euFlagFunding %}}'
            }
            fs.writeFileSync(path.join(targetPath, 'sql-reference', `${module}.md`), content);
            index.push({
                module,
                type: type || 'advanced',
                functions: files.map(f => path.parse(f).name).filter(f => !f.startsWith('_'))
            });
        }
    });

    const changelogPath = path.join(`./.checkout/${repo}/clouds/${cloud}/CHANGELOG.md`);
    const changelogContent = fs.readFileSync(changelogPath).toString();
    changelogs = changelogs.concat(parseChangelog(module, changelogContent));
}

function updateOverview () {
    let content = aliasesHeader(`sql-reference/overview`)
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
    fs.writeFileSync(path.join(targetPath, 'sql-reference', 'overview.md'), content);
}

function updateReleaseNotes () {
    let content = aliasesHeader(`release-notes`)
    content += `## Release notes\n\n`;

    const dates = [ ...new Set(changelogs.map(c => c.date).sort().reverse()) ];

    for (const date of dates) {
        content += `### ${formatDate(date)}\n\n`;
        const items = changelogs.filter(c => c.date === date);
        for (const item of items) {
            content += `${item.changes.replace(/^Added/gm, 'Feature')}\n\n`;
        }
    }

    if (cloud === 'bigquery') {
        content += '\n\n{{% euFlagFunding %}}'
    }

    console.log(`- Update release notes`);
    fs.writeFileSync(path.join(targetPath, 'release-notes.md'), content);
}

function parseChangelog (module, content) {
    const pattern = /\[(?<version>.*)\] - (?<date>[\d\.-]+)(?<changes>(.|\n)+?(?=\#\# \[|$))/g;
    const output = [];
    const matches = [ ...content.matchAll(pattern) ];
    for (const match of matches) {
        let { version, date, changes } = match.groups;
        changes = trimChar(changes, '\n').trim()
            .replace(/^####\s/gm, '')
            .replace(/^###\s/gm, '#### ');
        output.push({ module, version, date, changes });
    }
    return output;
}

function formatDate (date) {
    const d = new Date(date);
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    const month = months[d.getMonth()];
    const day = d.getDate();
    const year = d.getFullYear();
    return `${month} ${day}, ${year}`;
}

function trimChar (string, charToRemove) {
    while (string.charAt(0) === charToRemove) {
        string = string.substring(1);
    }
    while (string.charAt(string.length - 1) === charToRemove) {
        string = string.substring(0, string.length - 1);
    }
    return string;
}

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
