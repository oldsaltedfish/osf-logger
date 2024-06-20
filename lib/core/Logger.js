class Logger {

    constructor(config) {
        this.config = {
            logTime: true,
            logStack: true,
            consoleLog: true,
            now: function () {
                return new Date().toISOString()
            }
        }
        Object.assign(this.config, config)
        this.originalConsole = console
        console = this
    }

    setConfig(config) {
        Object.assign(this.config, config)
    }

    setInterceptor(func) {
        this.interceptor = func
    }

    assert(...args) {
        args = this._interceptor(...args)
        if (this.config.consoleLog) {
            this.originalConsole.assert(...args)
        }
    }

    clear() {
        if (this.config.consoleLog) {
            this.originalConsole.clear()
        }
    }

    count(label) {
        if (this.config.consoleLog) {
            this.originalConsole.count(label)
        }
    }

    countReset(label) {
        if (this.config.consoleLog) {
            this.originalConsole.countReset(label)
        }
    }

    debug(...args) {
        args = this._interceptor(...args)
        if (this.config.consoleLog) {
            this.originalConsole.debug(...args)
        }
    }

    dir(item, options) {
        if (this.config.consoleLog) {
            this.originalConsole.dir(item, options)
        }
    }

    dirxml(...args) {
        args = this._interceptor(...args)
        if (this.config.consoleLog) {
            this.originalConsole.dirxml(...args)
        }
    }

    error(...args) {
        args = this._interceptor(...args)
        if (this.config.consoleLog) {
            this.originalConsole.error(...args)
        }

    }

    group(...args) {
        args = this._interceptor(...args)
        if (this.config.consoleLog) {
            this.originalConsole.group(...args)
        }
    }

    groupCollapsed(...args) {
        args = this._interceptor(...args)
        if (this.config.consoleLog) {
            this.originalConsole.groupCollapsed(...args)
        }
    }

    groupEnd() {
        if (this.config.consoleLog) {
            this.originalConsole.groupEnd()
        }
    }

    info(...args) {
        args = this._interceptor(...args)
        if (this.config.consoleLog) {
            this.originalConsole.info(...args)
        }
    }

    log(...args) {
        args = this._interceptor(...args)
        if (this.config.consoleLog) {
            this.originalConsole.log(...args)
        }
    }

    table(tabularData, properties) {
        if (this.config.consoleLog) {
            this.originalConsole.table(tabularData, properties)
        }
    }

    time(label) {
        if (this.config.consoleLog) {
            this.originalConsole.time(label)
        }
    }

    timeEnd(label) {
        if (this.config.consoleLog) {
            this.originalConsole.timeEnd(label)
        }
    }

    timeLog(label, ...args) {
        if (this.config.consoleLog) {
            this.originalConsole.timeLog(label, ...args)
        }
    }

    timeStamp(label) {
        if (this.config.consoleLog) {
            this.originalConsole.timeStamp(label)
        }
    }

    trace(...args) {
        args = this._interceptor(...args)
        if (this.config.consoleLog) {
            this.originalConsole.trace(...args)
        }
    }

    warn(...args) {
        args = this._interceptor(...args)
        if (this.config.consoleLog) {
            this.originalConsole.warn(...args)
        }
    }

    _interceptor(...args) {
        const timestamp = this.config.now()
        const err = new Error()
        const stacks = err.stack.split('\n')
        const level = this._level(stacks)
        const stack = stacks.slice(3).join('\n')

        if (this.hasOwnProperty('interceptor') && typeof this.interceptor === 'function') {
            // 声明cache变量，便于匹配是否有循环引用的情况
            var cache = [];
            var argsStr = JSON.stringify(args, function(key, value) {
                if (typeof value === 'object' && value !== null) {
                    if (cache.indexOf(value) !== -1) {
                        // 移除
                        return;
                    }
                    // 收集所有的值
                    cache.push(value);
                }
                return value;
            });
            cache = null; // 清空变量，便于垃圾回收机制回收
            const logs = JSON.parse(argsStr)
            this.interceptor({
                timestamp, stack, level, logs
            })
        }

        if (this.config.logTime) {
            args.unshift(timestamp)
        }
        if (this.config.logStack === true && stack != null) {
            args.push('\n' + stack)
        }
        return args
    }

    _level(stacks) {
        const logLine = stacks[2]
        const match = logLine.match(/at [\w]+\.([\w]+)/i)
        if (match != null && match.length > 1) {
            return match[1].toUpperCase()
        }
        return 'INFO'
    }
}

export default Logger
