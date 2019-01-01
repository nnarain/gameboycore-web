#include <emscripten/bind.h>
#include <gameboycore/gameboycore.h>

#include <memory>

using namespace emscripten;
using namespace gb;

namespace
{
    class GameboyCoreJs
    {
    public:
        GameboyCoreJs()
            : core_{std::make_unique<GameboyCore>()}
        {
        }

        void release()
        {
            core_.reset();
        }

    private:
        std::unique_ptr<GameboyCore> core_;
    };
}

EMSCRIPTEN_BINDINGS(gameboycore)
{
    class_<GameboyCoreJs>("GameboyCore")
        .constructor<>()
        .function("release", &GameboyCoreJs::release);
}

