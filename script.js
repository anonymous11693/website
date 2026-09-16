const dash = "—";

const capabilities = {
  generation: {
    defaultVariant: "conditioned-generation",
    submodeLabel: "Generation capability",
    variants: {
      "conditioned-generation": {
        index: "01 / 03",
        tag: "Autoregressive LiDAR generation",
        shortTitle: "HD-Map-conditioned generation",
        title: "HD-Map-conditioned generation",
        description: "With no observed scene geometry, scene-level conditions guide new-world synthesis while a rolling spatial cache is built from generated sweeps.",
        inputs: {
          lidar: { value: "Optional LiDAR prefix", active: true, optional: true },
          geometry: { value: "Rolling PSC · generated", active: true },
          hdmap: { value: "HD-Map + actor layout", active: true },
          pose: { value: "Requested sensor poses", active: true }
        },
        output: "Generated LiDAR world",
        outputDetail: "Long-horizon causal rollout",
        videoAspect: "1280 / 684",
        videoLabels: ["Input HD-Map", "Ours", "LaGen", "Sensor2Sensor"],
        media: [
          { label: "01", src: "assets/generation/hdmap-generation-01.mp4", title: "89454214745557131_3160_000_3180_000" },
          { label: "02", src: "assets/generation/hdmap-generation-02.mp4", title: "346889320598157350_798_187_818_187" },
          { label: "03", src: "assets/generation/hdmap-generation-03.mp4", title: "3015436519694987712_1300_000_1320_000" },
          { label: "04", src: "assets/generation/hdmap-generation-04.mp4", title: "4575389405178805994_4900_000_4920_000" }
        ]
      }
    }
  },
  forecasting: {
    defaultVariant: "forecasting",
    variants: {
      forecasting: {
        index: "02 / 03",
        tag: "LiDAR forecasting",
        title: "LiDAR forecasting",
        description: "An observed LiDAR prefix supplies recent scene state and motion; the same causal model predicts future sweeps without a forecasting head.",
        inputs: {
          lidar: { value: "Observed LiDAR prefix", active: true },
          geometry: { value: "Rolling PSC · history", active: true },
          hdmap: { value: "None", active: false },
          pose: { value: "Provided future ego poses", active: true }
        },
        output: "Forecast LiDAR",
        outputDetail: "Future point-cloud sequence",
        videoAspect: "1280 / 648",
        videoLabels: ["Ground Truth", "Ours", "4D-Occ", "UnO"],
        media: [
          { label: "01", src: "assets/forecasting/forecasting-01.mp4", title: "Log 27 · 12496433400137459534_120_000_140_000" },
          { label: "02", src: "assets/forecasting/forecasting-02.mp4", title: "Log 14 · 11356601648124485814_409_000_429_000" },
          { label: "03", src: "assets/forecasting/forecasting-03.mp4", title: "Log 28 · 12657584952502228282_3940_000_3960_000" }
        ]
      }
    }
  },
  resimulation: {
    defaultVariant: "same-trajectory",
    variants: {
      "same-trajectory": {
        index: "03 / 03",
        tag: "Generalizable LiDAR resimulation",
        title: "Generalizable LiDAR resimulation",
        description: "Sparse observed sweeps build a frozen-dynamic spatial cache that anchors the captured world for novel-view rendering without per-scene optimization.",
        inputs: {
          lidar: { value: "Sparse observed sweeps", active: true },
          geometry: { value: "Frozen-dynamic PSC", active: true },
          hdmap: { value: "None", active: false },
          pose: { value: "Novel target poses", active: true }
        },
        output: "Resimulated LiDAR",
        outputDetail: "Target-view sensor observation",
        videoAspect: "1280 / 684",
        videoLabels: ["Ground Truth", "Ours", "LiDAR-RT", "SplatAD"],
        media: [
          { label: "01", src: "assets/resimulation/same-trajectory-01.mp4", title: "Log 14 · 2506799708748258165_6455_000_6475_000" },
          { label: "02", src: "assets/resimulation/same-trajectory-02.mp4", title: "Log 17 · 5372281728627437618_2005_000_2025_000" },
          { label: "03", src: "assets/resimulation/same-trajectory-03.mp4", title: "Log 20 · 9164052963393400298_4692_970_4712_970" }
        ]
      }
    }
  }
};

const interactiveDemoModes = {
  conditional: {
    label: "Full-map conditioning",
    assetPrefix: "conditional",
    leftLabel: "Full HD-Map + ego action",
    rightLabel: "Generated LiDAR",
    conditioning: "Full HD-Map and ego action"
  },
  world: {
    label: "First-frame conditioning",
    assetPrefix: "world",
    leftLabel: "First-frame HD-Map + ego action",
    rightLabel: "Generated LiDAR",
    conditioning: "Static first-frame HD-Map and ego action"
  }
};

const interactiveDemoLogs = [
  {
    number: "01",
    id: "11356601648124485814_409_000_429_000",
    actions: [
      { key: "straight", label: "Straight" },
      { key: "turn_left", label: "Turn left" },
      { key: "turn_right", label: "Turn right" }
    ]
  },
  {
    number: "02",
    id: "1024360143612057520_3580_000_3600_000",
    actions: [
      { key: "straight", label: "Straight" },
      { key: "turn_left", label: "Turn left" },
      { key: "turn_right", label: "Turn right" }
    ]
  },
  {
    number: "03",
    id: "10335539493577748957_1372_870_1392_870",
    actions: [
      { key: "straight", label: "Straight" },
      { key: "turn_left", label: "Turn left" }
    ]
  },
  {
    number: "04",
    id: "11037651371539287009_77_670_97_670",
    actions: [
      { key: "straight", label: "Straight" },
      { key: "turn_left", label: "Turn left" },
      { key: "turn_right", label: "Turn right" }
    ]
  },
  {
    number: "05",
    id: "11048712972908676520_545_000_565_000",
    actions: [
      { key: "straight", label: "Straight" },
      { key: "turn_left", label: "Turn left" },
      { key: "turn_right", label: "Turn right" },
    ]
  }
];

const tables = {
  vaeComparison: {
    headerGroups: [
      { label: "Method", rowSpan: 2 },
      { label: "ST compression", rowSpan: 2 },
      { label: "Reconstruction", colSpan: 3 },
      { label: "Generation", colSpan: 3 },
      { label: "TTCE", colSpan: 2 },
      { label: "CTC", colSpan: 2 },
      { label: "ICP Avg.", rowSpan: 2 },
      { label: "TFLOPs / frame", rowSpan: 2 }
    ],
    subHeaders: ["CD ↓", "L1 ↓", "AbsRel ↓", "JSD ↓", "MMD ↓", "FUD ↓", "@3 ↓", "@4 ↓", "@3 ↓", "@4 ↓"],
    rows: [
      { group: "ST compression · 256×" },
      ["Cosmos CV", "8×8×4", "0.439", "0.790", "0.031", "0.061", "6.410", "46.260", "1.773", "2.561", "0.322", "0.357", "0.089", "0.058"],
      ["Wan2.1", "8×8×4", "0.297", "0.395", "0.017", "0.057", "5.720", "37.520", "1.983", "2.832", "0.337", "0.381", "0.077", "0.911"],
      ["Ours", "16×16×1", "0.175", "0.143", "0.008", "0.061", "6.870", "32.840", "1.729", "2.492", "0.311", "0.357", "0.072", "0.400"],
      { group: "ST compression · 32× / 64×" },
      ["LiDM", "4×8×1", "0.297", "0.371", "0.016", "0.057", "5.480", "36.220", "1.696", "2.477", "0.315", "0.352", "0.088", "0.212"],
      ["Cosmos LiDARGen", "8×8×1", "0.384", "0.609", "0.025", "0.062", "7.990", "85.370", "1.738", "2.523", "0.304", "0.338", "0.085", "0.302"],
      ["Ours", "8×8×1", "0.115", "0.072", "0.005", "0.065", "9.140", "18.170", "1.681", "2.463", "0.294", "0.339", "0.059", "0.250"]
    ]
  },
  vaeAblation: {
    headerGroups: [
      { label: "Backbone", rowSpan: 2 },
      { label: "Reconstruction", colSpan: 3 },
      { label: "Generation", colSpan: 3 },
      { label: "TFLOPs / frame", rowSpan: 2 }
    ],
    subHeaders: ["L1 ↓", "CD ↓", "AbsRel ↓", "FUD ↓", "CTC@4 ↓", "TTCE@4 ↓"],
    rows: [
      ["Convolution", "0.297", "0.278", "0.015", "26.540", "0.341", "2.496", "0.575"],
      ["Attention", "0.072", "0.115", "0.005", "18.170", "0.339", "2.463", "0.250"]
    ]
  },
  generation: {
    headerRows: [
      [
        { label: "Method", rowSpan: 2 },
        { label: "Sampling\nsteps", rowSpan: 2 },
        { label: "JSD ↓", rowSpan: 2 },
        { label: "MMD ↓", rowSpan: 2 },
        { label: "FUD ↓", rowSpan: 2 },
        { label: "TTCE ↓", colSpan: 2 },
        { label: "CTC ↓", colSpan: 4 },
        { label: "ICP Avg. ↓", rowSpan: 2 },
        { label: "FPS ↑", rowSpan: 2 }
      ],
      [
        { label: "3" }, { label: "4" },
        { label: "1" }, { label: "2" }, { label: "3" }, { label: "4" }
      ]
    ],
    rows: [
      { group: "HD-Map-conditioned generation" },
      ["LiDARCrafter", "256", "0.065", "14.13", "97.24", "1.263", "1.989", "0.278", "0.360", "0.441", "0.519", "0.120", "0.127"],
      ["LaGen*", "35", "0.075", "19.19", "50.29", "1.584", "2.296", "0.205", "0.268", "0.330", "0.390", "0.071", "0.402"],
      ["Sensor2Sensor*", "35", "0.047", "5.210", "37.96", "1.522", "2.236", "0.225", "0.287", "0.347", "0.404", "0.081", "0.421"],
      ["Ours", "4", "0.046", "4.390", "25.01", "1.491", "2.255", "0.210", "0.253", "0.293", "0.331", "0.068", "11.18"],
      { group: "Interactive action-conditioned generation" },
      ["LiDARCrafter*", "256", "0.137", "54.383", "70.38", "1.313", "2.063", "0.258", "0.335", "0.410", "0.483", "0.104", "0.135"],
      ["LaGen*", "35", "0.064", "12.51", "42.31", "1.913", "2.621", "0.256", "0.362", "0.460", "0.550", "0.074", "0.754"],
      ["Ours", "4", "0.054", "7.391", "24.17", "1.517", "2.280", "0.213", "0.260", "0.305", "0.347", "0.068", "11.30"]
    ]
  },
  forecasting: {
    headerGroups: [
      { label: "Method", rowSpan: 2 },
      { label: "1 second", colSpan: 3 },
      { label: "2 seconds", colSpan: 3 },
      { label: "3 seconds", colSpan: 3 },
      { label: "Aggregated", colSpan: 3 }
    ],
    subHeaders: ["L1 ↓", "AbsRel ↓", "CD ↓", "L1 ↓", "AbsRel ↓", "CD ↓", "L1 ↓", "AbsRel ↓", "CD ↓", "L1 ↓", "AbsRel ↓", "CD ↓"],
    rows: [
      ["Ray trace", "2.461", "0.171", "1.584", "3.161", "0.217", "3.343", "3.768", "0.251", "6.049", "2.807", "0.193", "2.739"],
      ["4D-Occ", "2.146", "0.113", "2.173", "2.602", "0.139", "3.230", "3.052", "0.170", "4.575", "2.369", "0.126", "2.924"],
      ["UnO*", "2.040", "0.112", "1.000", "2.300", "0.130", "1.117", "2.654", "0.165", "1.440", "2.208", "0.126", "1.070"],
      ["Ours", "1.482", "0.090", "0.485", "2.104", "0.126", "0.805", "2.554", "0.156", "1.328", "1.768", "0.108", "0.676"]
    ]
  },
  resimulation: {
    headerRows: [
      [
        { label: "Method", rowSpan: 3 },
        { label: "All-202 (first window)", colSpan: 6 },
        { label: "Dense top-20 (180 windows)", colSpan: 6 },
        { label: "Optim.\ntime ↓", rowSpan: 3 },
        { label: "Real-time\nrender", rowSpan: 3 }
      ],
      [
        { label: "Interpolation", colSpan: 2 },
        { label: "Extrapolation", colSpan: 2 },
        { label: "Aggregate", colSpan: 2 },
        { label: "Interpolation", colSpan: 2 },
        { label: "Extrapolation", colSpan: 2 },
        { label: "Aggregate", colSpan: 2 }
      ],
      [
        { label: "L1 ↓" }, { label: "CD ↓" },
        { label: "L1 ↓" }, { label: "CD ↓" },
        { label: "L1 ↓" }, { label: "CD ↓" },
        { label: "L1 ↓" }, { label: "CD ↓" },
        { label: "L1 ↓" }, { label: "CD ↓" },
        { label: "L1 ↓" }, { label: "CD ↓" }
      ]
    ],
    rows: [
      ["LiDAR4D", "1.129", "0.188", "1.881", "0.460", "1.364", "0.273", "1.999", "0.998", "3.284", "1.769", "2.401", "1.239", "89.8", "✕"],
      ["LiDAR-RT", "1.089", "0.182", "1.593", "0.418", "1.247", "0.256", "1.905", "0.444", "3.094", "1.292", "2.277", "0.709", "76.3", "✓"],
      ["SplatAD", "1.799", "0.265", "2.325", "0.408", "1.964", "0.309", "3.125", "0.357", "4.654", "0.947", "3.603", "0.542", "15.0", "✓"],
      ["Ours (bidir)", "1.124", "0.169", "1.376", "0.270", "1.202", "0.200", "1.399", "0.184", "1.838", "0.354", "1.536", "0.237", "0.00", "✕"],
      ["Ours", "1.279", "0.235", "1.682", "0.397", "1.405", "0.285", "1.593", "0.260", "2.215", "0.370", "1.787", "0.294", "0.00", "✓"]
    ]
  }
};

const resultPlots = {
  tokenizer: {
    context: "Tokenizer",
    metrics: [
      { key: "fud", label: "FUD", detail: "Generation quality · lower is better" },
      { key: "icp", label: "ICP Avg.", detail: "Temporal alignment · lower is better" },
      { key: "l1", label: "L1", detail: "Reconstruction error · lower is better" },
      { key: "cd", label: "CD", detail: "Reconstruction Chamfer distance · lower is better" }
    ],
    groups: [
      {
        label: "ST compression · 256×",
        shortLabel: "256×",
        rows: [
          { label: "Cosmos CV", values: { fud: "46.260", icp: "0.089", l1: "0.790", cd: "0.439" } },
          { label: "Wan2.1", values: { fud: "37.520", icp: "0.077", l1: "0.395", cd: "0.297" } },
          { label: "Ours", values: { fud: "32.840", icp: "0.072", l1: "0.143", cd: "0.175" } }
        ]
      },
      {
        label: "ST compression · 32× / 64×",
        shortLabel: "32× / 64×",
        rows: [
          { label: "LiDM", values: { fud: "36.220", icp: "0.088", l1: "0.371", cd: "0.297" } },
          { label: "Cosmos LiDARGen", values: { fud: "85.370", icp: "0.085", l1: "0.609", cd: "0.384" } },
          { label: "Ours", values: { fud: "18.170", icp: "0.059", l1: "0.072", cd: "0.115" } }
        ]
      }
    ]
  },
  generation: {
    context: "Generation",
    metrics: [
      { key: "fud", label: "FUD", detail: "Distributional quality · lower is better" },
      { key: "icp", label: "ICP Avg.", detail: "Temporal alignment · lower is better" }
    ],
    groups: [
      {
        label: "HD-Map-conditioned generation",
        shortLabel: "HD-Map",
        rows: [
          { label: "LiDARCrafter", values: { fud: "97.24", icp: "0.120" } },
          { label: "LaGen*", values: { fud: "50.29", icp: "0.071" } },
          { label: "Sensor2Sensor*", values: { fud: "37.96", icp: "0.081" } },
          { label: "Ours", values: { fud: "25.01", icp: "0.068" } }
        ]
      },
      {
        label: "Interactive action-conditioned generation",
        shortLabel: "Interactive",
        rows: [
          { label: "LiDARCrafter*", values: { fud: "70.38", icp: "0.104" } },
          { label: "LaGen*", values: { fud: "42.31", icp: "0.074" } },
          { label: "Ours", values: { fud: "24.17", icp: "0.068" } }
        ]
      }
    ]
  },
  forecasting: {
    context: "Forecasting",
    metrics: [
      { key: "l1", label: "L1", detail: "Forecast error over time · lower is better" },
      { key: "cd", label: "CD", detail: "Forecast error over time · lower is better" }
    ],
    timeSeries: {
      steps: ["0", "1", "2", "3"],
      rows: [
        { label: "Ray trace", values: { l1: ["0", "2.461", "3.161", "3.768"], cd: ["0", "1.584", "3.343", "6.049"] } },
        { label: "4D-Occ", values: { l1: ["0", "2.146", "2.602", "3.052"], cd: ["0", "2.173", "3.230", "4.575"] } },
        { label: "UnO*", values: { l1: ["0", "2.040", "2.300", "2.654"], cd: ["0", "1.000", "1.117", "1.440"] } },
        { label: "Ours", values: { l1: ["0", "1.482", "2.104", "2.554"], cd: ["0", "0.485", "0.805", "1.328"] } }
      ]
    }
  },
  resimulation: {
    context: "Resimulation",
    metrics: [
      { key: "l1", label: "L1", detail: "Aggregate · all points · lower is better" },
      { key: "cd", label: "CD", detail: "Aggregate · all points · lower is better" }
    ],
    groups: [
      {
        label: "Novel-view rendering",
        rows: [
          { label: "LiDAR4D", values: { l1: "1.364", cd: "0.273" } },
          { label: "LiDAR-RT", values: { l1: "1.247", cd: "0.256" } },
          { label: "SplatAD", values: { l1: "1.964", cd: "0.309" } },
          { label: "Ours (bidir)", values: { l1: "1.202", cd: "0.200" } },
          { label: "Ours", values: { l1: "1.405", cd: "0.285" } }
        ]
      }
    ]
  }
};

function isOurs(label) {
  return /ours|^attention$/i.test(String(label));
}

function renderTable(targetId, data) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const table = document.createElement("table");
  if (data.columnWidths) {
    table.classList.add("has-column-widths");
    const colgroup = document.createElement("colgroup");
    data.columnWidths.forEach((width) => {
      const col = document.createElement("col");
      col.style.width = width;
      colgroup.appendChild(col);
    });
    table.appendChild(colgroup);
  }
  const thead = document.createElement("thead");
  const appendHeaderCell = (row, header) => {
    const th = document.createElement("th");
    th.scope = header.colSpan ? "colgroup" : "col";
    const labelLines = header.label.split("\n");
    labelLines.forEach((line, index) => {
      if (index) th.appendChild(document.createElement("br"));
      th.append(line);
    });
    if (header.colSpan) th.colSpan = header.colSpan;
    if (header.rowSpan) th.rowSpan = header.rowSpan;
    row.appendChild(th);
  };
  if (data.headerRows) {
    data.headerRows.forEach((headers) => {
      const row = document.createElement("tr");
      headers.forEach((header) => appendHeaderCell(row, header));
      thead.appendChild(row);
    });
  } else if (data.headerGroups) {
    const headerRow = document.createElement("tr");
    data.headerGroups.forEach((header) => {
      appendHeaderCell(headerRow, header);
    });
    thead.appendChild(headerRow);
    const subHeaderRow = document.createElement("tr");
    data.subHeaders.forEach((header) => {
      const th = document.createElement("th");
      th.scope = "col";
      th.textContent = header;
      subHeaderRow.appendChild(th);
    });
    thead.appendChild(subHeaderRow);
  } else {
    const headerRow = document.createElement("tr");
    data.headers.forEach((header) => {
      const th = document.createElement("th");
      th.scope = "col";
      th.textContent = header;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
  }
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  data.rows.forEach((row) => {
    const tr = document.createElement("tr");
    if (row.group) {
      const td = document.createElement("td");
      const firstHeaderRow = data.headerRows?.[0] || data.headerGroups;
      td.colSpan = data.headers?.length || firstHeaderRow.reduce((sum, header) => sum + (header.colSpan || 1), 0);
      td.className = "group-cell";
      td.textContent = row.group;
      tr.appendChild(td);
    } else {
      if (isOurs(row[0])) tr.classList.add("ours");
      row.forEach((value) => {
        const td = document.createElement("td");
        td.textContent = value || dash;
        if (!value || value === dash || value === "TBD") td.classList.add("pending");
        if (value === "✓") td.classList.add("metric-pass");
        if (value === "✕") td.classList.add("metric-fail");
        tr.appendChild(td);
      });
    }
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  target.replaceChildren(table);
}

function initTables() {
  renderTable("vae-comparison-table", tables.vaeComparison);
  renderTable("vae-ablation-table", tables.vaeAblation);
  renderTable("generation-table", tables.generation);
  renderTable("forecasting-table", tables.forecasting);
  renderTable("resimulation-table", tables.resimulation);
}

function initTabs() {
  const buttons = [...document.querySelectorAll(".tab-button")];
  const panels = [...document.querySelectorAll(".tab-panel")];
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-selected", String(active));
      });
      panels.forEach((panel) => {
        const active = panel.id === `panel-${button.dataset.tab}`;
        panel.classList.toggle("active", active);
        panel.hidden = !active;
      });
    });
  });
}

function initResultExplorer() {
  const viewButtons = [...document.querySelectorAll("[data-results-view]")];
  const taskButtons = [...document.querySelectorAll(".tab-button[data-tab]")];
  const tableView = document.getElementById("results-table-view");
  const plotView = document.getElementById("results-plot-view");
  const context = document.getElementById("metric-explorer-context");
  const detail = document.getElementById("metric-explorer-detail");
  const plotGrid = document.getElementById("metric-plot-grid");
  if (!viewButtons.length || !taskButtons.length || !tableView || !plotView || !context || !detail || !plotGrid) return;

  let activeTask = taskButtons.find((button) => button.classList.contains("active"))?.dataset.tab || "tokenizer";
  const svgNamespace = "http://www.w3.org/2000/svg";

  const niceMaximum = (value) => {
    if (!Number.isFinite(value) || value <= 0) return 1;
    const magnitude = 10 ** Math.floor(Math.log10(value));
    const normalized = value / magnitude;
    const steps = [1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 7.5, 10];
    return (steps.find((step) => step >= normalized) || 10) * magnitude;
  };

  const formatScaleValue = (value) => {
    if (value >= 10) return value.toFixed(value % 1 ? 1 : 0);
    if (value >= 1) return value.toFixed(value % 1 ? 1 : 0);
    return value.toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
  };

  const createSvgElement = (tag, attributes = {}, text = "") => {
    const element = document.createElementNS(svgNamespace, tag);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    if (text) element.textContent = text;
    return element;
  };

  const renderPlots = () => {
    const plot = resultPlots[activeTask];
    if (!plot) return;

    context.textContent = plot.context;
    detail.textContent = plot.timeSeries
      ? "Forecast horizon on the x-axis · metric value on the y-axis"
      : plot.groups.length > 1
        ? "Paradigms separated by dotted lines · methods on the x-axis"
        : "Methods on the x-axis · metric value on the y-axis";

    const fragment = document.createDocumentFragment();
    plot.metrics.forEach((metric) => {
      const timeSeries = plot.timeSeries;
      const observations = timeSeries
        ? timeSeries.rows
        : plot.groups.flatMap((group) => group.rows.map((row) => ({
            ...row,
            group: group.shortLabel || ""
          })));
      const values = timeSeries
        ? observations.flatMap((row) => row.values[metric.key].map(Number))
        : observations.map((row) => Number(row.values[metric.key]));
      const scaleMaximum = niceMaximum(Math.max(...values));
      const width = Math.max(560, observations.length * 82 + 70);
      const height = 340;
      const margin = {
        top: !timeSeries && plot.groups.length > 1 ? 58 : 30,
        right: 22,
        bottom: timeSeries ? 62 : 104,
        left: 58
      };
      const plotWidth = width - margin.left - margin.right;
      const plotHeight = height - margin.top - margin.bottom;
      const baselineY = margin.top + plotHeight;

      const card = document.createElement("article");
      card.className = "metric-plot-card";

      const heading = document.createElement("div");
      heading.className = "metric-plot-heading";
      const title = document.createElement("h4");
      title.textContent = metric.label;
      const description = document.createElement("p");
      description.textContent = metric.detail;
      heading.append(title, description);

      const scroller = document.createElement("div");
      scroller.className = "metric-plot-scroller";
      const svg = createSvgElement("svg", {
        viewBox: `0 0 ${width} ${height}`,
        role: "img",
        "aria-label": `${plot.context} ${metric.label}. ${metric.detail}`
      });

      for (let tick = 0; tick <= 4; tick += 1) {
        const ratio = tick / 4;
        const y = baselineY - ratio * plotHeight;
        const value = scaleMaximum * ratio;
        svg.appendChild(createSvgElement("line", {
          class: "metric-plot-gridline",
          x1: margin.left,
          x2: width - margin.right,
          y1: y,
          y2: y
        }));
        svg.appendChild(createSvgElement("text", {
          class: "metric-plot-tick",
          x: margin.left - 10,
          y: y + 4,
          "text-anchor": "end"
        }, formatScaleValue(value)));
      }

      svg.appendChild(createSvgElement("line", {
        class: "metric-plot-axis",
        x1: margin.left,
        x2: margin.left,
        y1: margin.top,
        y2: baselineY
      }));
      svg.appendChild(createSvgElement("line", {
        class: "metric-plot-axis",
        x1: margin.left,
        x2: width - margin.right,
        y1: baselineY,
        y2: baselineY
      }));
      svg.appendChild(createSvgElement("text", {
        class: "metric-plot-axis-title",
        x: 16,
        y: margin.top + plotHeight / 2,
        transform: `rotate(-90 16 ${margin.top + plotHeight / 2})`,
        "text-anchor": "middle"
      }, metric.label));

      if (timeSeries) {
        const colors = ["#aeb7b3", "#f0a35e", "#839bff", "#5dc9dd"];
        const xForStep = (index) => margin.left + (index / (timeSeries.steps.length - 1)) * plotWidth;

        timeSeries.steps.forEach((step, index) => {
          const x = xForStep(index);
          svg.appendChild(createSvgElement("line", {
            class: "metric-plot-vertical-gridline",
            x1: x,
            x2: x,
            y1: margin.top,
            y2: baselineY
          }));
          svg.appendChild(createSvgElement("text", {
            class: "metric-plot-step",
            x,
            y: baselineY + 22,
            "text-anchor": "middle"
          }, step));
        });
        svg.appendChild(createSvgElement("text", {
          class: "metric-plot-x-title",
          x: margin.left + plotWidth / 2,
          y: height - 8,
          "text-anchor": "middle"
        }, "Forecast horizon (s)"));

        const legend = document.createElement("div");
        legend.className = "metric-plot-legend";
        observations.forEach((row, seriesIndex) => {
          const seriesColor = isOurs(row.label) ? "#5dc9dd" : colors[seriesIndex % colors.length];
          const points = row.values[metric.key].map((rawValue, stepIndex) => {
            const value = Number(rawValue);
            return {
              rawValue,
              x: xForStep(stepIndex),
              y: baselineY - (value / scaleMaximum) * plotHeight,
              step: timeSeries.steps[stepIndex]
            };
          });
          const series = createSvgElement("g", {
            class: `metric-line-series${isOurs(row.label) ? " ours" : ""}`,
            role: "img",
            tabindex: "0",
            "aria-label": `${row.label} ${metric.label} over forecast steps`
          });
          series.style.setProperty("--series-color", seriesColor);
          series.appendChild(createSvgElement("title", {}, `${row.label}: ${row.values[metric.key].join(", ")}`));
          series.appendChild(createSvgElement("polyline", {
            class: "metric-line",
            points: points.map((point) => `${point.x},${point.y}`).join(" ")
          }));
          points.forEach((point) => {
            const marker = createSvgElement("circle", {
              class: "metric-line-point",
              cx: point.x,
              cy: point.y,
              r: 4.5
            });
            marker.appendChild(createSvgElement("title", {}, `${row.label} · ${point.step}s: ${point.rawValue}`));
            series.appendChild(marker);
          });
          svg.appendChild(series);

          const legendItem = document.createElement("span");
          legendItem.style.setProperty("--series-color", seriesColor);
          legendItem.className = isOurs(row.label) ? "ours" : "";
          legendItem.textContent = row.label;
          legend.appendChild(legendItem);
        });
        heading.appendChild(legend);
      } else {
        const barWidth = Math.min(46, plotWidth / (observations.length * 1.8));
        const barGap = (plotWidth - observations.length * barWidth) / (observations.length + 1);
        const xForBar = (index) => margin.left + barGap + barWidth / 2 + index * (barWidth + barGap);

        if (plot.groups.length > 1) {
          let groupStart = 0;
          plot.groups.forEach((group, groupIndex) => {
            const groupEnd = groupStart + group.rows.length - 1;
            const groupCenter = (xForBar(groupStart) + xForBar(groupEnd)) / 2;
            svg.appendChild(createSvgElement("text", {
              class: "metric-plot-group-label",
              x: groupCenter,
              y: margin.top - 25,
              "text-anchor": "middle"
            }, group.label));

            if (groupIndex < plot.groups.length - 1) {
              const separatorX = (xForBar(groupEnd) + xForBar(groupEnd + 1)) / 2;
              svg.appendChild(createSvgElement("line", {
                class: "metric-paradigm-separator",
                x1: separatorX,
                x2: separatorX,
                y1: margin.top - 11,
                y2: baselineY
              }));
            }
            groupStart = groupEnd + 1;
          });
        }

        observations.forEach((row, index) => {
          const value = Number(row.values[metric.key]);
          const x = xForBar(index);
          const y = baselineY - (value / scaleMaximum) * plotHeight;
          const observation = createSvgElement("g", {
            class: `metric-observation${isOurs(row.label) ? " ours" : ""}`,
            role: "img",
            tabindex: "0",
            "aria-label": `${row.label}: ${row.values[metric.key]}`
          });
          observation.appendChild(createSvgElement("title", {}, `${row.label}: ${row.values[metric.key]}`));
          observation.appendChild(createSvgElement("rect", {
            class: "metric-plot-bar",
            x: x - barWidth / 2,
            y,
            width: barWidth,
            height: baselineY - y,
            rx: 3
          }));
          observation.appendChild(createSvgElement("text", {
            class: "metric-plot-value",
            x,
            y: Math.max(margin.top + 10, y - 11),
            "text-anchor": "middle"
          }, row.values[metric.key]));

          const methodLabel = createSvgElement("text", {
            class: `metric-plot-method${isOurs(row.label) ? " ours" : ""}`,
            x,
            y: baselineY + 23,
            transform: `rotate(-28 ${x} ${baselineY + 23})`,
            "text-anchor": "end"
          });
          methodLabel.appendChild(createSvgElement("tspan", { x, dy: 0 }, row.label));
          if (row.group && plot.groups.length === 1) {
            methodLabel.appendChild(createSvgElement("tspan", {
              class: "metric-plot-method-group",
              x,
              dy: 13
            }, row.group));
          }
          observation.appendChild(methodLabel);
          svg.appendChild(observation);
        });
      }

      scroller.appendChild(svg);
      card.append(heading, scroller);
      fragment.appendChild(card);
    });
    plotGrid.replaceChildren(fragment);
  };

  viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const showPlots = button.dataset.resultsView === "plots";
      viewButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      tableView.hidden = showPlots;
      plotView.hidden = !showPlots;
      if (showPlots) renderPlots();
    });
  });

  taskButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeTask = button.dataset.tab;
      if (!plotView.hidden) renderPlots();
    });
  });

  if (!plotView.hidden) renderPlots();
}

function initInteractiveDemo() {
  const modeButtons = [...document.querySelectorAll("[data-interactive-mode]")];
  const logSelector = document.getElementById("interactive-log-selector");
  const actionSelector = document.getElementById("interactive-action-selector");
  const frame = document.getElementById("interactive-demo-video-frame");
  const video = document.getElementById("interactive-demo-video");
  const loading = document.getElementById("interactive-demo-loading");
  const playButton = document.getElementById("interactive-demo-play");
  const time = document.getElementById("interactive-demo-time");
  const seek = document.getElementById("interactive-demo-seek");
  const fullscreen = document.getElementById("interactive-demo-fullscreen");
  const leftLabel = document.getElementById("interactive-demo-left-label");
  const rightLabel = document.getElementById("interactive-demo-right-label");
  const conditioning = document.getElementById("interactive-demo-conditioning");
  if (!modeButtons.length || !logSelector || !actionSelector || !frame || !video || !loading || !playButton || !time || !seek || !fullscreen || !leftLabel || !rightLabel || !conditioning) return;

  let selectedMode = "conditional";
  let selectedLogIndex = 0;
  let selectedAction = "straight";
  let loadToken = 0;

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  };

  const updatePlaybackState = () => {
    playButton.textContent = video.paused ? "▶" : "Ⅱ";
    playButton.setAttribute("aria-label", video.paused ? "Play video" : "Pause video");
  };

  const updateProgress = () => {
    const duration = Number.isFinite(video.duration) ? video.duration : 0;
    const progress = duration ? (video.currentTime / duration) * 100 : 0;
    seek.value = String(progress);
    time.textContent = `${formatTime(video.currentTime)} / ${formatTime(duration)}`;
  };

  const loadSelection = () => {
    const mode = interactiveDemoModes[selectedMode];
    const log = interactiveDemoLogs[selectedLogIndex];
    const source = `assets/interactive/${mode.assetPrefix}-log-${log.number}-${selectedAction}.mp4`;
    const token = ++loadToken;
    frame.classList.add("is-loading");
    frame.classList.remove("has-error");
    loading.textContent = "Loading video…";
    leftLabel.textContent = mode.leftLabel;
    rightLabel.textContent = mode.rightLabel;
    conditioning.textContent = mode.conditioning;
    video.pause();
    video.src = source;
    video.load();

    const beginPlayback = () => {
      if (token !== loadToken) return;
      frame.classList.remove("is-loading", "has-error");
      video.play().catch(updatePlaybackState);
    };
    const showError = () => {
      if (token !== loadToken) return;
      frame.classList.remove("is-loading");
      frame.classList.add("has-error");
      loading.textContent = "Video unavailable";
    };

    video.addEventListener("canplay", beginPlayback, { once: true });
    video.addEventListener("error", showError, { once: true });
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) beginPlayback();
  };

  const renderActions = () => {
    const log = interactiveDemoLogs[selectedLogIndex];
    if (!log.actions.some((action) => action.key === selectedAction)) {
      selectedAction = log.actions[0].key;
    }
    actionSelector.replaceChildren(...log.actions.map((action) => {
      const button = document.createElement("button");
      const active = action.key === selectedAction;
      button.type = "button";
      button.textContent = action.label;
      button.className = active ? "active" : "";
      button.setAttribute("aria-pressed", String(active));
      button.addEventListener("click", () => {
        selectedAction = action.key;
        renderActions();
        loadSelection();
      });
      return button;
    }));
  };

  logSelector.replaceChildren(...interactiveDemoLogs.map((log, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = log.number;
    button.title = log.id;
    button.className = index === selectedLogIndex ? "active" : "";
    button.setAttribute("aria-label", `Choose log ${log.number}`);
    button.setAttribute("aria-pressed", String(index === selectedLogIndex));
    button.addEventListener("click", () => {
      selectedLogIndex = index;
      [...logSelector.children].forEach((item, itemIndex) => {
        const active = itemIndex === selectedLogIndex;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      renderActions();
      loadSelection();
    });
    return button;
  }));

  modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedMode = button.dataset.interactiveMode;
      modeButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      loadSelection();
    });
  });

  playButton.addEventListener("click", () => {
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  });
  seek.addEventListener("input", () => {
    if (Number.isFinite(video.duration)) video.currentTime = (Number(seek.value) / 100) * video.duration;
  });
  fullscreen.addEventListener("click", () => {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else frame.requestFullscreen?.();
  });
  video.addEventListener("play", updatePlaybackState);
  video.addEventListener("pause", updatePlaybackState);
  video.addEventListener("loadedmetadata", updateProgress);
  video.addEventListener("timeupdate", updateProgress);
  video.addEventListener("waiting", () => {
    frame.classList.add("is-loading");
    loading.textContent = "Loading video…";
  });
  video.addEventListener("playing", () => frame.classList.remove("is-loading", "has-error"));

  renderActions();
  loadSelection();
}

function inputLaneMarkup(key, label, input, icon) {
  const stateClass = input.active ? (input.optional ? "optional" : "active") : "inactive";
  return `
    <div class="capability-lane ${stateClass}" data-input="${key}">
      <article class="capability-input">
        <span class="capability-input-icon" aria-hidden="true">${icon}</span>
        <span class="capability-input-copy">
          <small>${label}</small>
          <strong data-input-value>${input.value}</strong>
        </span>
      </article>
      <div class="input-arrow" aria-hidden="true"></div>
    </div>
  `;
}

function capabilityDiagramMarkup(capability) {
  return `
    <div class="capability-diagram-header">
      <span data-diagram-tag>${capability.tag}</span>
    </div>
    <div class="capability-flow">
      <div class="capability-inputs" aria-label="Model inputs and conditions">
        ${inputLaneMarkup("lidar", "Input LiDAR", capability.inputs.lidar, "⌁")}
        ${inputLaneMarkup("geometry", "Spatial cache", capability.inputs.geometry, "◇")}
        ${inputLaneMarkup("hdmap", "HD-Map", capability.inputs.hdmap, "⌗")}
        ${inputLaneMarkup("pose", "Target poses", capability.inputs.pose, "↗")}
      </div>
      <article class="model-node">
        <span>Same causal checkpoint</span>
        <strong>LidarVerse</strong>
        <small>Four-step block-autoregressive generator</small>
        <div class="model-core" aria-hidden="true">
          <i></i>
          <i></i>
          <i></i>
        </div>
      </article>
      <div class="capability-output-lane">
        <div class="output-arrow" aria-hidden="true"></div>
        <article class="capability-output">
          <span class="capability-input-icon" aria-hidden="true">⌁</span>
          <span class="capability-input-copy">
            <small>Output</small>
            <strong data-output-title>${capability.output}</strong>
            <em data-output-detail>${capability.outputDetail}</em>
          </span>
        </article>
      </div>
    </div>
  `;
}

function updateCapabilityDiagram(diagram, capability) {
  if (!diagram.querySelector("[data-diagram-tag]")) {
    diagram.insertAdjacentHTML("beforeend", capabilityDiagramMarkup(capability));
  }

  const header = diagram.querySelector(".capability-diagram-header");
  const submodes = diagram.querySelector(".capability-submodes");
  const diagramTag = diagram.querySelector("[data-diagram-tag]");
  if (header && submodes && submodes.parentElement !== header) header.prepend(submodes);
  diagramTag.hidden = Boolean(submodes && !submodes.hidden);
  diagramTag.textContent = capability.tag;
  Object.entries(capability.inputs).forEach(([key, input]) => {
    const lane = diagram.querySelector(`[data-input="${key}"]`);
    if (!lane) return;
    const stateClass = input.active ? (input.optional ? "optional" : "active") : "inactive";
    lane.classList.remove("active", "optional", "inactive");
    lane.classList.add(stateClass);
    lane.querySelector("[data-input-value]").textContent = input.value;
  });
  diagram.querySelector("[data-output-title]").textContent = capability.output;
  diagram.querySelector("[data-output-detail]").textContent = capability.outputDetail;
}

function initCapabilities() {
  const buttons = [...document.querySelectorAll(".capability-button")];
  const tabs = buttons[0]?.parentElement;
  const panel = document.getElementById("capability-panel");
  const diagram = document.getElementById("capability-diagram");
  const submodes = document.getElementById("capability-submodes");
  const capabilityContext = document.getElementById("capability-context");
  const mediaTitle = document.getElementById("capability-media-title");
  const mediaDescription = document.getElementById("capability-media-description");
  const mediaIndex = document.getElementById("capability-media-index");
  const mediaFootnote = document.getElementById("capability-media-footnote");
  const mediaContainer = document.getElementById("capability-media");
  const mediaSelector = document.getElementById("capability-media-selector");
  const canvas = document.getElementById("capability-media-canvas");
  const videoGrid = document.getElementById("capability-video-grid");
  const video = document.getElementById("capability-video");
  const videoLabels = document.getElementById("capability-video-labels");
  const videoPhase = document.getElementById("capability-video-phase");
  const videoPhaseSegments = [...document.querySelectorAll("[data-video-phase]")];
  const videoLoading = document.getElementById("capability-video-loading");
  const videoControls = document.getElementById("capability-video-controls");
  const videoPlay = document.getElementById("capability-video-play");
  const videoTime = document.getElementById("capability-video-time");
  const videoSeek = document.getElementById("capability-video-seek");
  const videoSpeedButtons = [...document.querySelectorAll("[data-speed]")];
  const videoFullscreen = document.getElementById("capability-video-fullscreen");
  if (!buttons.length || !tabs || !panel || !diagram || !submodes || !capabilityContext || !mediaFootnote || !mediaContainer || !mediaSelector || !canvas || !videoGrid || !video || !videoLabels || !videoPhase || !videoPhaseSegments.length || !videoLoading || !videoControls || !videoPlay || !videoTime || !videoSeek || !videoSpeedButtons.length || !videoFullscreen) return;

  const media = new CapabilityMediaCanvas(canvas);
  let mediaLoadToken = 0;
  let lookaheadVideo = null;
  let queuedLookaheadSource = "";
  let phaseFrameRequest = 0;
  const selectedVariants = Object.fromEntries(
    Object.entries(capabilities).map(([key, capability]) => [key, capability.defaultVariant])
  );

  const updateTabIndicator = (button) => {
    tabs.style.setProperty("--indicator-x", `${button.offsetLeft}px`);
    tabs.style.setProperty("--indicator-y", `${button.offsetTop}px`);
    tabs.style.setProperty("--indicator-width", `${button.offsetWidth}px`);
    tabs.style.setProperty("--indicator-height", `${button.offsetHeight}px`);
    requestAnimationFrame(() => tabs.classList.add("indicator-ready"));
  };

  const formatVideoTime = (seconds) => {
    if (!Number.isFinite(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  };

  const playbackSource = (item) => `${item.src.replace(/\.mp4$/, "")}-cropped.mp4`;

  const primeLookaheadVideo = (source) => {
    if (!source || lookaheadVideo?.dataset.source === source) return;
    if (lookaheadVideo) {
      lookaheadVideo.removeAttribute("src");
      lookaheadVideo.load();
    }
    lookaheadVideo = document.createElement("video");
    lookaheadVideo.muted = true;
    lookaheadVideo.preload = "auto";
    lookaheadVideo.dataset.source = source;
    lookaheadVideo.src = source;
    lookaheadVideo.load();
  };

  const updateForecastPhase = (mediaTime = video.currentTime) => {
    if (videoPhase.hidden) return;
    const currentPhase = mediaTime < 3 ? "input" : "prediction";
    videoPhaseSegments.forEach((segment) => {
      segment.classList.toggle("active", segment.dataset.videoPhase === currentPhase);
    });
  };

  const stopForecastPhaseTracking = () => {
    if (phaseFrameRequest && video.cancelVideoFrameCallback) {
      video.cancelVideoFrameCallback(phaseFrameRequest);
    }
    phaseFrameRequest = 0;
  };

  const startForecastPhaseTracking = () => {
    stopForecastPhaseTracking();
    if (videoPhase.hidden || !video.requestVideoFrameCallback) return;
    const trackFrame = (_now, metadata) => {
      phaseFrameRequest = 0;
      updateForecastPhase(metadata.mediaTime);
      if (!video.paused && !videoPhase.hidden) {
        phaseFrameRequest = video.requestVideoFrameCallback(trackFrame);
      }
    };
    phaseFrameRequest = video.requestVideoFrameCallback(trackFrame);
  };

  const updateVideoControls = () => {
    videoPlay.textContent = video.paused ? "▶" : "Ⅱ";
    videoPlay.setAttribute("aria-label", video.paused ? "Play video" : "Pause video");
    videoTime.textContent = `${formatVideoTime(video.currentTime)} / ${formatVideoTime(video.duration)}`;
    videoSeek.value = Number.isFinite(video.duration) && video.duration > 0
      ? String((video.currentTime / video.duration) * 100)
      : "0";
    updateForecastPhase();
  };

  videoPlay.addEventListener("click", () => {
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  });
  videoSeek.addEventListener("input", () => {
    if (Number.isFinite(video.duration)) video.currentTime = (Number(videoSeek.value) / 100) * video.duration;
  });
  videoSpeedButtons.forEach((button) => {
    button.addEventListener("click", () => {
      video.playbackRate = Number(button.dataset.speed);
      videoSpeedButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
    });
  });
  videoFullscreen.addEventListener("click", () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (videoGrid.requestFullscreen) videoGrid.requestFullscreen();
    else if (videoGrid.webkitRequestFullscreen) videoGrid.webkitRequestFullscreen();
  });
  ["play", "pause", "timeupdate", "loadedmetadata", "durationchange"].forEach((eventName) => {
    video.addEventListener(eventName, updateVideoControls);
  });
  video.addEventListener("play", startForecastPhaseTracking);
  video.addEventListener("pause", stopForecastPhaseTracking);
  video.addEventListener("seeked", () => updateForecastPhase());
  video.addEventListener("playing", () => {
    videoGrid.classList.remove("is-loading", "has-error");
    if (queuedLookaheadSource) {
      primeLookaheadVideo(queuedLookaheadSource);
      queuedLookaheadSource = "";
    }
  });
  window.addEventListener("pagehide", () => {
    stopForecastPhaseTracking();
    if (lookaheadVideo) {
      lookaheadVideo.removeAttribute("src");
      lookaheadVideo.load();
    }
  }, { once: true });

  const renderMedia = (capability, key) => {
    media.setMode(key);
    if (!capability.media?.length) {
      mediaLoadToken += 1;
      queuedLookaheadSource = "";
      stopForecastPhaseTracking();
      video.pause();
      video.removeAttribute("src");
      video.load();
      if (lookaheadVideo) {
        lookaheadVideo.removeAttribute("src");
        lookaheadVideo.load();
        lookaheadVideo = null;
      }
      videoGrid.hidden = true;
      videoGrid.classList.remove("is-loading", "has-error");
      videoLabels.replaceChildren();
      videoPhase.hidden = true;
      canvas.hidden = false;
      mediaSelector.hidden = true;
      videoControls.hidden = true;
      mediaSelector.replaceChildren();
      mediaContainer.classList.remove("has-video");
      return;
    }

    videoLabels.replaceChildren(...capability.videoLabels.map((label, index) => {
      const badge = document.createElement("span");
      badge.className = `capability-video-label${index === 1 ? " ours" : ""}`;
      badge.textContent = label;
      return badge;
    }));
    videoPhase.hidden = key !== "forecasting";
    if (videoPhase.hidden) stopForecastPhaseTracking();
    if (!videoPhase.hidden) {
      videoPhaseSegments.forEach((segment) => {
        segment.classList.toggle("active", segment.dataset.videoPhase === "input");
      });
    }

    const selectExample = (selectedIndex) => {
      const selectedMedia = capability.media[selectedIndex];
      const source = playbackSource(selectedMedia);
      const loadToken = ++mediaLoadToken;
      if (lookaheadVideo && lookaheadVideo.dataset.source !== source) {
        lookaheadVideo.removeAttribute("src");
        lookaheadVideo.load();
        lookaheadVideo = null;
      }
      queuedLookaheadSource = capability.media.length > 1
        ? playbackSource(capability.media[(selectedIndex + 1) % capability.media.length])
        : "";
      video.pause();
      videoGrid.classList.add("is-loading");
      videoGrid.classList.remove("has-error");
      videoLoading.textContent = "Loading video…";
      mediaContainer.style.setProperty("--video-aspect", capability.videoAspect);
      [...mediaSelector.children].forEach((button, index) => {
        const active = index === selectedIndex;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
      });

      const beginPlayback = () => {
        if (loadToken !== mediaLoadToken) return;
        videoGrid.classList.remove("is-loading", "has-error");
        video.play().catch(() => {});
      };
      const showLoadError = () => {
        if (loadToken !== mediaLoadToken) return;
        videoGrid.classList.remove("is-loading");
        videoGrid.classList.add("has-error");
        videoLoading.textContent = "Video unavailable";
      };

      if (video.getAttribute("src") !== source) {
        video.src = source;
        video.load();
      }
      if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) beginPlayback();
      else {
        video.addEventListener("canplay", beginPlayback, { once: true });
        video.addEventListener("error", showLoadError, { once: true });
      }
    };

    mediaSelector.replaceChildren();
    capability.media.forEach((item, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = item.label;
      button.setAttribute("aria-label", `Show result example ${index + 1}`);
      button.title = item.title || `Example ${index + 1}`;
      button.setAttribute("aria-pressed", String(index === 0));
      button.className = `capability-media-option${index === 0 ? " active" : ""}`;
      button.addEventListener("click", () => selectExample(index));
      mediaSelector.appendChild(button);
    });
    canvas.hidden = true;
    videoGrid.hidden = false;
    mediaSelector.hidden = false;
    videoControls.hidden = false;
    mediaContainer.classList.add("has-video");
    selectExample(0);
  };

  const renderCapability = (key, moveFocus = false) => {
    const capabilityGroup = capabilities[key];
    const selectedButton = buttons.find((button) => button.dataset.capability === key);
    if (!capabilityGroup || !selectedButton) return;
    const variantKey = selectedVariants[key];
    const capability = capabilityGroup.variants[variantKey];

    buttons.forEach((button) => {
      const active = button === selectedButton;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
    });
    panel.setAttribute("aria-labelledby", selectedButton.id);
    updateTabIndicator(selectedButton);
    capabilityContext.textContent = capability.description;

    const variants = Object.entries(capabilityGroup.variants);
    submodes.replaceChildren();
    submodes.hidden = variants.length < 2;
    submodes.setAttribute("aria-label", capabilityGroup.submodeLabel || "Capability mode");
    variants.forEach(([submodeKey, variant]) => {
      const submodeButton = document.createElement("button");
      const active = submodeKey === variantKey;
      submodeButton.type = "button";
      submodeButton.className = `capability-submode${active ? " active" : ""}`;
      submodeButton.textContent = variant.shortTitle || variant.title;
      submodeButton.setAttribute("aria-pressed", String(active));
      submodeButton.addEventListener("click", () => {
        selectedVariants[key] = submodeKey;
        renderCapability(key);
      });
      submodes.appendChild(submodeButton);
    });

    updateCapabilityDiagram(diagram, capability);
    mediaTitle.textContent = capability.title;
    mediaDescription.textContent = capability.description;
    mediaIndex.textContent = capability.index;
    mediaFootnote.textContent = capability.footnote || "";
    mediaFootnote.hidden = !capability.footnote;
    renderMedia(capability, key);
    panel.classList.remove("is-changing");
    void panel.offsetWidth;
    panel.classList.add("is-changing");
    if (moveFocus) selectedButton.focus();
  };

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => renderCapability(button.dataset.capability));
    button.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + buttons.length) % buttons.length;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % buttons.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = buttons.length - 1;
      renderCapability(buttons[nextIndex].dataset.capability, true);
    });
  });
  window.addEventListener("resize", () => {
    const activeButton = buttons.find((button) => button.classList.contains("active"));
    if (activeButton) updateTabIndicator(activeButton);
  });
  renderCapability("generation");
}

function initCrossSensorDemo() {
  const media = document.getElementById("cross-sensor-media");
  const video = document.getElementById("cross-sensor-video");
  const playButton = document.getElementById("cross-sensor-video-play");
  const time = document.getElementById("cross-sensor-video-time");
  const seek = document.getElementById("cross-sensor-video-seek");
  const speedButtons = [...document.querySelectorAll("[data-cross-sensor-speed]")];
  const fullscreen = document.getElementById("cross-sensor-video-fullscreen");
  if (!media || !video || !playButton || !time || !seek || !speedButtons.length || !fullscreen) return;

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  };

  const updateControls = () => {
    playButton.textContent = video.paused ? "▶" : "Ⅱ";
    playButton.setAttribute("aria-label", video.paused ? "Play video" : "Pause video");
    time.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
    seek.value = Number.isFinite(video.duration) && video.duration > 0
      ? String((video.currentTime / video.duration) * 100)
      : "0";
  };

  playButton.addEventListener("click", () => {
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  });
  seek.addEventListener("input", () => {
    if (Number.isFinite(video.duration)) video.currentTime = (Number(seek.value) / 100) * video.duration;
  });
  speedButtons.forEach((button) => {
    button.addEventListener("click", () => {
      video.playbackRate = Number(button.dataset.crossSensorSpeed);
      speedButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
    });
  });
  fullscreen.addEventListener("click", () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (media.requestFullscreen) media.requestFullscreen();
    else if (media.webkitRequestFullscreen) media.webkitRequestFullscreen();
  });
  ["play", "pause", "timeupdate", "loadedmetadata", "durationchange"].forEach((eventName) => {
    video.addEventListener(eventName, updateControls);
  });
  updateControls();
}

function initSectionTracking() {
  const links = [...document.querySelectorAll(".site-nav a")];
  const sections = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
  sections.forEach((section) => observer.observe(section));
}

class CapabilityMediaCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.mode = "generation";
    this.running = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.points = this.buildPoints();
    this.resize = this.resize.bind(this);
    this.draw = this.draw.bind(this);
    window.addEventListener("resize", this.resize);
    this.resize();
    if (this.running) requestAnimationFrame(this.draw);
  }

  buildPoints() {
    const points = [];
    const add = (x, y, z, size = 1, group = "scene") => points.push({ x, y, z, size, group });
    for (let z = 5; z < 84; z += 1.2) {
      const roadWidth = 2.8 + z * 0.025;
      add(-roadWidth, -1.28, z, 1.15, "road");
      add(roadWidth, -1.28, z, 1.15, "road");
      if (Math.floor(z) % 5 < 2) add(0, -1.27, z, 0.8, "road");
      if (Math.floor(z) % 8 < 3) {
        add(-roadWidth * 0.52, -1.27, z, 0.7, "road");
        add(roadWidth * 0.52, -1.27, z, 0.7, "road");
      }
    }
    for (let i = 0; i < 760; i += 1) {
      const seed = Math.abs(Math.sin(i * 91.731 + 4.17));
      const seed2 = Math.abs(Math.sin(i * 47.113 + 8.91));
      const z = 7 + seed * 76;
      const side = i % 2 ? -1 : 1;
      const x = side * (3.5 + seed2 * (5.2 + z * 0.055));
      const y = -1.18 + Math.abs(Math.sin(i * 22.37)) * (3.4 + Math.min(z, 38) * 0.04);
      add(x, y, z, 0.5 + seed2 * 0.85, i % 7 === 0 ? "dynamic" : "scene");
    }
    for (let i = 0; i < 130; i += 1) {
      const z = 12 + (i % 43) * 1.08;
      const x = (i % 2 ? -1 : 1) * (0.8 + Math.abs(Math.sin(i * 3.7)) * 1.5);
      const y = -0.95 + (i % 6) * 0.13;
      add(x, y, z, 1.1, "vehicle");
    }
    return points;
  }

  setMode(mode) {
    this.mode = mode;
    if (!this.running) this.draw(performance.now());
  }

  resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = Math.max(1, Math.floor(rect.width * ratio));
    this.canvas.height = Math.max(1, Math.floor(rect.height * ratio));
    this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    this.width = rect.width;
    this.height = rect.height;
    if (!this.running) this.draw(performance.now());
  }

  drawTrajectory(time) {
    const ctx = this.ctx;
    const progress = this.running ? (time * 0.00012) % 1 : 0.55;
    const startY = this.height * 0.82;
    const endY = this.height * 0.26;
    ctx.save();
    ctx.setLineDash([5, 8]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = this.mode === "forecasting" ? "rgba(131, 155, 255, 0.58)" : "rgba(93, 201, 221, 0.52)";
    ctx.beginPath();
    ctx.moveTo(this.width * 0.5, startY);
    ctx.bezierCurveTo(
      this.width * (this.mode === "resimulation" ? 0.56 : 0.48),
      this.height * 0.64,
      this.width * (this.mode === "generation" ? 0.45 : 0.54),
      this.height * 0.42,
      this.width * 0.5,
      endY
    );
    ctx.stroke();
    ctx.setLineDash([]);
    const markerY = startY + (endY - startY) * progress;
    const markerX = this.width * 0.5 + Math.sin(progress * Math.PI * 2) * (this.mode === "resimulation" ? 18 : 8);
    ctx.fillStyle = "#f3f5f4";
    ctx.beginPath();
    ctx.arc(markerX, markerY, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  draw(time = 0) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.fillStyle = "#050707";
    ctx.fillRect(0, 0, this.width, this.height);

    const glow = ctx.createRadialGradient(this.width * 0.5, this.height * 0.58, 10, this.width * 0.5, this.height * 0.58, this.width * 0.48);
    glow.addColorStop(0, this.mode === "forecasting" ? "rgba(131, 155, 255, 0.08)" : "rgba(93, 201, 221, 0.08)");
    glow.addColorStop(1, "rgba(5, 7, 7, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, this.width, this.height);

    const drift = this.running ? (time * 0.0032) % 1.2 : 0;
    const focal = Math.min(this.width, this.height) * 0.92;
    const cx = this.width * 0.5;
    const cy = this.height * 0.67;
    const sorted = [...this.points].sort((a, b) => b.z - a.z);
    for (const point of sorted) {
      let z = point.z - drift;
      if (z < 4) z += 78;
      const scale = focal / z;
      const curve = this.mode === "resimulation" ? Math.sin(z * 0.065) * 0.42 : Math.sin(z * 0.035) * 0.15;
      const x = cx + (point.x + curve) * scale;
      const y = cy - point.y * scale;
      if (x < -8 || x > this.width + 8 || y < -8 || y > this.height + 8) continue;

      let color = "#8d9894";
      if (point.group === "road") color = "#5dc9dd";
      if (point.group === "vehicle") color = "#f0a35e";
      if (point.group === "dynamic") color = "#b9c3bf";
      if (this.mode === "forecasting" && z > 37) color = point.group === "vehicle" ? "#f0a35e" : "#839bff";
      if (this.mode === "resimulation") {
        ctx.globalAlpha = Math.max(0.05, Math.min(0.22, 1 - z / 90));
        ctx.fillStyle = "#f0a35e";
        ctx.fillRect(x - 8 * scale * 0.04, y, Math.max(0.5, point.size * scale * 0.026), Math.max(0.5, point.size * scale * 0.026));
        color = point.group === "vehicle" ? "#839bff" : "#5dc9dd";
      }
      const alpha = Math.max(0.08, Math.min(0.76, 1 - z / 95));
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      const size = Math.max(0.5, point.size * scale * 0.028);
      ctx.fillRect(x, y, size, size);
    }
    ctx.globalAlpha = 1;

    if (this.mode === "forecasting") {
      const boundaryY = this.height * 0.47;
      ctx.strokeStyle = "rgba(131, 155, 255, 0.34)";
      ctx.setLineDash([3, 7]);
      ctx.beginPath();
      ctx.moveTo(this.width * 0.14, boundaryY);
      ctx.lineTo(this.width * 0.86, boundaryY);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    this.drawTrajectory(time);

    ctx.font = "700 10px Google Sans, Arial, sans-serif";
    ctx.fillStyle = "rgba(167, 175, 172, 0.72)";
    ctx.fillText(this.mode === "generation" ? "GENERATED ROLLOUT" : this.mode === "forecasting" ? "OBSERVED  /  FORECAST" : "SOURCE  /  TARGET VIEW", 22, 28);

    if (this.running) requestAnimationFrame(this.draw);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initTables();
  initTabs();
  initResultExplorer();
  initInteractiveDemo();
  initCapabilities();
  initCrossSensorDemo();
  initSectionTracking();
});
