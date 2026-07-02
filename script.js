function runEngine() {
    const style = document.getElementById('reportStyle').value;
    const out = document.getElementById('output');
    out.style.display = "block";
    out.innerText = "Analyzing Matrix in " + style.toUpperCase() + " mode...\n\nResult: 9th House Stellium detected. Venus-Venus Dasha trigger active. Relocation window: Feb 2027.";
    document.getElementById('dlBtn').style.display = "block";
}

function exportDoc() {
    const content = document.getElementById('output').innerText;
    const converted = htmlDocx.asBlob(`<html><body><pre>${content}</pre></body></html>`);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(converted);
    link.download = "LagneshMitra_Report.docx";
    link.click();
}
