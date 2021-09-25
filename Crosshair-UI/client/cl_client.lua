RegisterNUICallback("UpdateCrosshairData", function(data)
    StoreCrosshairData(data)
end)

RegisterNUICallback("CloseCrosshairConfig", function(data)
    CloseCrosshairConfig()
end)

function SendCrosshairData(data)
    SendNUIMessage({
        data = data
    })
end

function OpenCrosshairConfig()
    SendNUIMessage({
        toggleUI = true
    })
    SetNuiFocus(true, true)
end

function CloseCrosshairConfig()
    SetNuiFocus(false, false)
end


Crosshair = {}

Citizen.CreateThread(function()
     for k,v in pairs(Tronix_Crosshair_URL) do
    table.insert(Crosshair, {url = Tronix_Crosshair_URL[1].url, url2 = Tronix_Crosshair_URL[2].url2, 
    url3 = Tronix_Crosshair_URL[3].url3, url4 = Tronix_Crosshair_URL[4].url4, url5 = Tronix_Crosshair_URL[5].url5, url6 = Tronix_Crosshair_URL[6].url6, url7 = Tronix_Crosshair_URL[7].url7,
    url8 = Tronix_Crosshair_URL[8].url8
     
})
end
end)

RegisterCommand(Tronix_Crosshair_Command, function()
     print(json.encode(Crosshair))
    OpenCrosshairMenu(true,Crosshair)

end, false)

function OpenCrosshairMenu(enable,data)

    SendNUIMessage({
        type = "test",
        enable = enable,
        crosshairdata = data
    })

    SetNuiFocus(true, true)
end

RegisterNUICallback('close', function(data, cb)
    SetTimecycleModifier('default')
    SetNuiFocus(false, false)
    cb('ok')
  end)


  RegisterNUICallback('CustomURL', function(data, cb)
    -- OpenCrosshairConfig()
    TriggerEvent("Set:Crosshair")
    cb('ok')
  end)























  local p = nil

  RegisterNUICallback("dataPost", function(data, cb)
      SetNuiFocus(false)
      p:resolve(data.data)
      p = nil
      cb("ok")
  end)
  
  RegisterNUICallback("cancel", function(data, cb)
      SetNuiFocus(false)
      p:resolve(nil)
      p = nil
      cb("ok")
  end)
  
  function KeyboardInput(data)
      Wait(150)
      if not data then return end
      if p then return end
      
      p = promise.new()
  
      SetNuiFocus(true, true)
      SendNUIMessage({
          action = "OPEN_MENU",
          data = data
      })
  
      return Citizen.Await(p)
  end
  
  exports("KeyboardInput", KeyboardInput)














  RegisterNetEvent("Set:Crosshair")
  AddEventHandler("Set:Crosshair", function()
      local shit = KeyboardInput({
          header = "Crosshair",
          rows = {
              {
                  id = 0,
                  txt = "URL"
              },
              {
                  id = 1,
                  txt = "Size"
              }
          }
      })
        print("Not Shit")
      if shit then
        print(shit[1].input,shit[2].input)
        SendNUIMessage({
            type = "customURL",
            url = shit[1].input,
            size = shit[2].input
        })

      end
  end)

































































