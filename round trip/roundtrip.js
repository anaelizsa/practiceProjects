const departTripTicket = {
    name : 'Alicia',
    from : 'Canada',
    to : 'Japan',
    businessClass : true,
    upgrade (){
      if (departTripTicket.businessClass == true){
        console.log("Your ticket is already business class!")
      } else {
        departTripTicket.businessClass = true
      }
    }
  }
  
  console.log(departTripTicket.businessClass)
  departTripTicket.upgrade()
  
  departTripTicket.leaveTime = 6
  departTripTicket.arriveTime = 14
  departTripTicket.flightTime = function(){
    let flightHours = departTripTicket.arriveTime - departTripTicket.leaveTime;
    if (flightHours < 0) {
        flightHours += 24;
    }
    console.log(flightHours + " hours");
  };
  
  departTripTicket.flightTime()
  
  
  
  
  const returnTripTicket = {
    name : 'Alicia',
    from : 'Japan',
    to : 'Canada',
    businessClass : false,
    upgrade (){
      if (returnTripTicket.businessClass == true){
        console.log("Your ticket is already business class!")
      } else {
        returnTripTicket.businessClass = true
        console.log('You have been updated to Businsess Class', returnTripTicket.businessClass)
      }
    }
  }
  
  console.log(returnTripTicket.businessClass)
  returnTripTicket.upgrade()
  
  returnTripTicket.leaveTime = 22
  returnTripTicket.arriveTime = 8
  returnTripTicket.flightTime = function(){
    let flightHours = returnTripTicket.arriveTime - returnTripTicket.leaveTime;
    if (flightHours < 0) {
      flightHours += 24;
    }
    console.log(flightHours + " hours");
  };
  
  returnTripTicket.flightTime()
  
  