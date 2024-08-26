function inferBreach(value, lowerLimit, upperLimit) {
  if (value < lowerLimit) {
    return 'TOO_LOW';
  }
  if (value > upperLimit) {
    return 'TOO_HIGH';
  }
  return 'NORMAL';
}

function classifyTemperatureBreach(coolingType, temperatureInC) {
  console.log("coolingtype", coolingType)
  const COOLING_RANGE = {
    "PASSIVE_COOLING": { lower: 0, upper: 35 },
    "HI_ACTIVE_COOLING": { lower: 0, upper: 45 },
    "MED_ACTIVE_COOLING": { lower: 0, upper: 40 }
  };
  console.log("COOLING RANGE", COOLING_RANGE[coolingType])
  let lowerLimit = COOLING_RANGE[coolingType].lower;
  let upperLimit = COOLING_RANGE[coolingType].upper;
  return inferBreach(temperatureInC, lowerLimit, upperLimit);
}

function checkAndAlert(alertTarget, batteryChar, temperatureInC) {
  const breachType = classifyTemperatureBreach(batteryChar['coolingType'], temperatureInC);
  if (alertTarget == 'TO_CONTROLLER') {
    sendToController(breachType);
  } else if (alertTarget == 'TO_EMAIL') {
    sendToEmail(breachType);
  }
}

function sendToController(breachType) {
  const header = 0xfeed;
  console.log(`${header}, ${breachType}`);
}

function sendToEmail(breachType) {
  const recepient = 'a.b@c.com';
  if (breachType == 'TOO_LOW') {
    console.log(`To: ${recepient}`);
    console.log('Hi, the temperature is too low');
  } else if (breachType == 'TOO_HIGH') {
    console.log(`To: ${recepient}`);
    console.log('Hi, the temperature is too high');
  }
}

module.exports =
  { inferBreach, classifyTemperatureBreach, checkAndAlert, sendToEmail, sendToController };
