import { useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import {
  Activity,
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardList,
  Clock,
  Layers,
  Mail,
  Sparkles
} from 'lucide-react';
import * as XLSX from 'xlsx';
import './ProcessAutomation.css';

type Row = {
  date: string;
  client: string;
  product: string;
  value: number;
  status: string;
};

const sampleData = `data,cliente,produto,valor,status
2026-06-01,Ana Souza,Plano Mensal,249.90,pago
2026-06-02,Marcos Lima,Consultoria,180.00,pago
2026-06-03,Beatriz Rocha,Plano Mensal,249.90,pendente
2026-06-04,Carlos Mendes,Produto Avulso,59.90,pago
2026-06-05,Juliana Reis,Consultoria,180.00,pago
2026-06-06,Roberto Alves,Plano Mensal,249.90,cancelado
2026-06-07,Patricia Gomes,Produto Avulso,59.90,pago`;

const acceptedColumns = ['data', 'cliente', 'produto', 'valor', 'status'];

const parseCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

const detectDelimiter = (header: string) => {
  const options = [',', ';', '\t'];
  return options.reduce((best, current) => (
    header.split(current).length > header.split(best).length ? current : best
  ), ',');
};

const normalizeText = (value: unknown) => String(value ?? '')
  .trim()
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '');

const normalizeNumber = (value: string) => {
  const cleanValue = value.replace(/R\$|\s/g, '').trim();
  const normalizedValue = cleanValue.includes(',') && cleanValue.includes('.')
    ? cleanValue.replace(/\./g, '').replace(',', '.')
    : cleanValue.replace(',', '.');

  return Number(normalizedValue);
};

const getRecordValue = (record: Record<string, unknown>, names: string[]) => {
  const normalizedNames = names.map(normalizeText);
  const match = Object.entries(record).find(([key]) => normalizedNames.includes(normalizeText(key)));
  return match?.[1];
};

const formatDateValue = (value: unknown) => {
  if (value instanceof Date) return value.toISOString().slice(0, 10);

  if (typeof value === 'number') {
    const parsedDate = XLSX.SSF.parse_date_code(value);
    if (parsedDate) {
      return `${parsedDate.y}-${String(parsedDate.m).padStart(2, '0')}-${String(parsedDate.d).padStart(2, '0')}`;
    }
  }

  return String(value ?? '').trim();
};

const rowsToCsv = (rows: Row[]) => [
  'data,cliente,produto,valor,status',
  ...rows.map((row) => [row.date, row.client, row.product, row.value.toFixed(2), row.status].join(','))
].join('\n');

const parseRecords = (records: Record<string, unknown>[]): Row[] => records
  .map((record) => ({
    date: formatDateValue(getRecordValue(record, ['data', 'date'])),
    client: String(getRecordValue(record, ['cliente', 'client', 'nome']) ?? '').trim(),
    product: String(getRecordValue(record, ['produto', 'product', 'item']) ?? '').trim(),
    value: normalizeNumber(String(getRecordValue(record, ['valor', 'value', 'preco', 'preço', 'total']) ?? '')),
    status: String(getRecordValue(record, ['status', 'situacao', 'situação']) ?? 'pago').trim() || 'pago'
  }))
  .filter((row) => row.date && row.client && row.product && !Number.isNaN(row.value));

const parseRows = (input: string): Row[] => {
  const lines = input.trim().split(/\r?\n/).filter(Boolean);
  const header = lines[0] ?? '';
  const delimiter = detectDelimiter(header);
  const columns = header.split(delimiter).map(normalizeText);
  const getIndex = (...names: string[]) => columns.findIndex((column) => names.includes(column));

  const indexes = {
    date: getIndex('data', 'date'),
    client: getIndex('cliente', 'client', 'nome'),
    product: getIndex('produto', 'product', 'item'),
    value: getIndex('valor', 'value', 'preco', 'total'),
    status: getIndex('status', 'situacao')
  };

  return lines.slice(1)
    .map((line) => {
      const cells = line.split(delimiter).map((item) => item.trim());
      return {
        date: cells[indexes.date],
        client: cells[indexes.client],
        product: cells[indexes.product],
        value: normalizeNumber(cells[indexes.value] ?? ''),
        status: cells[indexes.status] || 'pago'
      };
    })
    .filter((row) => row.date && row.client && row.product && !Number.isNaN(row.value));
};

const formatDate = (value: string) => {
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('pt-BR');
};

export const ProcessAutomation = () => {
  const [rawData, setRawData] = useState(sampleData);
  const [processed, setProcessed] = useState(true);
  const [fileName, setFileName] = useState('vendas-exemplo.csv');
  const [importMessage, setImportMessage] = useState('Exemplo carregado e pronto para demonstração.');

  const rows = useMemo(() => parseRows(rawData), [rawData]);
  const paidRows = rows.filter((row) => normalizeText(row.status) === 'pago');
  const pendingRows = rows.filter((row) => normalizeText(row.status) === 'pendente');
  const canceledRows = rows.filter((row) => normalizeText(row.status) === 'cancelado');
  const revenue = paidRows.reduce((sum, row) => sum + row.value, 0);
  const averageTicket = paidRows.length ? revenue / paidRows.length : 0;

  const productRanking = useMemo(() => {
    const grouped = rows.reduce<Record<string, { quantity: number; total: number }>>((acc, row) => {
      const current = acc[row.product] ?? { quantity: 0, total: 0 };
      acc[row.product] = { quantity: current.quantity + 1, total: current.total + row.value };
      return acc;
    }, {});

    return Object.entries(grouped)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.total - a.total);
  }, [rows]);

  const highestProductTotal = productRanking[0]?.total || 1;
  const report = `RELATÓRIO AUTOMÁTICO\n\nLinhas processadas: ${rows.length}\nVendas pagas: ${paidRows.length}\nPendências: ${pendingRows.length}\nCancelamentos: ${canceledRows.length}\nFaturamento confirmado: ${parseCurrency(revenue)}\nTicket médio: ${parseCurrency(averageTicket)}\n\nProduto com maior faturamento: ${productRanking[0]?.name ?? 'Sem dados'}\n\nAÇÕES SUGERIDAS\n- Cobrar clientes pendentes\n- Separar cancelamentos para análise\n- Enviar o resumo ao gestor`;

  const loadRows = (importedRows: Row[], importedFileName: string) => {
    if (!importedRows.length) {
      setProcessed(false);
      setImportMessage('Não encontrei as colunas necessárias. Confira o modelo indicado abaixo.');
      return;
    }

    setRawData(rowsToCsv(importedRows));
    setProcessed(true);
    setFileName(importedFileName);
    setImportMessage(`${importedRows.length} linhas validadas. Relatório atualizado com sucesso.`);
  };

  const handleFileImport = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setProcessed(false);
    setImportMessage('Lendo e validando o arquivo...');

    const fileExtension = file.name.toLowerCase().split('.').pop();
    const reader = new FileReader();

    reader.onerror = () => setImportMessage('Não foi possível ler o arquivo. Tente novamente.');

    if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      reader.onload = () => {
        try {
          const workbook = XLSX.read(reader.result, { type: 'array', cellDates: true });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const records = XLSX.utils.sheet_to_json<Record<string, unknown>>(firstSheet, { defval: '' });
          loadRows(parseRecords(records), file.name);
        } catch {
          setImportMessage('A planilha não pôde ser processada. Verifique se o arquivo está válido.');
        }
        event.target.value = '';
      };
      reader.readAsArrayBuffer(file);
      return;
    }

    if (fileExtension === 'csv' || fileExtension === 'txt') {
      reader.onload = () => {
        const content = String(reader.result ?? '');
        loadRows(parseRows(content), file.name);
        event.target.value = '';
      };
      reader.readAsText(file, 'utf-8');
      return;
    }

    setImportMessage('Formato não suportado. Use CSV, TXT, XLS ou XLSX.');
    event.target.value = '';
  };

  const restoreSample = () => {
    setRawData(sampleData);
    setProcessed(true);
    setFileName('vendas-exemplo.csv');
    setImportMessage('Exemplo restaurado e pronto para demonstração.');
  };

  const processData = () => {
    setProcessed(rows.length > 0);
    setImportMessage(rows.length
      ? `${rows.length} linhas processadas. Indicadores e relatório atualizados.`
      : 'Nenhuma linha válida encontrada para processar.');
  };

  const downloadReport = () => {
    const file = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'relatorio-automatico.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const workflowSteps = [
    { number: '01', title: 'Importar', detail: 'Excel ou CSV', complete: Boolean(fileName) },
    { number: '02', title: 'Validar', detail: 'Colunas reconhecidas', complete: rows.length > 0 },
    { number: '03', title: 'Processar', detail: 'Cálculos automáticos', complete: processed },
    { number: '04', title: 'Decidir', detail: 'Relatório e alertas', complete: processed }
  ];

  return (
    <main className="automation-page">
      <header className="automation-topbar">
        <a className="automation-brand" href="/">
          <span><Layers size={20} /></span>
          Fluxo<span>Claro</span>
        </a>
        <div className="automation-topbar-meta">
          <span className="automation-live-dot" />
          Demonstração interativa
          <a href="/">Voltar ao portfólio</a>
        </div>
      </header>

      <div className="automation-demo-notice">
        Demonstração fictícia: use apenas arquivos de teste. Não envie dados reais, senhas, dados bancários ou informações confidenciais nesta demonstração.
      </div>

      <section className="automation-intro">
        <div className="automation-container automation-intro-grid">
          <div>
            <span className="automation-eyebrow"><Sparkles size={15} /> Automação de relatórios</span>
            <h1>Sua planilha entra.<br /><em>As decisões saem.</em></h1>
            <p>Importe vendas em Excel ou CSV. A automação valida os dados, calcula os indicadores e entrega um resumo pronto para agir.</p>
          </div>
          <div className="automation-intro-result">
            <span>Tempo estimado nesta rotina</span>
            <strong>2 minutos</strong>
            <small>Em vez de horas conferindo linhas manualmente</small>
          </div>
        </div>
      </section>

      <section className="automation-flow">
        <div className="automation-container automation-flow-grid">
          {workflowSteps.map((step, index) => (
            <div className={`automation-flow-step ${step.complete ? 'is-complete' : ''}`} key={step.number}>
              <span className="automation-step-number">{step.complete ? <Check size={16} /> : step.number}</span>
              <div><strong>{step.title}</strong><small>{step.detail}</small></div>
              {index < workflowSteps.length - 1 && <ArrowRight className="automation-step-arrow" size={18} />}
            </div>
          ))}
        </div>
      </section>

      <div className="automation-container automation-dashboard">
        <section className="automation-source-card">
          <div className="automation-card-heading">
            <div>
              <span>01. Fonte de dados</span>
              <h2>Importe a planilha de vendas</h2>
            </div>
            <span className="automation-format-badge">XLSX · XLS · CSV</span>
          </div>

          <label className="automation-dropzone">
            <input type="file" accept=".csv,.txt,.xlsx,.xls" onChange={handleFileImport} />
            <span className="automation-upload-icon"><ClipboardList size={25} /></span>
            <span className="automation-dropzone-copy">
              <strong>Arraste ou escolha sua planilha</strong>
              <small>Use arquivos de teste; evite dados reais ou sensíveis</small>
            </span>
            <span className="automation-file-button">Escolher arquivo</span>
          </label>

          <div className="automation-file-status">
            <div><CheckCircle2 size={18} /><span><strong>{fileName}</strong><small>{importMessage}</small></span></div>
            <button onClick={restoreSample}>Usar dados de exemplo</button>
          </div>

          <div className="automation-columns">
            <span>Colunas esperadas</span>
            <div>{acceptedColumns.map((column) => <span key={column}><Check size={12} /> {column}</span>)}</div>
          </div>

          <div className="automation-preview-heading">
            <div><span>02. Validação</span><h3>Prévia dos dados reconhecidos</h3></div>
            <span>{rows.length} linhas válidas</span>
          </div>

          <div className="automation-table-wrap">
            <table>
              <thead><tr><th>Data</th><th>Cliente</th><th>Produto</th><th>Valor</th><th>Status</th></tr></thead>
              <tbody>
                {rows.slice(0, 5).map((row, index) => (
                  <tr key={`${row.client}-${index}`}>
                    <td>{formatDate(row.date)}</td><td>{row.client}</td><td>{row.product}</td>
                    <td>{parseCurrency(row.value)}</td>
                    <td><span className={`automation-status status-${normalizeText(row.status)}`}>{row.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <details className="automation-raw-data">
            <summary>Ver ou editar dados brutos</summary>
            <textarea value={rawData} onChange={(event) => { setRawData(event.target.value); setProcessed(false); }} />
          </details>

          <button className="automation-process-button" onClick={processData}>
            <Sparkles size={18} /> Processar e gerar relatório <ArrowRight size={18} />
          </button>
        </section>

        <aside className="automation-results">
          <div className="automation-results-heading">
            <div><span>03. Resultado</span><h2>Visão automática</h2></div>
            <span className={processed ? 'is-ready' : ''}>{processed ? 'Atualizado' : 'Aguardando'}</span>
          </div>

          <div className="automation-kpis">
            <article className="automation-kpi automation-kpi-main"><span>Faturamento confirmado</span><strong>{processed ? parseCurrency(revenue) : '---'}</strong><small>{paidRows.length} vendas pagas</small></article>
            <article className="automation-kpi"><span>Ticket médio</span><strong>{processed ? parseCurrency(averageTicket) : '---'}</strong><small>por venda paga</small></article>
            <article className="automation-kpi"><span>Pendências</span><strong>{processed ? pendingRows.length : '---'}</strong><small>precisam de cobrança</small></article>
            <article className="automation-kpi"><span>Cancelamentos</span><strong>{processed ? canceledRows.length : '---'}</strong><small>para analisar</small></article>
          </div>

          <article className="automation-action-card">
            <span className="automation-section-label">04. Próximas ações</span>
            <h3>O que merece atenção agora</h3>
            <div><Clock size={17} /><p><strong>Cobrar {pendingRows.length} pendência(s)</strong><span>Recupere vendas ainda não confirmadas.</span></p></div>
            <div><Activity size={17} /><p><strong>Revisar {canceledRows.length} cancelamento(s)</strong><span>Identifique possíveis motivos de perda.</span></p></div>
            <div><Mail size={17} /><p><strong>Compartilhar o resumo</strong><span>Envie os números consolidados ao gestor.</span></p></div>
          </article>
        </aside>
      </div>

      <section className="automation-analysis">
        <div className="automation-container automation-analysis-grid">
          <article className="automation-ranking-card">
            <div className="automation-card-heading">
              <div><span>Análise de produtos</span><h2>Faturamento por produto</h2></div>
            </div>
            <div className="automation-bars">
              {productRanking.map((item) => (
                <div key={item.name}>
                  <div><strong>{item.name}</strong><span>{item.quantity} vendas · {parseCurrency(item.total)}</span></div>
                  <span className="automation-bar-track"><i style={{ width: `${(item.total / highestProductTotal) * 100}%` }} /></span>
                </div>
              ))}
            </div>
          </article>

          <article className="automation-report-card">
            <div className="automation-report-header">
              <div><span>Relatório gerado</span><h2>Resumo para o gestor</h2></div>
              <button onClick={downloadReport}>Baixar .TXT</button>
            </div>
            <pre>{processed ? report : 'Processe os dados para gerar o relatório automático.'}</pre>
          </article>
        </div>
      </section>
    </main>
  );
};

export default ProcessAutomation;
