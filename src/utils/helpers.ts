import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { type DepartureEntry, CLSEnum } from "../domain/api.types";

dayjs.extend(relativeTime);

export function getIcon(departure: DepartureEntry): string {
    const product = departure.Product.at(0);
    if (!product) {
        return '❔';
    }
    switch (product.cls) {
        case CLSEnum.Airplanes:
            return '🛫';
        case CLSEnum.HighSpeedTrain:
            return '🚆 ❗';
        case CLSEnum.RegionalTrain:
            return '🚆 🐌';
        case CLSEnum.SpecialBus:
            return '🚌❗';
        case CLSEnum.LocalTrain:
            return '🚆';
        case CLSEnum.Metro:
            return '🚇';
        case CLSEnum.Tram:
            return '🚊';
        case CLSEnum.LocalBus:
            return '🚌';
        case CLSEnum.Ferry:
            return '⛴️';
        case CLSEnum.Taxi:
            return '🚕';
        default:
            return '❓';
    }
}
export function getMaterialIcon(departure: DepartureEntry): string {
    const product = departure.Product.at(0);
    switch (product?.cls) {
        case CLSEnum.Airplanes:
            return 'flight';
        case CLSEnum.HighSpeedTrain:
        case CLSEnum.RegionalTrain:
        case CLSEnum.LocalTrain:
            return 'train';
        case CLSEnum.LocalBus:
        case CLSEnum.SpecialBus:
            return 'directions_bus';
        case CLSEnum.Metro:
            return 'subway';
        case CLSEnum.Tram:
            return 'tram';
        case CLSEnum.Ferry:
            return 'directions_boat';
        case CLSEnum.Taxi:
            return 'local_taxi';
        default:
            return 'question_mark';
    }
}
export function getTransportType(departure: DepartureEntry): string {
    const product = departure.Product.at(0);
    switch (product?.cls) {
        case CLSEnum.Airplanes:
            return 'Plane';
        case CLSEnum.HighSpeedTrain:
        case CLSEnum.RegionalTrain:
        case CLSEnum.LocalTrain:
            return 'Train';
        case CLSEnum.LocalBus:
        case CLSEnum.SpecialBus:
            return 'Bus';
        case CLSEnum.Metro:
            return 'T-Bana';
        case CLSEnum.Tram:
            return 'Tram';
        case CLSEnum.Ferry:
            return 'Ferry';
        case CLSEnum.Taxi:
            return 'Taxi';
        default:
            return '';
    }
}

export function getTransportLine(departure: DepartureEntry): string {
    const product = departure.Product.at(0)
    if (!product) {
        return 'D:'
    }
    return product.line
}
