import * as Locksmith from './interfaces/Locksmith.json';
import * as KeyLocker from './interfaces/KeyLocker.json';
import { ethers } from 'ethers';

export const LocksmithInterface = (function() {
  const interfaces = {
    'Locksmith': Locksmith,
    'KeyLocker': KeyLocker
  };

  const eventDictionary = Object.keys(interfaces).reduce((memo, next, index) => {
    interfaces[next].abi.filter((f) => f.type === 'event').forEach((event) => {
      memo[ethers.utils.id([event.name, '(', event.inputs.map((i) => i.type), ')'].join(''))] =
        {... event, contractName: next};
    });
    return memo;
  }, {});

  return {
    //////////////////////////
    // getAbi 
    // 
    // Returns the contract interface for a given name
    //////////////////////////
    getAbi: function(contract) {
      return interfaces[contract]; 
    },
    //////////////////////////
    // getEventDictionary
    //
    // Returns a hash of (contract => method => {signature, abi})
    // for all contracts defined in the interface.
    //////////////////////////
    getEventDictionary: function() {
      return eventDictionary;
    },
    //////////////////////////
    // getEventSignature
    //
    // For a given contract and event name, provides
    // the ethers event structure. 
    //////////////////////////
    getEventDefinition: function(contract, eventName) {
      return interfaces[contract].abi.filter(
        (f) => f.type === 'event' && f.name === eventName)[0];
    }
  }
})();
