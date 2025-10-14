import { logger } from '../utils/logger';

export class ThemeService {
  public async install(id: string): Promise<void> {
    logger.warn(`Theme installation for '${id}' is not yet implemented.`);
    // Future logic:
    // 1. Fetch theme JSON from registry
    // 2. Write to `themesDir` from ignix.config.js
    // 3. Update `src/themes/index.ts` if applicable
  }
}
