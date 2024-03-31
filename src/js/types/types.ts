export type dialogProps = {
    rootElm: HTMLElement;
    title: string;
    showCloseButton: boolean;
    body: HTMLElement;
}

export type dialogHeader = {
    elm: HTMLElement;
    titleElm: HTMLElement;
    closeButtonElm: HTMLElement;
}

export type dialogBody = {
    elm: HTMLElement;
}