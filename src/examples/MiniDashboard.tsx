import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Activity, ArrowRight, CalendarCheck, CheckCircle2, ClipboardList, Clock, User } from 'lucide-react';
import './MiniDashboard.css';

type Sale = {
  id: number;
  date: string;
  product: string;
  value: number;
};

const initialSales: Sale[] = [
  { id: 1, date: '2026-06-01', product: 'Combo Executivo', value: 89.9 },
  { id: 2, date: '2026-06-03', product: 'Plano Mensal', value: 249.9 },
  { id: 3, date: '2026-06-05', product: 'Combo Executivo', value: 89.9 },
  { id: 4, date: '2026-06-08', product: 'Produto Avulso', value: 59.9 },
  { id: 5, date: '2026-06-11', product: 'Plano Mensal', value: 249.9 },
  { id: 6, date: '2026-06-14', product: 'Combo Executivo', value: 89.9 }
];

const products = ['Combo Executivo', 'Plano Mensal', 'Produto Avulso', 'Serviço Premium'];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit' }).format(new Date(`${date}T12:00:00`));

export const MiniDashboard = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [sales, setSales] = useState<Sale[]>(initialSales);
  const [product, setProduct] = useState(products[0]);
  const [value, setValue] = useState('89.90');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.value, 0);
  const averageTicket = sales.length ? totalRevenue / sales.length : 0;

  const chartData = useMemo(() => {
    const grouped = sales.reduce<Record<string, number>>((acc, sale) => {
      acc[sale.date] = (acc[sale.date] ?? 0) + sale.value;
      return acc;
    }, {});

    const entries = Object.entries(grouped)
      .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
      .slice(-7);
    const max = Math.max(...entries.map(([, amount]) => amount), 1);

    return entries.map(([saleDate, amount]) => ({
      date: saleDate,
      amount,
      height: Math.max(12, Math.round((amount / max) * 100))
    }));
  }, [sales]);

  const topProducts = useMemo(() => {
    const grouped = sales.reduce<Record<string, { quantity: number; revenue: number }>>((acc, sale) => {
      const current = acc[sale.product] ?? { quantity: 0, revenue: 0 };
      acc[sale.product] = {
        quantity: current.quantity + 1,
        revenue: current.revenue + sale.value
      };
      return acc;
    }, {});

    return Object.entries(grouped)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 4);
  }, [sales]);

  const handleAddSale = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedValue = Number(value.replace(',', '.'));
    if (!product || !date || Number.isNaN(parsedValue) || parsedValue <= 0) return;

    setSales((current) => [
      { id: Date.now(), date, product, value: parsedValue },
      ...current
    ]);
  };

  if (!isLogged) {
    return (
      <main className="dash-login-page">
        <section className="dash-login-card">
          <div className="dash-login-brand">
            <Activity size={30} />
            <span>Pulse Commerce</span>
          </div>
          <div className="dash-demo-notice">
            Demonstração fictícia: os dados exibidos são exemplos e não representam uma empresa real.
          </div>
          <h1>Painel enxuto para acompanhar vendas sem depender de planilhas.</h1>
          <p>
            Demo de dashboard para pequenos negócios: registre vendas, visualize faturamento mensal e veja os produtos
            mais vendidos em poucos cliques.
          </p>
          <div className="dash-login-preview">
            <span><CheckCircle2 size={16} /> Login administrativo</span>
            <span><CheckCircle2 size={16} /> Gráfico de faturamento</span>
            <span><CheckCircle2 size={16} /> Ranking de produtos</span>
          </div>
          <button className="dash-login-button" onClick={() => setIsLogged(true)}>
            Entrar na demo
            <ArrowRight size={18} />
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="dash-page">
      <aside className="dash-sidebar">
        <div className="dash-sidebar-logo">
          <Activity size={24} />
          <span>Pulse</span>
        </div>
        <nav>
          <a className="active" href="#resumo"><ClipboardList size={17} /> Resumo</a>
          <a href="#vendas"><CalendarCheck size={17} /> Nova venda</a>
          <a href="#produtos"><Activity size={17} /> Produtos</a>
        </nav>
        <button onClick={() => setIsLogged(false)}>
          <User size={17} />
          Sair
        </button>
      </aside>

      <section className="dash-content">
        <header className="dash-topbar">
          <div>
            <span>Dashboard administrativo</span>
            <h1>Controle de vendas</h1>
            <small>Demonstração fictícia com dados de exemplo.</small>
          </div>
          <div className="dash-date-pill">
            <Clock size={17} />
            Atualizado agora
          </div>
        </header>

        <section id="resumo" className="dash-metrics-grid">
          <article className="dash-metric-card primary">
            <span>Faturamento do mês</span>
            <strong>{formatCurrency(totalRevenue)}</strong>
            <small>Baseado nas vendas registradas</small>
          </article>
          <article className="dash-metric-card">
            <span>Vendas registradas</span>
            <strong>{sales.length}</strong>
            <small>Entradas no painel</small>
          </article>
          <article className="dash-metric-card">
            <span>Ticket médio</span>
            <strong>{formatCurrency(averageTicket)}</strong>
            <small>Média por venda</small>
          </article>
        </section>

        <section className="dash-main-grid">
          <article className="dash-panel dash-chart-panel">
            <div className="dash-panel-title">
              <div>
                <span>Faturamento</span>
                <h2>Últimos lançamentos</h2>
              </div>
              <strong>{formatCurrency(totalRevenue)}</strong>
            </div>

            <div className="dash-chart">
              {chartData.map((item) => (
                <div className="dash-chart-item" key={item.date}>
                  <div className="dash-chart-bar" style={{ height: `${item.height}%` }}>
                    <span>{formatCurrency(item.amount)}</span>
                  </div>
                  <small>{formatDate(item.date)}</small>
                </div>
              ))}
            </div>
          </article>

          <article id="vendas" className="dash-panel dash-form-panel">
            <span>Entrada rápida</span>
            <h2>Registrar venda</h2>
            <form onSubmit={handleAddSale}>
              <label>
                Produto
                <select value={product} onChange={(event) => setProduct(event.target.value)}>
                  {products.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label>
                Valor
                <input value={value} onChange={(event) => setValue(event.target.value)} inputMode="decimal" />
              </label>
              <label>
                Data
                <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
              </label>
              <button type="submit">Adicionar venda</button>
            </form>
          </article>
        </section>

        <section id="produtos" className="dash-lower-grid">
          <article className="dash-panel">
            <div className="dash-panel-title">
              <div>
                <span>Produtos</span>
                <h2>Mais vendidos</h2>
              </div>
            </div>
            <div className="dash-product-list">
              {topProducts.map((item, index) => (
                <div className="dash-product-row" key={item.name}>
                  <span className="dash-rank">{index + 1}</span>
                  <div>
                    <strong>{item.name}</strong>
                    <small>{item.quantity} venda(s) • {formatCurrency(item.revenue)}</small>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="dash-panel">
            <div className="dash-panel-title">
              <div>
                <span>Histórico</span>
                <h2>Últimas vendas</h2>
              </div>
            </div>
            <div className="dash-sales-table">
              {sales.slice(0, 6).map((sale) => (
                <div className="dash-sale-row" key={sale.id}>
                  <span>{formatDate(sale.date)}</span>
                  <strong>{sale.product}</strong>
                  <em>{formatCurrency(sale.value)}</em>
                </div>
              ))}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
};

export default MiniDashboard;
