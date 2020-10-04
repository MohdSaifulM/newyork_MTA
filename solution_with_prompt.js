const prompt = require('prompt');

prompt.start();

let trainNetwork = [
    {
        name: "nLine",
        stops: ["Times Square", "34th", "nLine-28th", "nLine-23rd", "Union Square", "nLine-8th"]
    },
    
    {
        name: "lLine",
        stops: ["lLine-8th", "6th", "Union Square", "3rd", "1st"]
    },
    
    {
        name: "sixLine",
        stops: ["Grand Central", "33rd", "sixLine-28th", "sixLine-23rd", "Union Square", "Astor Place"]
    }   
];

console.log(trainNetwork);
console.log("Please type in the start and end location - it is case sensitive")

prompt.get(['userStart', 'userEnd'], function (err, result) {
    if (err) { return onErr(err); }
    let userStart = result.userStart;
    let userEnd = result.userEnd;
    
    function findIndexOfStart(trainLine){
        startNetwork = whichStart(trainLine)
        for(i = 0; i < trainLine.length; i++){
            if(trainLine[i].name.includes(startNetwork)){
                startIndex = i;
            }
        }
        return startIndex;
    }
    
    function findIndexOfEnd(trainLine){
        endNetwork = whichEnd(trainLine)
        for(i = 0; i < trainLine.length; i++){
            if(trainLine[i].name.includes(endNetwork)){
                endIndex = i;
            }
        }
        return endIndex;
    }
    
    function whichStart(trainLine){
        for(i = 0; i < trainLine.length; i++){
            if(trainLine[i].stops.includes(userStart)){
                startNetwork =  trainLine[i].name;
            }
        }
        return startNetwork;
    }
    
    function whichEnd(trainLine){
        for(i = 0; i < trainLine.length; i++){
            if(trainLine[i].stops.includes(userEnd)){
                endNetwork =  trainLine[i].name;
            }
        }
        return endNetwork;
    }
    
    function trainJourneySingleLine(trainLine, startIndex){
        let journey = [];    
        let rideLength = trainLine[startIndex].stops.indexOf(userEnd) - trainLine[startIndex].stops.indexOf(userStart);
        
        if(rideLength > 1){
            for(i = (trainLine[startIndex].stops.indexOf(userStart) + 1); i <= trainLine[startIndex].stops.indexOf(userEnd); i++){
                if(!journey.includes(trainLine[startIndex].stops[i])){
                    journey.push(trainLine[startIndex].stops[i]);
                }
            }
            console.log(`${rideLength} stops in total`);
            console.log(`You must travel through the following stops on the ${trainLine[startIndex].name} : ${journey.join(", ")}`);
        }else if(rideLength < -1){
            for((i = trainLine[startIndex].stops.indexOf(userStart) - 1); i >= trainLine[startIndex].stops.indexOf(userEnd); i--){
                if(!journey.includes(trainLine[startIndex].stops[i])){
                    journey.push(trainLine[startIndex].stops[i]);
                }
            }
            let negativeLength = Math.abs(rideLength);
            console.log(`${negativeLength} stops in total`);
            console.log(`You must travel through the following stops on the ${trainLine[startIndex].name} : ${journey.join(", ")}`);
        }else if(rideLength == 1){
            for(i = (trainLine[startIndex].stops.indexOf(userStart) + 1); i <= trainLine[startIndex].stops.indexOf(userEnd); i++){
                if(!journey.includes(trainLine[startIndex].stops[i])){
                    journey.push(trainLine[startIndex].stops[i]);
                }
            }
            console.log(`${rideLength} stop in total`);
            console.log(`You must travel through the following stop on the ${trainLine[startIndex].name} : ${journey.join(", ")}`);
        }else if(rideLength == -1){
            for((i = trainLine[startIndex].stops.indexOf(userStart) - 1); i >= trainLine[startIndex].stops.indexOf(userEnd); i--){
                if(!journey.includes(trainLine[startIndex].stops[i])){
                    journey.push(trainLine[startIndex].stops[i]);
                }
            }
            let negativeLength = Math.abs(rideLength);
            console.log(`${negativeLength} stop in total`);
            console.log(`You must travel through the following stop on the ${trainLine[startIndex].name} : ${journey.join(", ")}`);
        }
    }
    
    function trainJourneyMultipleLine(trainLine, startIndex, endIndex){
        
        let firstJourney = [];
        let secondJourney = [];
    
        let rideToUnionSquare = trainLine[startIndex].stops.indexOf("Union Square") - trainLine[startIndex].stops.indexOf(userStart);
        if(rideToUnionSquare >= 1){
            for(i = (trainLine[startIndex].stops.indexOf(userStart) + 1); i <= trainLine[startIndex].stops.indexOf("Union Square"); i++){
                if(!firstJourney.includes(trainLine[startIndex].stops[i])){
                    firstJourney.push(trainLine[startIndex].stops[i]);
                }
            }
            console.log(`You must travel through the following stops on the ${trainLine[startIndex].name} : ${firstJourney.join(", ")}`);
        }else if(rideToUnionSquare < 0){
            for((i = trainLine[startIndex].stops.indexOf(userStart) - 1); i >= trainLine[startIndex].stops.indexOf("Union Square"); i--){
                if(!firstJourney.includes(trainLine[startIndex].stops[i])){
                    firstJourney.push(trainLine[startIndex].stops[i]);
                }
            }
            console.log(`You must travel through the following stops on the ${trainLine[startIndex].name} : ${firstJourney.join(", ")}`);
        }
    
        let rideToDestination = trainLine[endIndex].stops.indexOf(userEnd) - trainLine[endIndex].stops.indexOf("Union Square");
        let totalRide = Math.abs(rideToUnionSquare) + Math.abs(rideToDestination);
        if(rideToDestination >= 1){
            for(i = (trainLine[endIndex].stops.indexOf("Union Square") + 1); i <= trainLine[endIndex].stops.indexOf(userEnd); i++){
                if(!secondJourney.includes(trainLine[endIndex].stops[i])){
                    secondJourney.push(trainLine[endIndex].stops[i]);
                }
            }
            console.log(`Change at Union Square`)
            console.log(`Your journey continues through the following stops on the ${trainLine[endIndex].name} : ${secondJourney.join(", ")}`);
            console.log(`${totalRide} stops in total`);
        }else if(rideToDestination < 0){
            for((i = trainLine[endIndex].stops.indexOf("Union Square") - 1); i >= trainLine[endIndex].stops.indexOf(userEnd); i--){
                if(!secondJourney.includes(trainLine[endIndex].stops[i])){
                    secondJourney.push(trainLine[endIndex].stops[i]);
                }
            }
            console.log(`Change at Union Square`)
            console.log(`Your journey continues through the following stops on the ${trainLine[endIndex].name} : ${secondJourney.join(", ")}`);
            console.log(`${totalRide} stops in total`);
        }
    
    }
    
    function trainJourneyFinal(trainLine){
        let startLine = whichStart(trainLine);
        let endLine = whichEnd(trainLine);
        let startIndex = findIndexOfStart(trainLine);
        let endIndex = findIndexOfEnd(trainLine);
    
        if(startLine == endLine){
            trainJourneySingleLine(trainLine, startIndex);
        }else if(userStart == "Union Square" || userEnd == "Union Square"){
            trainJourneySingleLine(trainLine, startIndex);
        }else{
            trainJourneyMultipleLine(trainLine, startIndex, endIndex);
        }
    
    }

    trainJourneyFinal(trainNetwork);
});

function onErr(err) {
    console.log(err);
    return 1;
}