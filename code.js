let wanted_cells = [
  'accountName', 'date', 'payeeName', 'outflow', 'inflow', 'memo'
];

function scaleBuilder (collector,item,idx) {
  console.log("item:", item, 'idx:', idx, "collector:", collector);
  collector[item] = idx;
  return collector
}

let weights = wanted_cells.reduce(scaleBuilder,{});
console.log("weights:", weights);

function fieldSorter (a, b) {
  let a_field = Array.from(a.classList).filter(cls => cls.match(/ynab-grid-cell-/))[0].match(/-(\w+)$/)[1];
  let b_field = Array.from(b.classList).filter(cls => cls.match(/ynab-grid-cell-/))[0].match(/-(\w+)$/)[1];
  let a_weight = weights[a_field];
  let b_weight = weights[b_field];
  console.log("a_field:", a_field, "a_weight:", a_weight,"b_field:", b_field,"b_weight:", b_weight);
  return weights[a_field] - weights [b_field];
}

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
a}

function getRowSummary(row, idx) {
  console.log('row:', row);
  let wanted_cells_selector = wanted_cells.map(
    c => ':scope > .ynab-grid-cell-' + c
  ).join(",");
  let cells = row.querySelectorAll(wanted_cells_selector);
  let sorted_cells = Array.from(cells).sort(fieldSorter);
  console.log("sorted_cells:", sorted_cells); /*FIXME-ben*/
  let header = (idx + 1).toString() + '. ';
  let fields = sorted_cells.map(getCellText).join(", ");
  return header + fields;
}

function getGridSummary() {
  let rows = document.querySelectorAll('[data-row-id]');
  header = "#. " + wanted_cells.join(", ");
  let lines = Array.from(rows).map(getRowSummary);
  lines.unshift(header);
  let summary = lines.join("\n");
  console.log("summary:\n", summary);
  navigator.clipboard.writeText(summary).then(function () {
    alert("copied to clipboard - summary:\n" + summary);
  });
}

getGridSummary()
