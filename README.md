# Tlon

## Usage
On one computer, run `node server_1.js` and visit [localhost:7000](http://localhost:7000).

On another computer, run `node server_2.js` and visit [localhost:7001](http://localhost:7001).

## Restarting server
If you end up having to troubleshoot the server, ssh into it and:
```bash
screen -r # reattach to screen session
# check server status, maybe restart it, maybe you made a change and have to run git pull or npm install or something
# press CTRL+A then CTRL+D to exit the `screen` session
exit # to leave ssh
```

## Installation

### Noun Subtractor Client
No installation necessary.

### Noun Subtractor Server
ssh into the server and:
```bash
git clone https://github.com/Smoothiez/tlon.git
cd tlon
npm install
cd server
screen -r # check if a screen session is already running, if not just run `screen`
node server.js
# press CTRL+A then CTRL+D to exit the `screen` session
exit # to leave ssh
```

### Emotion Detector
~~~
pip install --user keras==2.2.4 tensorflow==1.13.1 flask opencv-python
~~~
Note: opencv requires cmake
