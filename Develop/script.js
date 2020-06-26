$( document ).ready(function() {

    var currentTime = moment().format('LT');
    var date = moment().calendar();
    var currentHour = parseInt(currentTime[0]+currentTime[1]);
    var upcoming = false;
    var container = $('.container');

    //Places date in Jumbotron
    $("#currentDay").append(date);

    //Function to create rows and labels for each time block
    function createHourRow(time, data){
        var displayTime = time;
        var row = $('<div>').attr('id', time).addClass('row hour-block');
        container.append(row);

        //For loop executes creating columns in each row
        for(var i = 0; i < 3; i++){
            var newCol = $('<div>');
            switch(i){
                case 0:
                    newCol.addClass('col-md-2 hour').text(displayTime);
                    break;
                case 1:
                    var inputArea = $('<textarea>').text(data).addClass('event');
                    newCol.append(inputArea).addClass('col-md-8');
                    break;
                case 2:
                    newCol.addClass('col-md-2 saveTime').text("Save Event");
                    break;
            }
            //Compares current times and applies the appropriate class
            row.append(newCol);
            if(upcoming && parseInt(time) !== currentHour){
                row.addClass('upcoming');
            }
            if(parseInt(time) !== currentHour){
                row.addClass('past')
            }
            if(parseInt(time) === currentHour){
                row.addClass('current');
                upcoming = true;
            }
        }
    }
    
    //Creates local storage variable
    var storage = JSON.parse(localStorage.getItem('planner'));

    //Checks to see if local storage is empty and creates object
    if (storage === null){
        storage = {
            "9AM" : "", "10AM" : "","11AM" : "","12AM" : "","1PM" : "","2PM" : "","3PM" : "","4PM" : "","5PM" : ""
        }
    }
    
    //For loop creates each row
    for(key in storage){
        var data = storage[key];
        createHourRow(key, data);
    }
    
    //Executes creation of each time block
    function setStorage(id,data){
        storage[id] = data;
        localStorage.setItem('planner', JSON.stringify(storage));
    }
    
    // Save button
    $('.saveTime').on("click", function(e){
        event.preventDefault();
        var selectionID = this.parentElement.id;
        var selectionData = this.parentElement.querySelectorAll('textarea')[0].value;
        setStorage(selectionID, selectionData);
    })

    });