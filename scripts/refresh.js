/*
    Aster Refresh Script
*/

const subProcess = require("child_process");

const r = "\x1b[0m";
const b = "\x1b[1m";
const d = "\x1b[2m";

const fgBlack = "\x1b[30m";
const fgRed = "\x1b[31m";
const fgGreen = "\x1b[32m";
const fgYellow = "\x1b[33m";
const fgBlue = "\x1b[34m";
const fgMagenta = "\x1b[35m";
const fgCyan = "\x1b[36m";
const fgWhite = "\x1b[37m";
const fgGray = "\x1b[90m";

function log(type, msg) {
    if (type === 0) {
        console.log(
            `${fgYellow}[${fgMagenta}aster ${fgCyan}INFO${fgYellow}] ${r}` + msg
        );
    } else if (type === 1) {
        console.log(
            `${fgYellow}[${fgMagenta}aster ${fgYellow}WARN${fgYellow}] ${r}` + msg
        );
    } else if (type === 2) {
        console.log(
            `${fgYellow}[${fgMagenta}aster ${fgRed}ERROR${fgYellow}] ${r}` + msg
        );
    }
}

log(0, `Now refreshing...`);

refresh()

function refresh() {
    log(0, `${fgGray}${b}> bun run clean${r}`);
    
    let rmprocess = subProcess.spawn("bun", ["run","clean"]);
    rmprocess.on("exit", () => {
        refresh2()
    });
}

function refresh2() {
    log(0, `${fgGray}${b}> bun i${r}`);
    
    let rmprocess = subProcess.spawn("bun", ["i"]);
    rmprocess.on("exit", () => {
        refresh3()
    });
}

function refresh3() {
    log(0, `${fgGray}${b}> bun run build${r}`);
    
    let rmprocess = subProcess.spawn("bun", ["run","build"]);
    rmprocess.on("exit", () => {
        log(0, `Complete.`)
    });
}