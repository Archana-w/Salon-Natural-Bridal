@echo off
start cmd /k "cd /d admin && npm start"
start cmd /k "cd /d client && npm start"
start cmd /k "cd /d server && nodemon server"