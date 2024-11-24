import type { DepartureEntryListItem, TabItem } from "../domain/internal.types";
import DeparturesTab from '../routes/departures-tab.svelte';

export function getTabComponents(trainsDepartures: DepartureEntryListItem[] = [],
    others: DepartureEntryListItem[] = []): TabItem[] {
    return [
        { label: 'Trains', value: 1, component: DeparturesTab, departures: trainsDepartures },
        { label: 'Others', value: 2, component: DeparturesTab, departures: others }
    ]
}
