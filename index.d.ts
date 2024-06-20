interface OsfLogger {
    setInterceptor(interceptor: (arg: any) => string): void;
    setConfig(config: any):void;
}

declare const Logger: OsfLogger;
export default Logger;
