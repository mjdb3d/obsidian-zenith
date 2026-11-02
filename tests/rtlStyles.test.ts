import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// Guards the direction-sensitive selectors used by the notification modal and prayer widget.
describe('Arabic RTL layout', () => {
    const styles = readFileSync(join(__dirname, '../src/styles/rtl.css'), 'utf8');
    const modal = readFileSync(join(__dirname, '../src/core/notifications/NotificationCenterModal.ts'), 'utf8');
    const prayerWidget = readFileSync(join(__dirname, '../src/modules/prayer/components/PrayerWidget.tsx'), 'utf8');
    const todayWidget = readFileSync(join(__dirname, '../src/modules/journal/components/TodayWidget.tsx'), 'utf8');
    const ritualModal = readFileSync(join(__dirname, '../src/modules/journal/RitualModal.ts'), 'utf8');

    it('pins the notification close control to the physical left on either modal surface', () => {
        expect(styles).toContain('.modal-container.zenith-notify-modal-window .modal-close-button');
        expect(styles).toContain('.modal.zenith-notify-modal-window .modal-close-button');
        expect(styles).toContain('.zenith-notify-modal__close');
        expect(styles).toContain('inset-inline-end: auto');
        expect(modal).toContain("this.containerEl.querySelector<HTMLElement>(");
        expect(modal).toContain("'.modal-close-button, .modal-header-button'");
        expect(modal).toContain("addClass('zenith-notify-modal__close')");
    });

    it('anchors prayer labels to the right and isolates clock digits', () => {
        expect(styles).toContain('.zenith-prayer--widget button.zenith-prayer__tile--row');
        expect(styles).toContain('margin-inline-end: auto;');
        expect(styles).toContain('margin-inline-start: auto;');
        expect(styles).toContain('.zenith-prayer__counter');
        expect(styles).toContain('display: flex;');
        expect(styles).toContain('flex: 1 1 auto;');
        expect(styles).toContain('text-align: center;');
        expect(prayerWidget).toContain('className="zenith-prayer__summary"');
        expect(styles).toContain('unicode-bidi: isolate');
    });
    it('aligns the Today ritual row and ritual dialog for Arabic', () => {
        expect(styles).toContain('.zenith-today__day {');
        expect(styles).toContain('transform: scaleX(-1);');
        expect(styles).toContain('text-align: right;');
        expect(todayWidget).toContain('<ChevronRight size={15} className="zenith-today__go"');
        expect(ritualModal).toContain("this.containerEl.querySelector<HTMLElement>(");
        expect(ritualModal).toContain("addClass('zenith-ritual-modal__close')");
        expect(styles).toContain('.modal.zenith-ritual-modal-window .zenith-ritual-modal__close');
        expect(styles).toContain('.zenith-ritual__task');
        expect(styles).toContain('padding-left: 28px;');
    });
});
