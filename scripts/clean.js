/*
    Aster Cleaning Script
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

log(0, `Now cleaning...`);

rm1()

function rm1() {
    log(0, `${fgGray}${b}> rm package-lock.json${r}`);
    
    let rmprocess = subProcess.spawn("rm", ["package-lock.json"]);
    rmprocess.on("exit", () => {
        rm2()
    });
}

function rm2() {
    log(0, `${fgGray}${b}> rm -R node_modules${r}`);
    
    let rmprocess = subProcess.spawn("rm", ["-R","node_modules"]);
    rmprocess.on("exit", () => {
        rm3()
    });
}

function rm3() {
    log(0, `${fgGray}${b}> rm -R .output${r}`);
    
    let rmprocess = subProcess.spawn("rm", ["-R",".output"]);
    rmprocess.on("exit", () => {
        rm4()
    });
}

function rm4() {
    log(0, `${fgGray}${b}> rm -R .nuxt${r}`);
    
    let rmprocess = subProcess.spawn("rm", ["-R",".nuxt"]);
    rmprocess.on("exit", () => {
        log(0, `${r}Complete.`);
    });
}