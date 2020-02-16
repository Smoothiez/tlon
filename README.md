# Tlon

## Installation

### Client

#### Python
~~~
pip install --user keras==2.2.4 tensorflow==1.13.1 flask opencv-python python-socketio[client]
~~~

#### Node
~~~
npm install express opencv4nodejs socket.io-client
~~~

#### Cmake
opencv requires cmake.

For mac:
~~~
brew install cmake
~~~

### Server
~~~
npm install express socket.io
~~~

## Usage

### Client
Flask
~~~
python -m flask run -h 0.0.0.0 -p 5000
~~~

Node
~~~
node server.js
~~~

### Server
~~~
node server.js
~~~
