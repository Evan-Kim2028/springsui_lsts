import { initAfsuiProcessor } from './afsui.js';
import { initSsuiProcessor } from './ssui.js';
import { initHaSuiProcessor } from './hasui.js';
import { initVSuiProcessor } from './vsui.js'
import { initValidatorProcessor } from './validator_set.js';
import { initStSuiProcessor } from './stsui.js';
/**
 * Main processor initialization.
 */
export function main() {
  initAfsuiProcessor();
  initSsuiProcessor();
  initHaSuiProcessor();
  initVSuiProcessor();
  initValidatorProcessor();
  initStSuiProcessor();
}

main();
