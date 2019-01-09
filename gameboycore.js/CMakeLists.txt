########################################################################################################################
### This is a Emscripten build for gameboycore-web
### Must invoke with CMAKE_TOOLCHAIN_FILE=$EMSCRIPTEN/cmake/Modules/Platform/Emscripten.cmake
########################################################################################################################

cmake_minimum_required(VERSION 3.0.0)

project(gameboycore-web)

set(CMAKE_CXX_STANDARD 14)

set(EMSDK_ROOT $ENV{EMSCRIPTEN})
set(CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH} "${EMSDK_ROOT}/cmake/Modules")
set(CMAKE_PREFIX_PATH ${CMAKE_PREFIX_PATH} "${EMSDK_ROOT}/cmake/Modules")

########################################################################################################################
### External Dependencies                                                                                            ###
########################################################################################################################

add_subdirectory(src/external)

########################################################################################################################
### GameboyCore Web                                                                                                  ###
########################################################################################################################

add_executable(${PROJECT_NAME}
    src/gameboycore_web.cpp
)

target_link_libraries(${PROJECT_NAME}
    # Link to GameboyCore
    gameboycore::gameboycore

    # Emscripten compiler options
    "-o ${CMAKE_CURRENT_SOURCE_DIR}/dist/gameboycore.js"
    "--bind"
    "-s WASM=1"
    "-s DISABLE_EXCEPTION_CATCHING=0"
    "-s ALLOW_MEMORY_GROWTH=1"
)

target_compile_definitions(${PROJECT_NAME} PRIVATE GAMEBOYCORE_STATIC=1)
