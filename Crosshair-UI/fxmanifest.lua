-- .___________..______        ______   .__   __.  __  ___   ___ 
-- |           ||   _  \      /  __  \  |  \ |  | |  | \  \ /  / 
-- `---|  |----`|  |_)  |    |  |  |  | |   \|  | |  |  \  V  /  
--     |  |     |      /     |  |  |  | |  . `  | |  |   >   <   
--     |  |     |  |\  \----.|  `--'  | |  |\   | |  |  /  .  \  
--     |__|     | _| `._____| \______/  |__| \__| |__| /__/ \__\ 




fx_version 'adamant'
games { 'rdr3', 'gta5' }


description 'Crosshair'

version '1.0'

server_scripts {
	'server/sv_*.lua',

}

client_scripts {
	'config.lua',
	'client/cl_*.lua',
}

ui_page('html/index.html')

files {
	'html/index.html',
	'html/style.css',
	'html/main.js'
}


ui_page_preload 'yes'

