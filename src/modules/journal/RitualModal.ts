import { Modal, type App } from 'obsidian';
import { createRoot, type Root } from 'react-dom/client';
import { createElement } from 'react';
import { AppContext } from '../../context/AppContext';
import { translateNow } from '../../core/i18n';
import type ZenithPlugin from '../../main';
import { RitualBody } from './components/RitualBody';
import type { RitualKind } from './services/rituals';

/** The morning or evening ritual, in an Obsidian modal so a command can open it from anywhere. */
export class RitualModal extends Modal {
    private root: Root | null = null;

    constructor(
        app: App,
        private readonly plugin: ZenithPlugin,
        private readonly kind: RitualKind
    ) {
        super(app);
    }

    onOpen(): void {
        this.titleEl.setText(translateNow(`ritual.${this.kind}.title`));
        this.containerEl.addClass('zenith-ritual-modal-window');
        this.modalEl.addClass('zenith-ritual-modal', 'zenith-ritual-modal-window');
        const nativeClose = this.containerEl.querySelector<HTMLElement>(
            '.modal-close-button, .modal-header-button'
        );
        if (nativeClose) {
            nativeClose.addClass('zenith-ritual-modal__close');
        } else {
            const close = this.modalEl.createEl('button', {
                cls: 'modal-close-button zenith-ritual-modal__close',
                attr: { type: 'button', 'aria-label': translateNow('a11y.close') },
            });
            close.setText('×');
            close.addEventListener('click', () => this.close());
        }
        const { contentEl } = this;
        contentEl.empty();
        contentEl.addClass('zenith-root');
        this.root = createRoot(contentEl.createDiv());
        this.root.render(
            createElement(
                AppContext.Provider,
                { value: { app: this.app, plugin: this.plugin } },
                createElement(RitualBody, { kind: this.kind })
            )
        );
    }

    onClose(): void {
        // Unmounted on a task of its own: `close()` is called from inside the
        // tree, and React will not unmount a root mid-render.
        const root = this.root;
        this.root = null;
        window.setTimeout(() => root?.unmount(), 0);
        this.contentEl.empty();
    }
}
