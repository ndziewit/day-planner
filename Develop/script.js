$( document ).ready(function() {

    var container = $('.container');
    var currentTime = moment().format('LT');
    var currentHour = parseInt(currentTime[0]+currentTime[1]);
    var upcoming = false;

    var date = moment().calendar();
    $("#currentDay").append(date);

    var storage = JSON.parse(localStorage.getItem('planner'));
    if (storage === null){
        storage = {
            "9AM" : "", "10AM" : "","11AM" : "","12PM" : "","1PM" : "","2PM" : "","3PM" : "","4PM" : "","5PM" : ""
        }
    }
    console.log(storage)
    console.log(currentTime[0])
    console.log(currentTime[1])
    console.log(currentTime[2])
    console.log(currentTime[3])
    console.log(currentTime[4])
    console.log(currentTime[5])
    console.log(currentTime[6])

    function createHourRow(time, data){
        var displayTime = time;
        var row = $('<div>').attr('id', time).addClass('row hour-block');
        container.append(row);

        for(var i = 0; i < 3; i++){
            var newCol = $('<div>');
            switch(i){
                case 0:
                    newCol.addClass('col-md-2 hour').text(displayTime);
                    break;
                case 1:
                    newCol.addClass('col-md-8');
                    var inputArea = $('<textarea>').text(data).addClass('event');
                    newCol.append(inputArea);
                    break;
                case 2:
                    newCol.addClass('col-md-2 saveTime').text("Save Event");
                    break;
            }
            row.append(newCol).addClass('past');
            if(upcoming && parseInt(time) !== currentHour){
                row.addClass('upcoming');
                row.removeClass('past');
            }
            else if(parseInt(time) === currentHour){
                row.addClass('current');
                upcoming = true;
                row.removeClass('past');
            } 
        }
    }
    
    for(key in storage){
        var data = storage[key];
        createHourRow(key, data);
    }
    
    function setStorage(id,data){
        storage[id] = data;
        localStorage.setItem('planner', JSON.stringify(storage));
    }
    
    // Save button
    $('.saveTime').on("click", function(e){
        var selectionID = this.parentElement.id;
        var selectionData = this.parentElement.querySelectorAll('textarea')[0].value;
        setStorage(selectionID, selectionData);
    })

    });