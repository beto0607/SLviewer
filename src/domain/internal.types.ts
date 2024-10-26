import type { DepartureEntry } from "./api.types"

export type DepartureEntryListItem = DepartureEntry & {
    relativeTime: string
    icon: string
}
