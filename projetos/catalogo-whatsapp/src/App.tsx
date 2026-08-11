import { useMemo, useState } from 'react';
import { CheckCircle2, Clock, Flame, MapPin, Phone, Star } from 'lucide-react';
import './App.css';

type Product = {
  id: string;
  name: string;
  category: 'Burgers' | 'Combos' | 'Bebidas';
  description: string;
  price: number;
  image: string;
  tag?: string;
};

type Cart = Record<string, number>;

const whatsappNumber = '5511988738676';

const buildProjectWhatsAppUrl = (context: string) => {
  const message = `Olá, Thiago! Vi a demonstração do Catálogo Digital com Pedido via WhatsApp (${context}) e tenho interesse em um projeto assim para o meu negócio. Pode me explicar os próximos passos?`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
};

const products: Product[] = [
  {
    id: 'smash-classic',
    name: 'Smash Classic',
    category: 'Burgers',
    description: 'Pão brioche, burger 120g, cheddar, cebola roxa e molho da casa.',
    price: 29.9,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
    tag: 'Mais vendido'
  },
  {
    id: 'duplo-bacon',
    name: 'Duplo Bacon',
    category: 'Burgers',
    description: 'Dois burgers, cheddar duplo, bacon crocante e barbecue defumado.',
    price: 39.9,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'chicken-crunch',
    name: 'Chicken Crunch',
    category: 'Burgers',
    description: 'Frango crocante, alface, queijo prato e maionese temperada.',
    price: 32.9,
    image: 'https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'combo-smash',
    name: 'Combo Smash',
    category: 'Combos',
    description: 'Smash Classic, batata média e refrigerante lata.',
    price: 44.9,
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=900&q=80',
    tag: 'Combo'
  },
  {
    id: 'combo-duplo',
    name: 'Combo Duplo',
    category: 'Combos',
    description: 'Duplo Bacon, batata grande, onion rings e refrigerante.',
    price: 59.9,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'cola-lata',
    name: 'Refrigerante Lata',
    category: 'Bebidas',
    description: 'Coca-Cola, Guaraná ou Sprite. Escolha o sabor no WhatsApp.',
    price: 7.9,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=900&q=80'
  }
];

const formatPrice = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export function App() {
  const [activeCategory, setActiveCategory] = useState<'Todos' | Product['category']>('Todos');
  const [cart, setCart] = useState<Cart>({});
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const categories: Array<'Todos' | Product['category']> = ['Todos', 'Burgers', 'Combos', 'Bebidas'];

  const filteredProducts = activeCategory === 'Todos'
    ? products
    : products.filter((product) => product.category === activeCategory);

  const cartItems = useMemo(
    () => products
      .filter((product) => cart[product.id])
      .map((product) => ({ ...product, quantity: cart[product.id] })),
    [cart]
  );

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (id: string) => {
    setCart((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart((current) => {
      const nextQuantity = (current[id] ?? 0) - 1;
      if (nextQuantity <= 0) {
        const nextCart = { ...current };
        delete nextCart[id];
        return nextCart;
      }
      return { ...current, [id]: nextQuantity };
    });
  };

  const finishOrder = () => {
    if (!cartItems.length || !name.trim() || !address.trim()) return;

    const itemsText = cartItems
      .map((item) => `• ${item.quantity}x ${item.name} - ${formatPrice(item.price * item.quantity)}`)
      .join('\n');

    const message = `Olá! Gostaria de fazer um pedido:\n\n*Itens:*\n${itemsText}\n\n*Total:* ${formatPrice(total)}\n*Cliente:* ${name}\n*Endereço:* ${address}\n*Observações:* ${notes || 'Nenhuma'}`;

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <main className="catalog-page">
      <header className="catalog-header">
        <a href="#inicio" className="catalog-logo">
          <Flame size={24} />
          Burger House
        </a>
        <nav>
          <a href="#cardapio">Cardápio</a>
          <a href="#pedido">Pedido</a>
          <a href="#contato">Contato</a>
        </nav>
        <a className="catalog-header-phone" href={buildProjectWhatsAppUrl('botão do topo')} target="_blank" rel="noreferrer">
          <Phone size={17} />
          Falar no WhatsApp
        </a>
      </header>

      <section id="inicio" className="catalog-hero">
        <div className="catalog-container catalog-hero-grid">
          <div className="catalog-hero-content">
            <span className="catalog-badge">
              <Star size={16} fill="currentColor" />
              Smash artesanal no seu bairro
            </span>
            <h1>Peça seu burger sem fila e sem confusão no chat.</h1>
            <p>
              Um cardápio digital com carrinho para o cliente escolher os produtos, revisar o total e enviar o pedido
              pronto para o WhatsApp da loja.
            </p>
            <div className="catalog-hero-actions">
              <a href="#cardapio" className="catalog-btn catalog-btn-primary">Ver cardápio</a>
              <a href="#pedido" className="catalog-btn catalog-btn-secondary">Ver carrinho</a>
            </div>
          </div>
          <div className="catalog-hero-card">
            <img src="https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?auto=format&fit=crop&w=1000&q=80" alt="Hambúrguer artesanal com batata frita" />
            <div className="catalog-hero-price">
              <span>Combo do dia</span>
              <strong>R$ 44,90</strong>
            </div>
            <div className="catalog-delivery-card">
              <Clock size={18} />
              <span>Entrega média: 35 min</span>
            </div>
          </div>
        </div>
      </section>

      <section id="cardapio" className="catalog-section">
        <div className="catalog-container">
          <div className="catalog-section-title">
            <span>Cardápio digital</span>
            <h2>Escolha seus favoritos</h2>
          </div>

          <div className="catalog-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={activeCategory === category ? 'active' : ''}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="catalog-products-grid">
            {filteredProducts.map((product) => (
              <article className="catalog-product-card" key={product.id}>
                <div className="catalog-product-image">
                  <img src={product.image} alt={product.name} />
                  {product.tag && <span>{product.tag}</span>}
                </div>
                <div className="catalog-product-content">
                  <div>
                    <small>{product.category}</small>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </div>
                  <div className="catalog-product-footer">
                    <strong>{formatPrice(product.price)}</strong>
                    {(cart[product.id] ?? 0) > 0 ? (
                      <div className="catalog-product-stepper" aria-label={`Quantidade de ${product.name} no carrinho`}>
                        <button
                          type="button"
                          onClick={() => removeFromCart(product.id)}
                          aria-label={`Remover uma unidade de ${product.name}`}
                        >
                          −
                        </button>
                        <span>
                          <strong>{cart[product.id]}</strong>
                          <small>no carrinho</small>
                        </span>
                        <button
                          type="button"
                          onClick={() => addToCart(product.id)}
                          aria-label={`Adicionar mais uma unidade de ${product.name}`}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => addToCart(product.id)}>Adicionar</button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pedido" className="catalog-section catalog-order-section">
        <div className="catalog-container catalog-order-grid">
          <div className="catalog-order-panel">
            <span className="catalog-kicker">Carrinho</span>
            <h2>Seu pedido</h2>
            <p>Revise os itens selecionados e preencha os dados de entrega.</p>

            <div className="catalog-cart-list">
              {cartItems.length ? (
                cartItems.map((item) => (
                  <div className="catalog-cart-item" key={item.id}>
                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.quantity}x {formatPrice(item.price)}</span>
                    </div>
                    <div className="catalog-quantity">
                      <button onClick={() => removeFromCart(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => addToCart(item.id)}>+</button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="catalog-empty">Seu carrinho está vazio.</p>
              )}
            </div>

            <div className="catalog-total">
              <span>{itemCount} item(ns)</span>
              <strong>{formatPrice(total)}</strong>
            </div>
          </div>

          <div className="catalog-form-panel">
            <label>
              Seu Nome
              <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Ex: Ana Souza" />
            </label>
            <label>
              Endereço de Entrega
              <input value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Ex: Rua das Flores, 123 - Bloco B" />
            </label>
            <label>
              Observações (opcional)
              <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Ex: Sem cebola, trocar refrigerante..." />
            </label>
            <button className="catalog-finish-btn" onClick={finishOrder} disabled={!cartItems.length || !name.trim() || !address.trim()}>
              Enviar pedido pelo WhatsApp
            </button>
            <div className="catalog-benefits">
              <span><CheckCircle2 size={16} /> Envio direto ao WhatsApp da loja</span>
              <span><CheckCircle2 size={16} /> Sem cadastro demorado</span>
              <span><CheckCircle2 size={16} /> Confirmação rápida</span>
            </div>
          </div>
        </div>
      </section>

      <footer id="contato" className="catalog-footer">
        <div className="catalog-container">
          <div>
            <strong>Burger House</strong>
            <span><MapPin size={15} /> Rua Exemplo, 123 - São Paulo</span>
          </div>
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">
            Fale Conosco
          </a>
        </div>
      </footer>
    </main>
  );
}

export default App;
