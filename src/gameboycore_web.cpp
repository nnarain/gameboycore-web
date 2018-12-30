#include "gameboycore_web.hpp"

#include <Magnum/GL/DefaultFramebuffer.h>
#include <Magnum/GL/Renderer.h>
#include <Magnum/Math/Color.h>

GameboyCoreWebApplication::GameboyCoreWebApplication(const Arguments& arguments)
    : Magnum::Platform::Application{ arguments, Configuration{}.setTitle("GameboyCoreWeb").setSize({1280,960}) }
{
    using namespace Magnum::Math::Literals;
    Magnum::GL::Renderer::setClearColor({ 0xFF, 0x00, 0x00, 0xFF });
}

void GameboyCoreWebApplication::drawEvent()
{
    Magnum::GL::defaultFramebuffer.clear(Magnum::GL::FramebufferClear::Color);

    swapBuffers();
}

MAGNUM_APPLICATION_MAIN(GameboyCoreWebApplication)
