export type DepartureBoard = {
    Departure: DepartureEntry[]
    TechnicalMessages: TechnicalMessage[]
}

export type DepartureEntry = {
    "name": string
    "type": string
    "stop": string
    "stopid": string
    "stopExtId": string
    "lon": number
    "lat": number
    "time": string
    "date": string
    "reachable": boolean
    "direction": string
    "directionFlag": string
    Product: ProductType[]
}
export type TechnicalMessage = {}

export type ProductType = {
    catOutS: CatOutSEnum
    num: string
    displayNumber: string
    line: string
    cls: CLSEnum
}

// BLT: Regional bus
// BXB: Express bus
// BAX: Airport Express bus
// BRE: Regional bus
// BBL: Train replacement bus
// ULT: Metro
// JAX: Airport Express train
// JEX: Express train
// JIC: InterCity train
// JLT: Local train
// JPT: PågaTåg
// JST: High - speed train
// JRE: Regional train
// SLT: Tram
// FLT: Lokal ferry
// FUT: International ferry
export enum CatOutSEnum {
    Pendeltag = "JTL",

    RegionalBus = "BLT",
    RegionalBus2 = "BRE",
    RegionalTrain = "JRE",

    ExpressBus = "BXB",
    ExpressTrain = "JEX",

    AirportExportBus = "BAX",
    AirportExportTrain = "JAX",

    TrainReplacementBus = "BBL",

    Metro = "ULT",
    InterCityTrain = "JIC",
    LocalTrain = "JLT",
    PagaTag = "JPT",
    HighSpeedTrain = "JST",
    Tram = "SLT",

    LocalFerry = "FLT",
    InternationalFerry = "FUT",
}

export enum CLSEnum {
    Airplanes = "1",
    HighSpeedTrain = "2",
    RegionalTrain = "4",
    SpecialBus = "8",
    LocalTrain = "16",
    Metro = "32",
    Tram = "64",
    LocalBus = "128",
    Ferry = "256",
    Taxi = "512"
}

