class Dialog {
  constructor(props) {
    this.initialProps = props;

    this.createDialogElm();
    this.fillDialog();

    this.openDialog();
  }

  createDialogElm() {
    this.elm = document.createElement('dialog');

    this.elm.classList.add('dialog');

    this.createDialogHeader();
    this.createDialogBody();

    this.initialProps.rootElm.appendChild(this.elm);
  }

  createDialogHeader() {
    this.dialogHeader = { elm: document.createElement('div') };

    this.dialogHeader.elm.classList.add('dialog-header');

    if (this.initialProps.title) {
      this.dialogHeader.titleElm = document.createElement('span');

      this.dialogHeader.titleElm.classList.add('dialog-header-title');
      this.dialogHeader.titleElm.innerHTML = this.initialProps.title;
      this.dialogHeader.elm.appendChild(this.dialogHeader.titleElm);
    }


    this.createDialogClose();

    this.elm.appendChild(this.dialogHeader.elm);
  }

  createDialogClose() {
    if (this.initialProps.showCloseButton) {
      this.dialogHeader.closeButtonElm = document.createElement('span');

      this.dialogHeader.closeButtonElm.classList.add('dialog-header-close');
      this.dialogHeader.closeButtonElm.innerHTML = '&times;'
      this.dialogHeader.elm.appendChild(this.dialogHeader.closeButtonElm);

      this.dialogHeader.closeButtonElm.addEventListener('click', () => {
        this.elm.close();
      });
    }
  }

  createDialogBody() {
    this.dialogBody = { elm: document.createElement('form') };

    this.dialogBody.elm.classList.add('dialog-body');

    this.elm.appendChild(this.dialogBody.elm);
  }

  fillDialog() {
    this.dialogBody.elm.innerHTML = this.initialProps.body || '';

  }

  openDialog() {
    this.elm.showModal(); // что бы работал css ::backdrop
  }
}
