# Run code
To run code
```
docker run --rm -it -p 3000:3000  -v $(PWD):/tmp/code node bash 
cd /tmp/code
node server.js
```
