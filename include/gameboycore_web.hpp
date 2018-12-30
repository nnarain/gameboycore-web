#pragma once

#include <Magnum/Platform/Sdl2Application.h>

class GameboyCoreWebApplication : public Magnum::Platform::Application
{
public:
    GameboyCoreWebApplication(const Arguments& arguments);

private:
    void drawEvent() override;
};