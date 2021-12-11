#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const cloud = process.env.CLOUD || '';
const branch = process.env.BRANCH || '';
const targetPath = process.env.TARGETPATH || '';

const index = [];
let changelogs = [];

updateModules('core');
updateModules('advanced');
updateOverview();
updateReleaseNotes();

function updateModules (type) {
    const sourcePath = path.join(`./.checkout/at-${type}-${cloud}-${branch}/modules`);
    const modules = fs.readdirSync(sourcePath);
    modules.forEach(module => {
        const docPath = path.join(sourcePath, module, cloud, 'doc');
        if (fs.existsSync(docPath)) {
            console.log(`- Update ${module} module`);
            const files = fs.readdirSync(docPath).filter(f => f.endsWith('.md')).sort((first, second) => {
                if (first.startsWith('_') || first < second) return -1;
                if (second.startsWith('_') || first > second) return 1;
                return 0;
            });
            const content = files.map(f => fs.readFileSync(path.join(docPath, f)).toString()).join('\n\n');
            fs.writeFileSync(path.join(targetPath, 'sql-reference', `${module}.md`), content);
            index.push({
                module,
                type,
                functions: files.map(f => path.parse(f).name).filter(f => !f.startsWith('_'))
            });
            const changelogPath = path.join(sourcePath, module, cloud, 'CHANGELOG.md');
            const changelogContent = fs.readFileSync(changelogPath).toString();
            changelogs = changelogs.concat(parseChangelog(module, changelogContent));
        }
    });
}

function updateOverview () {
    let content = `## Overview

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
    
    console.log(`- Update overview`);
    fs.writeFileSync(path.join(targetPath, 'sql-reference', 'overview.md'), content);
}

function updateReleaseNotes () {
    let content = `## Release notes\n\n`;

    const dates = [ ...new Set(changelogs.map(c => c.date).sort().reverse()) ];

    for (const date of dates) {
        content += `### ${formatDate(date)}\n\n`;
        const items = changelogs.filter(c => c.date === date);
        for (const item of items) {
            content += `#### Module ${item.module} v${item.version}\n\n`;
            content += `${item.changes.replace(/Added/g, 'Feature').replace(/### /g, '')}\n\n`;
        }
    }

    console.log(`- Update release notes`);
    fs.writeFileSync(path.join(targetPath, 'release-notes.md'), content);
}

function parseChangelog (module, content) {
    const pattern = /\[(?<version>.*)\] - (?<date>[\d\.-]+)(?<changes>[^\[]+)/g;
    const output = [];
    const matches = [ ...content.matchAll(pattern) ];
    for (const match of matches) {
        const { version, date, changes } = match.groups;
        output.push({ module, version, date, changes: trimChar(trimChar(changes.trim(), '#').trim(), '\n').trim() });
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