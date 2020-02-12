// Yesterday, Greg was very busy packing up some gifts to send out to family and friends.
// It was a busy month. He had a birthday, an anniversary, a wedding, and even a house
// warming to send gifts out for…and the events all took place in the same week! Because
// he moved away from his home area when he took his new job, he lived across the country
// from most of his family and friends now. As a result, he always tried to find something
// locally for each person to make each gift more personal and interesting. Determine the
// full name of each person he shipped a gift to, what state each lived in, what each event
// was, each person’s relationship to Greg, and what day of the week each event was taking
// place (Wednesday through Saturday).
//
// 1. Greg’s friend wasn’t Ellen Fairview, who didn’t live in Ohio.
//    The birthday girl didn’t have her party on Friday.
//
// 2. Rick’s last name wasn’t Bartley but his event was on Saturday night.
//
// 3. Greg’s father wasn’t getting married, but his last name was Gray.
//
// 4. The friend having a house warming didn’t live in Ohio.
//
// 5. The wedding was for Greg’s cousin.  Heather, who didn’t live in Texas,
//    was Greg’s sister but her event wasn’t on Wednesday night.
//
// 6. Walter’s event was one day earlier than the person whose last name was DeForest
//    but after the person who lived in Washington. The anniversary was held in Montana.


//sorted lexigraphically so that a reverse sort will result in every permutation
const EVENTS = ['anniversary','birthday','house warming','wedding']
const LNAMES = ['Bartley','DeForest','Fairview','Gray']
const STATES = ['Montana','Ohio','Texas','Washington']
const RELATIONSHIPS = ['cousin','father','friend','sister']
const DAYS = ['Friday','Saturday','Thursday','Wednesday']

const permutationsOfFourOptions = [
  [1,2,3,0],
  [1,2,0,3],
  [1,0,2,3],
  [1,0,3,2],
  [1,3,0,2],
  [1,3,2,0],

  [2,1,3,0],
  [2,1,0,3],
  [2,0,1,3],
  [2,0,3,1],
  [2,3,0,1],
  [2,3,1,0],

  [3,2,1,0],
  [3,2,0,1],
  [3,0,2,1],
  [3,0,1,2],
  [3,1,0,2],
  [3,1,2,0],

  [0,2,3,1],
  [0,2,1,3],
  [0,1,2,3],
  [0,1,3,2],
  [0,3,1,2],
  [0,3,2,1]
]

let matches = []

for (lastNameMap of permutationsOfFourOptions) {
  for (stateMap of permutationsOfFourOptions) {
    for (eventMap of permutationsOfFourOptions) {
      for(relateMap of permutationsOfFourOptions) {
        for(dayMap of permutationsOfFourOptions) {
          const sol =
          {
            Ellen: {
              fname: "Ellen",
              lname: LNAMES[lastNameMap[0]],
              state: STATES[stateMap[0]],
              event: EVENTS[eventMap[0]],
              relate: RELATIONSHIPS[relateMap[0]],
              day: DAYS[dayMap[0]]
            },
            Heather: {
              fname: "Heather",
              lname: LNAMES[lastNameMap[1]],
              state: STATES[stateMap[1]],
              event: EVENTS[eventMap[1]],
              relate: RELATIONSHIPS[relateMap[1]],
              day: DAYS[dayMap[1]]
            },
            Rick: {
              fname: "Rick",
              lname: LNAMES[lastNameMap[2]],
              state: STATES[stateMap[2]],
              event: EVENTS[eventMap[2]],
              relate: RELATIONSHIPS[relateMap[2]],
              day: DAYS[dayMap[2]]
            },
            Walter: {
              fname: "Walter",
              lname: LNAMES[lastNameMap[3]],
              state: STATES[stateMap[3]],
              event: EVENTS[eventMap[3]],
              relate: RELATIONSHIPS[relateMap[3]],
              day: DAYS[dayMap[3]]
            }
          }

          // 1. Greg’s friend wasn’t Ellen Fairview, who didn’t live in Ohio.
          //    The birthday girl didn’t have her party on Friday.
          if (sol.Ellen.relate !== "friend" &&
              sol.Ellen.lname === "Fairview" &&
              sol.Ellen.state !== "Ohio" &&
              getObjByProp(sol,"event","birthday").day !== "Friday" &&
              (getObjByProp(sol,"event","birthday") === sol.Ellen || getObjByProp(sol,"event","birthday") === sol.Heather) &&

          // 2. Rick’s last name wasn’t Bartley but his event was on Saturday night.
              sol.Rick.lname !== "Bartley" &&
              sol.Rick.day === "Saturday" &&

          // 3. Greg’s father wasn’t getting married, but his last name was Gray.
              getObjByProp(sol,'relate','father').event !== "wedding" &&
              getObjByProp(sol,'relate','father').lname === "Gray" &&

          // 4. The friend having a house warming didn’t live in Ohio.
              getObjByProp(sol,'relate','friend').event === "house warming" &&
              getObjByProp(sol,'relate','friend').state !== "Ohio" &&

          // 5. The wedding was for Greg’s cousin.  Heather, who didn’t live in Texas,
          //    was Greg’s sister but her event wasn’t on Wednesday night.
              getObjByProp(sol,'relate','cousin').event === "wedding" &&
              sol.Heather.state !== "Texas" &&
              sol.Heather.relate === "sister" &&
              sol.Heather.day !== "Wednesday" &&

          // 6. Walter’s event was one day earlier than the person whose last name was DeForest
          //    but after the person who lived in Washington. The anniversary was held in Montana.
              dayToInt(getObjByProp(sol,'lname','DeForest').day) - dayToInt(sol.Walter.day) === 1 &&
              dayToInt(sol.Walter.day) - dayToInt(getObjByProp(sol,'state','Washington').day) > 0 &&
              getObjByProp(sol,'event','anniversary').state === "Montana"
          ) {
            matches.push(sol)
          }
        }
      }
    }
  }
}

if(matches.length < 5) {
  console.log("Here are the matches:\n",matches)
}
console.log("This many currently match: ",matches.length)



function getObjByProp(object1,key,value) {
  return Object.values(object1).find( element => element[key] === value)
}

function dayToInt (dayString) {
  return ({
    Wednesday: 0,
    Thursday: 1,
    Friday: 2,
    Saturday: 3,
  })[dayString]
}
