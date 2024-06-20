import './style.css'
import logger from './lib/logger.js'
document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://github.com/oldsaltedfish" target="_blank">
      <img src="/cutie.png" class="logo" alt="Vite logo" />
    </a>
    <h1>Hello cutie!</h1>
    <div class="card">
      <input type="text" id="log-text"/><button id="log">log</button>
    </div>
    <div class="card">
      <input type="text" id="info-text"/><button id="log-info">log info</button>
    </div>
    <div class="card">
      <input type="text" id="waring-text"/><button id="log-waring">log waring</button>
    </div>
    <div class="card">
      <input type="text" id="error-text"/><button id="log-error">log error</button>
    </div>
    <div class="card">
      <button class="" id="disabled">disabled</button><button id="enabled">enabled</button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`
logger.setConfig({
    logTime: true,
    logStack: true,
    consoleLog: true,
    now: function() {
        return new Date().toISOString()
    }
})
console = logger
console.log("hello!!")
document.querySelector('#log').addEventListener('click', () => {
    console.log(document.querySelector('#log-text').value)
})
document.querySelector('#log-info').addEventListener('click', () => {
    console.info("log-info", document.querySelector('#info-text').value)
})
document.querySelector('#log-waring').addEventListener('click', () => {
    console.warn("log-log-waring",document.querySelector('#waring-text').value)
})
document.querySelector('#log-error').addEventListener('click', () => {
    console.error("log-error-text", document.querySelector('#error-text').value)
})

document.querySelector('#disabled').addEventListener('click', () => {
    logger.setConfig({
        consoleLog: false
    })
})
document.querySelector('#enabled').addEventListener('click', () => {
    logger.setConfig({
        consoleLog: true
    })
})
