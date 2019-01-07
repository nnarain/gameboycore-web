#include <emscripten/bind.h>
#include <gameboycore/gameboycore.h>

#include <memory>
#include <string>
#include <sstream>
#include <iomanip>

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

        std::string loadROM(const uintptr_t handle, size_t length)
        {
            try
            {
                const auto buffer = reinterpret_cast<const uint8_t*>(handle);
                core_->loadROM(buffer, length);
            }
            catch(const std::runtime_error& e)
            {
                const std::string message{e.what()};
                return message;
            }

            return std::string{"Success"};
        }

        // std::string loadROM(const std::string buffer)
        // {
        //     try
        //     {
        //         core_->loadROM(reinterpret_cast<const uint8_t*>(buffer.data()), buffer.size());
        //     }
        //     catch(const std::runtime_error& e)
        //     {
        //         const std::string message{e.what()};
        //         return message;
        //     }

        //     return std::string{"Success"};
        // }

        /**
         * This must be explicitly called as emscripten does not guarantee the class destructor is called.
        */
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
        .function("release", &GameboyCoreJs::release)
        .function("loadROM", &GameboyCoreJs::loadROM);
}

