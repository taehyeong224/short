import {createLogger, format, transports} from "winston";

const {combine, timestamp, printf} = format;

const myFormat = printf(({level, message, timestamp}) => {
    return `[${timestamp}] [${level}]: ${message}`;
});

export const Log = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console({
            silent: process.env.NODE_ENV === "test"
        })
    ]
});
