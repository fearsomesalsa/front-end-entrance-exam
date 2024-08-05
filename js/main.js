import jsPDF from "jspdf";
import html2canvas from "html2canvas";

class Profile {
  constructor() {
    this.downloadButton = document.getElementById('download');
    this.downloadButton.addEventListener('click', this.exportAsPdf);

    this.profileBlocks = document.getElementsByClassName('block');
    for (const profileBlock of this.profileBlocks) {
      profileBlock.addEventListener('click', this.createRipple);
    }
  }

  async exportAsPdf() {
    await html2canvas(document.getElementById('profile'), {
        useCORS: true,
        allowTaint: true,
        scale: 2.5
    }).then((canvas) => {
        this.doc = new jsPDF('p', 'pt');
        const imgData = canvas.toDataURL('image/png');
        const imgProps= this.doc.getImageProperties(imgData);
        const pdfWidth = this.doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width; 
        this.doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    });

    this.doc.save('CV.pdf');
  }

  createRipple(event) {
    const circle = document.createElement('div');
    const blockWidth = this.offsetWidth;
    const blockHeight = this.offsetHeight;
    const circleDiameter = Math.max(blockWidth, blockHeight);
    const rect = event.currentTarget.getBoundingClientRect();
    circle.style.width = `${circleDiameter}px`;
    circle.style.height = `${circleDiameter}px`;
    circle.style.left = `${event.clientX - rect.left - circleDiameter / 2}px`;
    circle.style.top = `${event.clientY - rect.top - circleDiameter / 2}px`;
    circle.classList.add('ripple');
    this.appendChild(circle);
    setTimeout(() => {
      circle.remove();
    }, 1000);
  }
}

new Profile();
