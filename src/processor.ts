import { initAfsuiProcessor } from './afsui.js';
import { initSsuiProcessor } from './ssui.js';

/**
 * Main processor initialization.
 */
export function main() {
  initAfsuiProcessor();
  initSsuiProcessor();
}

main();
