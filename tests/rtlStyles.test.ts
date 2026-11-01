import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('Arabic RTL layout', () => {
    const styles = readFileSync(join(__dirname, '../src/styles/rtl.css'), 'utf8');

    it('pins the notification close control to the physical left on either modal surface', () => {
        expect(styles).toContain('.modal-container.zenith-notify-modal-window .modal-close-button');
        expect(styles).toContain('.modal.zenith-notify-modal-window .modal-close-button');
        expect(styles).toContain('inset-inline-end: auto !important');
    });

    it('anchors prayer labels to the right and isolates clock digits', () => {
        expect(styles).toContain('.zenith-prayer--widget button.zenith-prayer__tile--row');
        expect(styles).toContain('margin-right: 0 !important');
        expect(styles).toContain('unicode-bidi: isolate');
    });
});
