# GameboyCore Web

Running GameboyCore in a Web environment.


Build
-----

```
cd path/to/emscripten
emsdk activate latest

cd path/to/gameboycore-web
mkdir build && cd build

cmake .. -DCMAKE_TOOLCHAIN_FILE=$EMSCRIPTEN/cmake/Modules/Platform/Emscripten.cmake
cmake --build .
```
