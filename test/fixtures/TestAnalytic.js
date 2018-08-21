const Analytic = require('../../dist').Analytic

module.exports = class TestAnalytic extends Analytic {
  run() {
    console.log('I AM AUTOMATICALLY RUNNING...', !!this.app)
  }

  test() {
    console.log('I AM TEST...', !!this.app)
  }

  minuteTest() {
    console.log('I AM MINUTE TEST...', !!this.app)
  }

  hourTest() {
    console.log('I AM HOUR TEST...', !!this.app)
  }

  dayTest() {
    console.log('I AM DAY TEST...', !!this.app)
  }

  weekTest() {
    console.log('I AM WEEK TEST...', !!this.app)
  }

  monthTest() {
    console.log('I AM MONTH TEST...', !!this.app)
  }

  quarterTest() {
    console.log('I AM QUARTER TEST...', !!this.app)
  }

  yearTest() {
    console.log('I AM YEAR TEST...', !!this.app)
  }
}
