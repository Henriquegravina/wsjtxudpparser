// Created by PU3IKE - HEnrique B. Gravina
// License - GPL2
// 15/02/2021

const { Console } = require('console')
const dgram = require('dgram')
const server = dgram.createSocket('udp4')
const {WsjtxUdpParser} = require('./WsjtxUdpParser')

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`)
  server.close()
});

server.on('message', (buffer, rinfo) => { // A cada mensagem recebida passa aqui:
	
  try{
    
    const msg = new WsjtxUdpParser(buffer) 

    if(msg.type == 1){ // Decode WSJT-X
      console.log(`Message 12: HEARTBEAT---`)
      //console.log(buffer.toString('hex').replace(/(.)(.)/g, '$1$2 '))
      console.log(`Type:   ${msg.type}`)
      console.log(`Version:${msg.version}`)
      console.log(`Id:${msg.id}`)
      console.log(`dialFrequency:${msg.dialFrequency}`)
      console.log(`mode:${msg.mode}`)
      console.log(`dxcall:${msg.dxcall}`)
      console.log(`report:${msg.report}`)
      console.log(`txMode:${msg.txMode}`)
      console.log(`txEnable:${msg.txEnabled}`)
      console.log(`transmitting:${msg.transmitting}`)
      console.log(`decoding:${msg.decoding}`)
      console.log(`rxDf:${msg.rxDf}`)
      console.log(`txDf:${msg.txDf}`)
      console.log(`deCall:${msg.deCall}`)
      console.log(`deGrid:${msg.deGrid}`)
      console.log(`dxGrid:${msg.dxGrid}`)
      console.log(`txWatchdog:${msg.txWatchdog}`)
      console.log(`subMode:${msg.subMode}`)
      console.log(`fastMode:${msg.fastMode}`)
      console.log(`specialOperationMode:${msg.specialOperationMode}`)
      console.log(`frquencyToalrance:${msg.frquencyToalrance}`)
      console.log(`trPeriod:${msg.trPeriod}`)
      console.log(`configurationName:${msg.configurationName}`)
      //console.log(`txMessage:${msg.txMessage}`)

    }
    
    else if(msg.type == 2){ // Decode WSJT-X
      //console.log(buffer.toString('hex').replace(/(.)(.)/g, '$1$2 '))
      console.log(`Message 12: WSJT-X------`)
      console.log(`Type:   ${msg.type}`)
      console.log(`Version:${msg.version}`)
      console.log(`id:${msg.id}`)
      console.log(`new:${msg.new}`)
      console.log(`time:${msg.time}`)
      console.log(`time_utc:${msg.time_utc}`)
      console.log(`snr:${msg.snr}`)
      console.log(`delta_time:${msg.delta_time}`)
      console.log(`delta_freq:${msg.delta_freq}`)
      console.log(`mode:${msg.mode}`)
      console.log(`message:${msg.message}`)
      console.log(`lowConfidence:${msg.lowconfidence}`)
      console.log(`offAir:${msg.offair}`)
    }

    else if(msg.type == 10){ // Decode WSPR
      console.log(`Message 12: WSPR--------`)
      //console.log(buffer.toString('hex').replace(/(.)(.)/g, '$1$2 '))
      console.log(`Type:   ${msg.type}`)
      console.log(`Version:${msg.version}`)
      console.log(`id:${msg.id}`)
      console.log(`new:${msg.new}`)
      console.log(`time:${msg.time}`)
      console.log(`time_utc:${msg.time_utc}`)
      console.log(`snr:${msg.snr}`)
      console.log(`delta_time:${msg.delta_time}`)
      console.log(`freq:${msg.freq}`)
      console.log(`drift:${msg.drift}`)
      console.log(`callsign:${msg.callsign}`)
      console.log(`grid:${msg.grid}`)
      console.log(`power:${msg.power}`)
      console.log(`offAir:${msg.offair}`)
      
    }

    else if(msg.type == 12){ // Decode Adif message
      //console.log(buffer.toString('hex').replace(/(.)(.)/g, '$1$2 '))
      console.log(`Message 12: ADIF--------`)
      console.log(`Type:   ${msg.type}`)
      console.log(`Version:${msg.version}`)
      console.log(`id:${msg.id}`)
      console.log(`adif:${msg.adif}`)
    }    
  } catch (e) {
    console.log(e);
 };


});


server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(2238);
