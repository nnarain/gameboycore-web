import os
import subprocess

# get this directory
DIR = os.path.dirname(os.path.realpath(__file__))

# collect sources
sources = []
for current_dir, dirs, files in os.walk(os.path.join(DIR, 'src')):
    # skip test code
    if 'tests' in dirs:
        dirs.remove('tests')
    if 'example' in dirs:
        dirs.remove('example')

    for f in files:
        ext = os.path.splitext(f)[1]
        if ext == '.cpp':
            sources.append(os.path.join(current_dir, f))

cmd = 'em++ '
for s in sources:
    cmd += (s + ' ')
cmd += ' -Isrc/gameboycore/include/ -std=c++11 -D__LITTLEENDIAN__ -Wno-format-security -o test.html'

subprocess.call(cmd, shell=True)
