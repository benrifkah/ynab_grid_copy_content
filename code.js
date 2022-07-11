
let wanted_cells = [
  'date', 'payeeName', 'outflow', 'inflow'
];

function getCellText(cell) {
  let span = cell.querySelector('span');
  let text = '';
  if (span) {
    text = span.innerText;
  } else {
    text = cell.innerText;
  }
  console.log('  text:', text);
  return text;
}

function getRowSummary(row, idx) {
  console.log('row:', row);
  let wanted_cells_selector = wanted_cells.map(
    c => ':scope > .ynab-grid-cell-' + c
  ).join(",");
  let cells = row.querySelectorAll(wanted_cells_selector);
  let header = (idx + 1).toString() + '. ';
  let fields = Array.from(cells).map(getCellText).join(", ");
  return header + fields;
}

function getGridSummary() {
  let rows = document.querySelectorAll('[data-row-id]');
  header = wanted_cells.join(", ");
  let lines = Array.from(rows).map(getRowSummary);
  lines.unshift(header);
  let summary = lines.join("\n");
  console.log('summary:', summary);
  navigator.clipboard.writeText(summary).then(function () {
    alert("copied to clipboard - summary:\n" + summary);
  });
}

getGridSummary()
