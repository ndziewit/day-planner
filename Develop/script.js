$( document ).ready(function() {

    var container = $('.container');
    var currentTime = moment().format('LT');
    var currentHour = parseInt(currentTime[0]+currentTime[1]);
    var today = new Date();
    var date = (today.getMonth()+1) + '-' + today.getDate() + '-' + today.getFullYear();
    $("#currentDay").append(date);
    var upcoming = false;

    var storage = JSON.parse(localStorage.getItem('planner'));
    if (storage === null){
        storage = {
            "9AM" : "", "10AM" : "","11AM" : "","12PM" : "","1PM" : "","2PM" : "","3PM" : "","4PM" : "","5PM" : ""
        }
    }
    
    function createHourRow(time, data){
        if(time.length === 3){
            var displayTime = time[0] + " " + time[1] + time[2];
        } else {
            var displayTime = time[0] + time[1] + " " + time[2] + time[3];
        }
        var row = $('<div>');
        row.attr('id', time).addClass('row hour-block');
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
                    newCol.addClass('col-md-2 saveTime').text("Click here to save time block");
                    break;
            }
            row.append(newCol);
            row.addClass('past');
            if(upcoming && parseInt(time) !== currentHour){
                row.addClass('upcoming');
                row.removeClass('past');
            }
            if(parseInt(time) === currentHour){
                row.addClass('current');
                upcoming = true;
                row.removeClass('past');
            } 
        }
    }
    
    // Create time blocks 9 AM to 5 PM
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