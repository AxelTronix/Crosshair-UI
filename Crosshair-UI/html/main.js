var currentSize = 25

function SetCrosshairURL(url) {
    var element = document.getElementById("crosshair"); 
    var input = document.getElementById("crosshair-ui-url");
    input.value = url;
    element.setAttribute("src", url)
    if (input.value != "") {
        SetCrosshairStatus(true)
    }
    else {
        SetCrosshairStatus(false)
    }
    SetCrosshairSize(currentSize)
}

function SetCrosshairSize(size) {
    var element = document.getElementById("crosshair");
    var input = document.getElementById("crosshair-ui-size");
    input.value = size;
    currentSize = size;
    element.setAttribute("width", size)
    element.setAttribute("height", size)
}

function SetCrosshairStatus(bool) {
    var element = document.getElementById("crosshair");
    element.style.display = bool ? "block" : "none";
}

function SetConfigDisplay(bool) {
    var element = document.getElementById("crosshair-ui");
    element.style.display = bool ? "block" : "none";
    if (bool == false) {
        fetch(`https://${GetParentResourceName()}/CloseCrosshairConfig`, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(["a"])
        }).then(resp => resp.json()).then(resp => console.log(resp));
    }
}

function UpdateCrosshairData() {
    var url = document.getElementById("crosshair-ui-url").value
    var size = document.getElementById("crosshair-ui-size").value
    SetCrosshairURL(url)
    SetCrosshairSize(size)
    fetch(`https://${GetParentResourceName()}/UpdateCrosshairData`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            url: url, 
            size: size,
        })
    }).then(resp => resp.json()).then(resp => console.log(resp));
    SetConfigDisplay(false)
}

function UpdateCrosshair(data) {
    var url = data
    var size = 35
    SetCrosshairURL(url)
    SetCrosshairSize(size)
    fetch(`https://${GetParentResourceName()}/UpdateCrosshairData`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            url: url, 
            size: size,
        })
    }).then(resp => resp.json()).then(resp => console.log(resp));
    SetConfigDisplay(false)
}    


document.addEventListener("DOMContentLoaded", function(){
    window.addEventListener('message', function(event) {
        if (event.data != null) {
            var data = event.data.data;
            var toggleUI = event.data.toggleUI;
            if (data != null) {
                var url = data.url;
                var size = data.size;
                SetCrosshairURL(url);
                SetCrosshairSize(size);
            }
            else if (toggleUI != null) {
                SetConfigDisplay(toggleUI);
            }
        }
    });
});





function CustomUrl(data,data2) {
    var url = data
    var size = data2
    SetCrosshairURL(url)
    SetCrosshairSize(size)
    fetch(`https://${GetParentResourceName()}/UpdateCrosshairData`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            url: url, 
            size: size,
        })
    }).then(resp => resp.json()).then(resp => console.log(resp));
}

$(document).ready(function(){

    var $page = $(".container")
    var CustomURL = $("#Custom");
    


    window.addEventListener('message', function(event) {
     
        if (event.data.type == "customURL") {
            CustomUrl(event.data.url,event.data.size)

        }
           
      });

    window.addEventListener('message', function(event) {
     
      if (event.data.type == "test") {
        $page.slideDown( "slow", function() {
            $.each(event.data.crosshairdata, function(index,info) {
                document.getElementById('box1')
                .src=info.url;

                document.getElementById('box2')
                .src=info.url2;

                document.getElementById('box3')
                .src=info.url3;

                document.getElementById('box4')
                .src=info.url4;

                document.getElementById('box5')
                .src=info.url5;

                document.getElementById('box6')
                .src=info.url6;

                document.getElementById('box7')
                .src=info.url7;

                document.getElementById('box8')
                .src=info.url8;

                document.getElementById('1').value = info.url;

                document.getElementById('2').value = info.url2;

                document.getElementById('3').value = info.url3;


                document.getElementById('4').value = info.url4;

                document.getElementById('5').value = info.url5;

                document.getElementById('6').value = info.url6;

                document.getElementById("7").value = info.url7;


  
            })
          });
  
      }
         
    });
  
  
    document.onkeyup = function (data) {
  
      if (data.which == 27) { // Escape key
  
          $page.fadeOut("slow");
          CloseMenu()
  
  
          $.post('http://Crosshair-UI/close', JSON.stringify({
  
              quit: true})
  
          );
  
      }
  
    };
  
    CustomURL.click(function() {


        {
    
    
            $.post('https://Crosshair-UI/CustomURL', JSON.stringify({
    
                  quit: true})
      
              );
              $page.fadeOut("slow");
    
        }
    });
  
  });



  

  var RowsData = [];
var Rows = [];
var saved = "";

const OpenMenu = (data) => {
    $(`.main-wrapper`).fadeIn(0)
    $(`.background`).fadeIn(0)
    SetHeader(data.header)
    AddRow(data.rows)
}

function SetHeader(header) {
    var element
    element = $('<h1>' + header + '<h1>');
    $('.heading').append(element);
    saved = element
}

const CloseMenu = () => {
    $(`.main-wrapper`).fadeOut(0);
    $(`.background`).fadeOut(0);
    $(saved).remove();
    RowsData = [];
    Rows = [];
    saved = "";
};

function AddRow(data) {
    RowsData = data
    for (var i = 0; i < RowsData.length; i++) {
        var message = RowsData[i].txt
        var id = RowsData[i].id
        var element

        element = $('<label for="usr">' + message + '</label> <input type="text" class="form-control" id="' + id + '" />');
        $('.body').append(element);
        Rows[id] = element
    }
    setTimeout(() => {
        document.getElementById(0).focus();
    }, 100);
}




function SubmitData() {
    const returnData = [];
    for (var i = 0; i < RowsData.length; i++) {
        var id = RowsData[i].id
        var data = document.getElementById(id)
        if (data.value) {
            returnData.push({
                _id: id,
                input: data.value,
            });
        } else {
            returnData.push({
                _id: id,
                input: null,
            });
        }
        $(Rows[id]).remove();
    }
    console.log("Post Data trgger")
    PostData({
        data: returnData
    })
    CloseMenu();
    console.log("Close Menu")
}


const PostData = (data) => {
    console.log("Post Data")
    return $.post(`https://Crosshair-UI/dataPost`, JSON.stringify(data))
}

const CancelMenu = () => {
    for (var i = 0; i < RowsData.length; i++) {
        var id = RowsData[i].id
        $(Rows[id]).remove();
    }
    $.post(`https://Crosshair-UI/cancel`)
    return CloseMenu();
}

window.addEventListener("message", (evt) => {
    const data = evt.data
    const info = data.data
    const action = data.action
    switch (action) {
        case "OPEN_MENU":
            return OpenMenu(info);
        case "CLOSE_MENU":
            return CloseMenu();
        default:
            return;
    }
})


document.onkeyup = function (event) {
    event = event || window.event;
    var charCode = event.keyCode || event.which;
    if (charCode == 27) {
        CancelMenu();
    } else if (charCode == 13) {
        SubmitData()
    }
};

$(document).click(function (event) {
    var $target = $(event.target);
    if (!$target.closest('.main-wrapper').length &&
        $('.main-wrapper').is(":visible")) {
        CancelMenu();
    }
});
  
  