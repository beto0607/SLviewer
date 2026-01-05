import type { DepartureEntryListItem, TabItem } from "../domain/internal.types";
import DeparturesTab from '../routes/departures-tab.svelte';

const TRANSPORT_OF_INTEREST: DepartureEntryListItem['transportType'] = 'T-Bana'

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
    return departures.filter(({ transportType, directionType }) => transportType === TRANSPORT_OF_INTEREST
        && (directionType === 'from' || directionType === 'unknown'))
}

export function getTrainsFromCity(departures: DepartureEntryListItem[]): DepartureEntryListItem[] {
    return departures.filter(({ transportType, directionType }) => transportType ===TRANSPORT_OF_INTEREST 
        && (directionType === 'to' || directionType === 'unknown'))
}

export function getNonTrains(departures: DepartureEntryListItem[]): DepartureEntryListItem[] {
    return departures.filter(({ transportType }) => transportType !== TRANSPORT_OF_INTEREST)
}
