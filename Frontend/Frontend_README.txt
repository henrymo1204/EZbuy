

__How to run Frontend__

For first time setup in Frontend/ parent folder:
- install aframe (npm install aframe)
- install node_modules folder under Frontend/ (npm install express)
- install react-hook-form (npm i react-hook-form)
- update npm (npm update)

To run frontend with backend:
1. Start the backend first in a separate terminal
2. Start the frontend in a new terminal (npm start)
3. Done!

Known errors:
- "ENOSPC: System limit for number of file watchers reached" means you need to increase the number of file watchers for Linux (https://stackoverflow.com/questions/55763428/react-native-error-enospc-system-limit-for-number-of-file-watchers-reached)

- You may or may not need to run "npm install" in addition to running "npm install express". This has not been tested properly.