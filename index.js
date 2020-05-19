import { fifaData } from './fifa.js';

//console.log(fifaData);
  
// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */

// fifaData.forEach(match => {
//     if (match.Year === 2014 && match.Stage === "Final"){
//         console.log(`${match["Home Team Name"]} vs ${match["Away Team Name"]}`);
//         console.log(`${match["Home Team Goals"]}-${match["Away Team Goals"]}`);
//         let winner;
//         if (match["Home Team Goals"] > match["Away Team Goals"]){
//             winner = match["Home Team Name"];
//         }else if (match["Home Team Goals"] < match["Away Team Goals"]){
//             winner = match["Away Team Name"];
//         }else {
//             winner = match["Win conditions"];
//         }
//         console.log(`Winner: ${winner}`);
//     }
// });


/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

const getFinals = function(data) {

    return data.filter(match => match.Stage === "Final");

};
//console.log(getFinals(fifaData));

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

const getYears = function(callBack) {

    return callBack(fifaData).map(match => match.Year);

};

//console.log(getYears(getFinals));

/* Task 5: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */ 

function getWinners(getFinals) {

    let winners = getFinals(fifaData).map(match => {
        if (match["Home Team Goals"] > match["Away Team Goals"]){
            return match["Home Team Name"];
        }else if (match["Home Team Goals"] < match["Away Team Goals"]){
            return match["Away Team Name"];
        }else {
            return match["Win conditions"].split(" ")[0];
        }
    });
    return winners;
};

//console.log(getWinners(getFinals));

/* Task 6: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getWinnersByYear(getWinners, getYears) {
    const winners = getWinners(getFinals);
    const years = getYears(getFinals);
    let arr = [];
    for (let i = 0; i < winners.length; i++){
        arr.push(`In ${years[i]}, ${winners[i]} won the world cup!`);
    }
    return arr;
};

//console.log(getWinnersByYear(getWinners, getYears));

/* Task 7: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {

  const totalMatches = data.length;
  let totalHomeGoals = data.reduce((total, match) => {
    return total += match["Home Team Goals"];
  }, 0);
  let totalAwayGoals = data.reduce((total, match) => {
    return total += match["Away Team Goals"];
  }, 0);
  return [totalHomeGoals/totalMatches, totalAwayGoals/totalMatches];

};

//console.log(getAverageGoals(fifaData));


/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials) {

  const teamInFinalsHome = data.filter(match => {
    return match.Stage === "Final" && match["Home Team Initials"] === teamInitials;
  });
  const teamInFinalsAway = data.filter(match => {
    return match.Stage === "Final" && match["Away Team Initials"] === teamInitials;
  });

  if (teamInFinalsHome.length < 1 && teamInFinalsAway.length < 1){
    return 0;
  }

  let teamName = "";
  if (teamInFinalsHome.length > 0){
    teamName = teamInFinalsHome[0]["Home Team Name"];
  }else{
    teamName = teamInFinalsAway[0]["Away Team Name"];
  }
  let homeWins = 0;
  let awayWins = 0;
  
  if (teamInFinalsHome.length > 0){
    homeWins = teamInFinalsHome.reduce((total, match) => {
      if (match["Home Team Goals"] > match["Away Team Goals"] || match["Win conditions"].split(" ")[0] === teamName){
        return total += 1;
      }
      return total;
    }, 0);
  }

  if (teamInFinalsAway.length > 0){
    awayWins = teamInFinalsAway.reduce((total, match) => {
      if (match["Home Team Goals"] < match["Away Team Goals"] || match["Win conditions"].split(" ")[0] === teamName){
        return total += 1;
      }
      return total;
    }, 0);
  }

  return homeWins + awayWins;
};

//console.log(getCountryWins(fifaData, "BRA"));

/* STRETCH 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals scored per appearance (average goals for) in the World Cup finals */

// function getGoals(data) {

//     const finals = getFinals(data).map(match => {
//       return {
//         homeTeam: match["Home Team Name"],
//         homeTeamGoals: match["Home Team Goals"],
//         awayTeam: match["Away Team Name"],
//         awayTeamGoals: match["Away Team Goals"],
//       }
//     });

//     const totalGoalsPerTeam = [];
//     finals.forEach(game => {
//       const homeName = game.homeTeam;
//       const homeGoals = game.homeTeamGoals;
//       const awayName = game.awayTeam;
//       const awayGoals = game.awayTeamGoals;
//       const obj = {
//         [homeName]: homeGoals,
//       }
//       totalGoalsPerTeam.push(obj);
//       const obj2 = {
//         [awayName]: awayGoals,
//       }
//       totalGoalsPerTeam.push(obj2);
//     });
//     console.log(totalGoalsPerTeam);



// };

// getGoals(fifaData);


/* STRETCH 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

};

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */

// Create a function that takes country initials as a parameter and determines how many goals that country has scored in World Cup games since 1930.

function totalGoals(data, countryInitials){

const countryHomeGoals = data.filter(game => {
  return game["Home Team Initials"] === countryInitials;
});
const countryAwayGoals = data.filter(game => {
  return game["Away Team Initials"] === countryInitials;
});

const totalHomeGoals = countryHomeGoals.reduce((total, game) => {
  return total + game["Home Team Goals"];
}, 0);
const totalAwayGoals = countryAwayGoals.reduce((total, game) => {
  return total + game["Away Team Goals"];
}, 0);

return totalHomeGoals + totalAwayGoals;

}

//console.log(totalGoals(fifaData, "BRA"));
