// Fictional providers and doctors for the ZEITQ AI demonstration.
export const FACILITIES=[
 {id:'f1',name:'ZEITQ Medical Clinic',type:'Clinic',location:'Dubai',departments:[
  {id:'gm',name:'General medicine',doctors:[{id:'d1',name:'Dr. Aisha Rahman'},{id:'d2',name:'Dr. Daniel Thomas'}]},
  {id:'derm',name:'Dermatology',doctors:[{id:'d1',name:'Dr. Leila Mansour'},{id:'d2',name:'Dr. Priya Shah'}]},
  {id:'paed',name:'Paediatrics',doctors:[{id:'d1',name:'Dr. Omar Nasser'},{id:'d2',name:'Dr. Maya George'}]}
 ]},
 {id:'f2',name:'ZEITQ Harbour Hospital',type:'Hospital',location:'Abu Dhabi',departments:[
  {id:'gm',name:'General medicine',doctors:[{id:'d1',name:'Dr. Sami Khalil'},{id:'d2',name:'Dr. Rina Mehta'}]},
  {id:'card',name:'Cardiology',doctors:[{id:'d1',name:'Dr. Ahmed Saleh'},{id:'d2',name:'Dr. Sofia Karim'}]},
  {id:'ortho',name:'Orthopaedics',doctors:[{id:'d1',name:'Dr. Kareem Faris'},{id:'d2',name:'Dr. Elena James'}]}
 ]},
 {id:'f3',name:'ZEITQ Oasis Clinic',type:'Clinic',location:'Sharjah',departments:[
  {id:'gm',name:'General medicine',doctors:[{id:'d1',name:'Dr. Noor Hassan'},{id:'d2',name:'Dr. Adam Wilson'}]},
  {id:'derm',name:'Dermatology',doctors:[{id:'d1',name:'Dr. Hana Youssef'},{id:'d2',name:'Dr. Sara Menon'}]},
  {id:'paed',name:'Paediatrics',doctors:[{id:'d1',name:'Dr. Faisal Ahmed'},{id:'d2',name:'Dr. Nina Patel'}]}
 ]}
];
for(const facility of FACILITIES){facility.departments.forEach((department,index)=>department.doctors.forEach((doctor,i)=>{doctor.cabin=String((index+1)*100+i+1);doctor.hours={start:i===0?'09:00':'14:00',end:i===0?'12:00':'17:00'};doctor.slots=Array.from({length:9},(_,slotIndex)=>{const start=(i===0?9:14)*60+slotIndex*20;const time=minutes=>String(Math.floor(minutes/60)).padStart(2,'0')+':'+String(minutes%60).padStart(2,'0');return {id:time(start).replace(':',''),start:time(start),end:time(start+20),available:![2,6].includes(slotIndex)};});}));}
export function visitOptions(selection){const facility=FACILITIES.find(f=>f.id===selection.facilityId);const department=facility?.departments.find(d=>d.id===selection.departmentId);const doctor=department?.doctors.find(d=>d.id===selection.doctorId);return {facility,department,doctor};}
export function selectedVisit(selection){const {facility,department,doctor}=visitOptions(selection);return facility&&department&&doctor?{facilityId:facility.id,departmentId:department.id,doctorId:doctor.id,facility:facility.name,department:department.name,doctor:doctor.name,cabin:doctor.cabin,location:facility.location}:null;}
export function selectVisitField(patient,field,value){
 if(!['facilityId','departmentId','doctorId','slotId'].includes(field))throw new Error('Unknown visit field.');
 patient[field]=value;
 if(field!=='slotId')patient.slotId='';
 if(field==='facilityId'){patient.departmentId='';patient.doctorId='';}
 if(field==='departmentId')patient.doctorId='';
 return selectedVisit(patient);
}

export const APPOINTMENT_DATE='2026-10-12';
export const APPOINTMENT_DATE_LABEL='12 October 2026';
export function formatTime(time){const [hour,minute]=time.split(':').map(Number);return `${hour%12||12}:${String(minute).padStart(2,'0')} ${hour>=12?'PM':'AM'}`;}
export function slotLabel(slot){return `${formatTime(slot.start)} – ${formatTime(slot.end)}`;}
export function selectedAppointment(selection){const visit=selectedVisit(selection);const {doctor}=visitOptions(selection);const slot=doctor?.slots.find(s=>s.id===selection.slotId&&s.available);return visit&&slot?{...visit,slotId:slot.id,time:slot.start,endTime:slot.end,timeLabel:slotLabel(slot),date:APPOINTMENT_DATE,dateLabel:APPOINTMENT_DATE_LABEL}:null;}
