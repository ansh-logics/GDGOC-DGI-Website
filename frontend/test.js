const speakersList = [
   { EventId: "1", Name: "Amit" },
   { EventId: "2", Name: "Priya" },
   { EventId: "1", Name: ["Sohan",'sourav' ]},
];

const map = new Map();//store in form of string 
speakersList.forEach((e)=>{
    map.set(e.EventId,e.Name);
})
console.log(map);

console.log(map.get('1'))


// map.set("key1", 'value');
// const v = map.get("key1");
// console.log(v)