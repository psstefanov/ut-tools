#!/usr/bin/env node

require('../lib/setEnv');
require('../lib/exec')('npm', ['run', 'test', '--silent']);
