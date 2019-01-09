#include <emscripten/bind.h>
#include <gameboycore/gameboycore.h>

#include <memory>
#include <string>
#include <functional>
#include <vector>
#include <cstdio>

using namespace gb;

namespace
{
    class GameboyCoreJs
    {
    public:
        GameboyCoreJs()
            : core_{std::make_unique<GameboyCore>()}
            , scanline_callback_{emscripten::val::null()}
        {
            core_->setScanlineCallback(std::bind(&GameboyCoreJs::scanlineCallback, this, std::placeholders::_1, std::placeholders::_2));
        }

        /**
         * Emulate a single frame for the ROM file
        */
        void emulateFrame()
        {
            core_->emulateFrame();
        }

        void setScanlineCallback(emscripten::val fn)
        {
            scanline_callback_ = fn;
        }

        bool loadROM(const uintptr_t handle, size_t length)
        {
            try
            {
                const auto buffer = reinterpret_cast<const uint8_t*>(handle);
                core_->loadROM(buffer, length);
            }
            catch(const std::runtime_error& e)
            {
                return false;
            }

            return true;
        }

        /**
         * This must be explicitly called as emscripten does not guarantee the class destructor is called.
        */
        void release()
        {
            core_.reset();
        }

    private:
        void scanlineCallback(const GPU::Scanline& scanline, int line)
        {
            //const std::vector<Pixel> data(scanline.begin(), scanline.end());
            scanline_callback_(scanline, line);
        }

        std::unique_ptr<GameboyCore> core_;

        // Javascript callback objects
        emscripten::val scanline_callback_;
    };

    // Create a recursize template struct to initialize all the indices of the provided array
    // This is done because emscripten::value_array::element requires a template int argument
    
    /**
     * Template struct for initializing array elements
    */
    template<typename ArrayT, size_t N>
    struct ArrayInitializer : public ArrayInitializer<ArrayT, N-1>
    {
        explicit ArrayInitializer(emscripten::value_array<ArrayT>& arr) : ArrayInitializer<ArrayT, N-1>{arr}
        {
            arr.element(emscripten::index<N-1>());
        }
    };

    template<typename ArrayT>
    struct ArrayInitializer<ArrayT, 0>
    {
        ArrayInitializer(emscripten::value_array<ArrayT>& arr)
        {
        }
    };
}

EMSCRIPTEN_BINDINGS(gameboycore)
{
    using namespace emscripten;

    // Register Pixel type
    value_object<Pixel>("Pixel")
        .field("r", &Pixel::r)
        .field("g", &Pixel::g)
        .field("b", &Pixel::b);

    // Register array of Pixels as a Scanline
    value_array<GPU::Scanline> scanline_value_array("Scanline");
    ArrayInitializer<GPU::Scanline, std::tuple_size<GPU::Scanline>::value>{scanline_value_array};

    register_vector<Pixel>("ScanlineVector");

    // Register scanline callback
    class_<GPU::RenderScanlineCallback>("ScanlineCallback")
        .constructor<>()
        .function("opcall", &GPU::RenderScanlineCallback::operator());

    // Register GameboyCore wrapper
    class_<GameboyCoreJs>("GameboyCore")
        .constructor<>()
        .function("release",             &GameboyCoreJs::release)
        .function("loadROM",             &GameboyCoreJs::loadROM)
        .function("emulateFrame",        &GameboyCoreJs::emulateFrame)
        .function("setScanlineCallback", &GameboyCoreJs::setScanlineCallback);
}

