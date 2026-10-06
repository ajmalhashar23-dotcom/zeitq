export const doctorKey=record=>[record.facility||'Demo clinic',record.doctor||'Sample care team',record.cabin||''].join('::');
export function tokenGroups(queue,facility='all'){
 const groups=new Map();
 for(const record of queue){if(facility!=='all'&&record.facility!==facility)continue;const key=doctorKey(record);if(!groups.has(key))groups.set(key,{key,facility:record.facility||'Demo clinic',doctor:record.doctor||'Sample care team',department:record.department,cabin:record.cabin,current:null,waiting:[],completed:0,pending:0});const group=groups.get(key);if(record.status==='called')group.current=record;else if(record.status==='checked-in')group.waiting.push(record);else if(record.status==='completed')group.completed++;else group.pending++;}
 for(const group of groups.values())group.waiting.sort((a,b)=>(a.arrivalOrder||0)-(b.arrivalOrder||0));
 return [...groups.values()];
}
export function tokenPosition(queue,id){const record=queue.find(r=>r.id===id);if(!record)return null;const group=tokenGroups(queue).find(g=>g.key===doctorKey(record));return {status:record.status,ahead:record.status==='checked-in'?group.waiting.findIndex(r=>r.id===id)+(group.current?1:0):null,cabin:record.cabin,doctor:record.doctor};}
export function nextWaitingToken(queue,key){const group=tokenGroups(queue).find(g=>g.key===key);if(!group)throw new Error('Doctor queue not found.');if(group.current)throw new Error('Complete the current consultation before calling the next token.');if(!group.waiting.length)throw new Error('No checked-in tokens are waiting for this doctor.');return group.waiting[0].id;}
