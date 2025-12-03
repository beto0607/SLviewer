import type { DepartureBoard } from "../domain/api.types";
import type { DepartureEntryListItem } from "../domain/internal.types";
import {env} from '$env/dynamic/public';
import { mapDeparturesToListItems } from "./departures.utils";

export async function loadDepartures(): Promise<DepartureEntryListItem[]> {
    const url = getURL()

    const departuresResponse: DepartureBoard = await fetch(url)
        .then((response) => response.json())
    const departures = mapDeparturesToListItems(departuresResponse.Departure);
    return departures
}

function getURL(): string {
    if (env.PUBLIC_IN_TEST === 'true' || import.meta.env.VITE_TEST === 'true') {
        return `/response-example.json`;
    }
    const spangaId = '740000764';
    const resRobotKey = env.PUBLIC_RESROBOT_KEY || import.meta.env.VITE_RESROBOT_KEY;
    return `https://api.resrobot.se/v2.1/departureBoard?id=${spangaId}&lang=en&format=json&accessId=${resRobotKey}`;
}
