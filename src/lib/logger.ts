import * as tracer from "tracer";
import * as fs from "fs";

export type Logger = tracer.Tracer.Logger;

let loggerInstance: Logger;

export const createLogger = () => {
    return tracer.colorConsole({
        format: [
            "{{timestamp}} <{{title}}> {{message}}",
            {
                error: "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}",
            },
        ],
        dateformat: "HH:MM:ss.L",
    });
};

export const createFileLogger = (logfilepath: string) => {
    return tracer.colorConsole({
        format: [
            "{{timestamp}} <{{title}}> {{message}}",
            {
                error: "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}",
            },
        ],
        dateformat: "HH:MM:ss.L",
        transport: function (data) {
            process.stderr.write(data.output + '\n');
            fs.appendFile(logfilepath, data.rawoutput + '\n', (err) => {
                if (err) throw err;
            });
        }
    });
};

export function setLogger(logger: Logger) {
    loggerInstance = logger;
}

export function getLogger() {
    return loggerInstance;
}
