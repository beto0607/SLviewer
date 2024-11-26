import dayjs from "dayjs";
import type { DepartureEntry } from "../domain/api.types";
import type { DepartureEntryListItem } from "../domain/internal.types";
import { getTransportType, getTransportLine, getIcon, getMaterialIcon } from "./helpers";

export function mapDeparturesToListItems(departures: DepartureEntry[]): DepartureEntryListItem[] {
    const list = departures.map((departure) => {
        let directionType: DepartureEntryListItem['directionType'] = 'unknown'
        if (departure.directionFlag === '1') {
            directionType = 'to'
        } else if (departure.directionFlag === '2') {
            directionType = 'from'
        }
        return {
            gone: false,
            direction: departure.direction,
            directionType: directionType,
            time: departure.time,
            date: departure.date,
            name: departure.name,
            line: `${getTransportLine(departure)}`,
            relativeTime: '',
            icon: getIcon(departure),
            materialIcon: getMaterialIcon(departure),
            transportType: getTransportType(departure),
        };
    });
    return updateDepartureTimes(list)
}

export function updateDepartureTimes(departures: DepartureEntryListItem[]): DepartureEntryListItem[] {
    const deltaRemoval = dayjs(new Date()).subtract(10, 'minute')
    const entryItems = departures
        .filter((departure) => {
            const departureTime = dayjs(departure.date + 'T' + departure.time);
            return (departureTime.isAfter(deltaRemoval))
        })
        .map((departure) => {
            const departureTime = dayjs(departure.date + 'T' + departure.time);
            const relativeDepartureTime = departureTime.fromNow();
            return {
                ...departure,
                gone: departureTime.isBefore(),
                relativeTime: relativeDepartureTime,
            };
        })
    return entryItems
}
