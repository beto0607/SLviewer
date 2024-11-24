import type { DepartureEntryListItem, TabItem } from "../domain/internal.types";
import DeparturesTab from '../routes/departures-tab.svelte';

export function getTabComponents(departures: DepartureEntryListItem[] = []): TabItem[] {
    const trainsToCity = getTrainsToCity(departures)
    const trainsFromCity = getTrainsFromCity(departures)
    const others = getNonTrains(departures)

    return [
        { label: 'Trains to the city', value: 0, component: DeparturesTab, departures: trainsToCity, backgroundColor: 'teal' },
        { label: 'Trains from the city', value: 1, component: DeparturesTab, departures: trainsFromCity, backgroundColor: 'blueviolet' },
        { label: 'Others', value: 2, component: DeparturesTab, departures: others, backgroundColor: 'gray' }
    ]
}

export function getTrainsToCity(departures: DepartureEntryListItem[]): DepartureEntryListItem[] {
    return departures.filter(({ transportType, directionType }) => transportType === 'Train'
        && (directionType === 'to' || directionType === 'unknown'))
}

export function getTrainsFromCity(departures: DepartureEntryListItem[]): DepartureEntryListItem[] {
    return departures.filter(({ transportType, directionType }) => transportType === 'Train'
        && (directionType === 'from' || directionType === 'unknown'))
}

export function getNonTrains(departures: DepartureEntryListItem[]): DepartureEntryListItem[] {
    return departures.filter(({ transportType }) => transportType !== 'Train')
}
