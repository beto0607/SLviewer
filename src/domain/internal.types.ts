import type { Component } from 'svelte';

export type DepartureEntryListItem = {
    gone: boolean;
    name: string;
    line: string;
    relativeTime: string;
    icon: string;
    materialIcon: string;
    transportType: 'Train' | 'Bus' | 'Taxi' | 'Plane' | 'T-Bana' | 'Tram' | 'Ferry' | ''
    direction: string
    directionType: 'unknown' | 'from' | 'to'
    time: string
    date: string
}

export type TabItem = {
    label: string;
    value: number;
    component: Component;
    departures: DepartureEntryListItem[];
    backgroundColor: 'teal' | 'blueviolet' | 'gray'
};
