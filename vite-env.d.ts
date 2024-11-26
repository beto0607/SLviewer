interface ImportMetaEnv {
    readonly VITE_RESROBOT_KEY: string;
    readonly VITE_OPENWEATHER_KEY: string;
    readonly VITE_TEST: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
