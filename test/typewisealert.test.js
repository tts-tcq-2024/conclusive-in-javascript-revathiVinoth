const alerts = require('../src/typewisealert');
const { expect } = require('chai');

describe('Test -Infer alerts', () => {
  it('infers a value lower than the minimum as TOO_LOW', () => {
    expect(alerts.inferBreach(20, 50, 100)).equals('TOO_LOW');
  });
  it('infers a value lower than the minimum as TOO_HIGH', () => {
    expect(alerts.inferBreach(110, 50, 100)).equals('TOO_HIGH');
  });
  it('infers a value lower than the minimum as TOO_HIGH', () => {
    expect(alerts.inferBreach(60, 50, 100)).equals('NORMAL');
  });
});

describe('Test -classifyTemperatureBreach alerts', () => {
  it('infers a value based on classification of coolingtype PASSIVE_COOLING', () => {
    expect(alerts.classifyTemperatureBreach('PASSIVE_COOLING', 34)).equals('NORMAL');
  });
  it('infers a value based on classification of coolingtype HI_ACTIVE_COOLING', () => {
    expect(alerts.classifyTemperatureBreach('HI_ACTIVE_COOLING', -1)).equals('TOO_LOW');
  });
  it('infers a value based on classification of coolingtype MED_ACTIVE_COOLING', () => {
    expect(alerts.classifyTemperatureBreach('MED_ACTIVE_COOLING', 41)).equals('TOO_HIGH');
  });
});

describe('Test -sendAlerts', () => {
  it('send alerts to controller with PASSIVE_COOLING', () => {
    alerts.checkAndAlert('TO_CONTROLLER', { 'coolingType': "PASSIVE_COOLING" }, 34)
    expect(alerts.sendToController.calledOnce)
  });
  it('send alerts to email with coolingtype HI_ACTIVE_COOLING', () => {
    alerts.checkAndAlert('TO_EMAIL', { 'coolingType': "HI_ACTIVE_COOLING" }, -1)
    expect(alerts.sendToEmail.calledOnce)
  });
  it('send alerts to email with cooling type MED_ACTIVE_COOLING', () => {
    alerts.checkAndAlert('TO_EMAIL', { 'coolingType': "MED_ACTIVE_COOLING" }, 41)
    expect(alerts.sendToEmail.calledOnce)
  });
});