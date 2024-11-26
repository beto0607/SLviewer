import dayjs from "dayjs"

const NIGHT_START = 21
const NIGHT_END = 7

export function isNightTime(): boolean {
    const now = dayjs(new Date())
    return now.hour() >= NIGHT_START || now.hour() < NIGHT_END
}
