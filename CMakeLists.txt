cmake_minimum_required(VERSION 3.0.0)

project(gameboycore-web)

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${PROJECT_BINARY_DIR}/bin")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "${PROJECT_BINARY_DIR}/bin")
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "${PROJECT_BINARY_DIR}/bin")

########################################################################################################################
### Add external dependencies                                                                                        ###
########################################################################################################################

add_subdirectory(src/external)

########################################################################################################################
### GameboyCore Web                                                                                                  ###
########################################################################################################################

find_package(Magnum REQUIRED GL Sdl2Application)

set(GAMEBOYCORE_WEB_HEADERS
    include/gameboycore_web.hpp
)

set(GAMEBOYCORE_WEB_SOURCES
    src/gameboycore_web.cpp
)

add_executable(${PROJECT_NAME}
    ${GAMEBOYCORE_WEB_HEADERS}
    ${GAMEBOYCORE_WEB_SOURCES}
)

target_include_directories(${PROJECT_NAME} PRIVATE
    include/
)

target_link_libraries(${PROJECT_NAME} PRIVATE
    gameboycore::gameboycore

    Magnum::Application
    Magnum::GL
    Magnum::Magnum
)
