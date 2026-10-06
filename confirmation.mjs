import {selectedVisit,selectedAppointment} from './visit.mjs';
import qrcode from './vendor/qrcode.mjs';

const validReference=id=>typeof id==='string'&&/^ZQ-\d{4,10}$/.test(id);
export function confirmationUrl(id,origin,selection){
 if(!validReference(id))throw new Error('Invalid registration reference.');
 const url=new URL('/',origin);
 if(!['https:','http:'].includes(url.protocol))throw new Error('Invalid confirmation origin.');
 url.searchParams.set('confirmation',id);
 if(selection){const visit=selectedVisit(selection);if(!visit)throw new Error('Invalid care team selection.');url.searchParams.set('facility',visit.facilityId);url.searchParams.set('department',visit.departmentId);url.searchParams.set('doctor',visit.doctorId);if(selection.slotId){const appointment=selectedAppointment(selection);if(!appointment)throw new Error('Invalid appointment time slot.');url.searchParams.set('slot',appointment.slotId);}}
 return url.href;
}
export function readConfirmation(search){
 const query=new URLSearchParams(search);
 if(!query.has('confirmation'))return {requested:false,id:null};
 const id=query.get('confirmation');
 if(!validReference(id))return {requested:true,id:null};
 if(['facility','department','doctor','slot'].some(k=>query.has(k))){const selection={facilityId:query.get('facility'),departmentId:query.get('department'),doctorId:query.get('doctor'),slotId:query.get('slot')};const visit=query.has('slot')?selectedAppointment(selection):selectedVisit(selection);return visit?{requested:true,id,visit}:{requested:true,id:null};}
 return {requested:true,id};
}
export function registrationQr(id,origin,selection){
 const url=confirmationUrl(id,origin,selection);
 const code=qrcode(0,'M');
 code.addData(url,'Byte');code.make();
 const svg=code.createSvgTag({cellSize:4,margin:16,scalable:true});
 return {url,svg,code};
}
