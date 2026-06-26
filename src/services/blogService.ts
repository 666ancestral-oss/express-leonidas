import { getItem, setItem, removeItem } from './storage';
import type { BlogPost } from './types';

const POSTS_KEY = 'blog-posts';
const IMAGE_PREFIX = 'blog-image-';

export const SEED_POSTS: Omit<BlogPost, 'id' | 'slug' | 'publishedAt' | 'updatedAt'>[] = [
  {
    title: 'Como Escolher a Transportadora Ideal para Sua Empresa',
    excerpt: 'Descubra os critérios essenciais para selecionar uma transportadora confiável e garantir que suas cargas cheguem ao destino com segurança, pontualidade e custo justo.',
    content: `## Por que a escolha da transportadora é estratégica?

A escolha da transportadora certa vai muito além do preço do frete. Uma decisão mal planejada pode resultar em atrasos, avarias, insatisfação dos clientes e prejuízos financeiros. Por outro lado, uma transportadora alinhada com as necessidades do seu negócio se torna uma vantagem competitiva.

## Critérios essenciais para avaliar

### 1. Experiência e reputação no mercado
Antes de contratar, pesquise a reputação da transportadora. Avaliações em sites, redes sociais e referências de outros clientes são fontes valiosas. Empresas consolidadas como a Expresso Leonidas construíram sua trajetória com base em confiança e resultados.

### 2. Cobertura geográfica
Sua transportadora atende exatamente as regiões que você precisa? Verifique se a cobertura inclui as rotas que sua empresa utiliza, sejam elas urbanas, intermunicipais ou interestaduais. Uma transportadora com atuação nacional oferece mais flexibilidade para expansion.

### 3. Tipos de carga oferecidos
Cada negócio tem necessidades específicas. Carga fechada, fracionada, mudanças comerciais ou transporte de máquinas pesadas — certifique-se de que a transportadora possui estrutura para o seu tipo de carga.

### 4. Segurança e seguro de carga
A segurança da sua carga é inegociável. Verifique se a transportadora oferece seguro de carga, monitoramento em tempo real e protocolos de segurança em todas as etapas do transporte.

### 5. Pontualidade e cumprimento de prazos
Atrasos na entrega afetam diretamente a satisfação do cliente final. Pergunte sobre a taxa de entregas no prazo e como a transportadora lida com imprevistos logísticos.

## Como a Expresso Leonidas se destaca

A Expresso Leonidas combina mais de 5.000 entregas realizadas com 98% de satisfação dos clientes. Oferecemos monitoramento 24 horas, motoristas qualificados e atendimento personalizado em todo o território nacional.

Solicite uma cotação e descubra como podemos transformar sua logística.`,
    tags: ['transportadora', 'logística', 'escolha transportadora', 'frete'],
    seoTitle: 'Como Escolher a Transportadora Ideal | Expresso Leonidas',
    seoDescription: 'Guia completo com critérios essenciais para escolher a transportadora ideal para sua empresa. Saiba como avaliar reputação, cobertura, segurança e pontualidade.',
    published: true,
    image: '',
  },
  {
    title: 'Carga Fechada vs Carga Fracionada: Qual a Melhor Opção?',
    excerpt: 'Entenda as diferenças entre carga fechada e fracionada e descubra qual modalidade atende melhor às necessidades logísticas da sua empresa, equilibrando custo e eficiência.',
    content: `## Entendendo os tipos de carga

Na hora de contratar o transporte de mercadorias, uma das primeiras decisões é escolher entre carga fechada e carga fracionada. Cada modalidade tem vantagens específicas e a escolha certa depende do volume, urgência e orçamento disponível.

## Carga Fechada (FTL — Full Truck Load)

Na carga fechada, o veículo é dedicado exclusivamente ao seu lote de mercadorias, do ponto de coleta até o destino final.

### Vantagens:
- **Exclusividade:** seu produto ocupa todo o espaço do veículo
- **Menos manuseio:** a carga é carregada uma única vez, reduzindo risco de avarias
- **Velocidade:** sem paradas adicionais para coleta de outras cargas
- **Segurança:** maior controle sobre a integridade da carga

### Ideal para:
- Grandes volumes que ocupam espaços significativos do veículo
- Cargas urgentes que não podem sofrer atrasos
- Produtos de alto valor ou que exigem cuidados especiais
- Empresas com remessas frequentes para o mesmo destino

## Carga Fracionada (LTL — Less Than Truck Load)

Na carga fracionada, o espaço do veículo é compartilhado com mercadorias de outros clientes, otimizando custos.

### Vantagens:
- **Custo reduzido:** você paga apenas pelo espaço que sua carga ocupa
- **Flexibilidade:** ideal para pequenos e médios volumes
- **Frequência:** possibilidade de envios mais frequentes sem esperar fechar um lote

### Ideal para:
- Pequenas e médias empresas com volumes menores
- Remessas que não preenchem um veículo inteiro
- Empresas que precisam de envios frequentes e regulares
- Otimização do orçamento logístico

## Qual escolher?

A decisão entre carga fechada e fracionada deve considerar:

- **Volume da carga:** calcule se sua mercadoria ocupa espaço suficiente para justificar um veículo dedicado
- **Urgência:** cargas urgentes se beneficiam da carga fechada
- **Orçamento:** a carga fracionada é mais econômica para volumes menores
- **Valor da mercadoria:** itens de alto valor podem justificar o custo extra da exclusividade

## Conte com a Expresso Leonidas

Oferecemos ambas as modalidades com a mesma qualidade e compromisso. Nossa equipe avalia cada caso para recomendar a solução mais adequada, equilibrando custo e eficiência.

Solicite uma cotação e descubra a melhor opção para sua carga.`,
    tags: ['carga fechada', 'carga fracionada', 'FTL', 'LTL', 'transporte de cargas'],
    seoTitle: 'Carga Fechada vs Fracionada: Qual Escolher? | Expresso Leonidas',
    seoDescription: 'Compare carga fechada e fracionada: vantagens, desvantagens e qual modalidade atende melhor suas necessidades logísticas. Guia completo da Expresso Leonidas.',
    published: true,
    image: '',
  },
  {
    title: 'Logística Empresarial: Como Otimizar o Transporte da Sua Empresa',
    excerpt: 'Estratégias práticas para reduzir custos, aumentar a eficiência e melhorar a gestão do transporte na sua empresa, com dicas aplicáveis a negócios de todos os portes.',
    content: `## A logística como vantagem competitiva

Em um mercado cada vez mais competitivo, a logística deixou de ser apenas um centro de custo para se tornar um diferencial estratégico. Empresas que otimizam seus processos de transporte ganham em eficiência, satisfação do cliente e margem de lucro.

## 5 estratégias para otimizar sua logística

### 1. Planejamento de rotas inteligente
Rotas mal planejadas geram desperdício de combustível, tempo e desgaste da frota. Invista em ferramentas de roteirização ou parcele com transportadoras que já utilizam tecnologia para otimizar trajetos.

### 2. Consolidação de cargas
Sempre que possível, consolide remessas para otimizar o espaço dos veículos. A carga fracionada é uma excelente alternativa para empresas que não têm volume fechado, permitindo compartilhar o espaço e reduzir custos.

### 3. Monitoramento em tempo real
A visibilidade sobre a localização e o status da carga é essencial. Sistemas de rastreamento permitem antecipar problemas, comunicar clientes com precisão e tomar decisões rápidas.

### 4. Parcerias estratégicas com transportadoras
Manter uma relação próxima com transportadoras de confiança garante prioridade, melhores condições comerciais e maior previsibilidade. A Expresso Leonidas, por exemplo, constrói parcerias de longo prazo com seus clientes.

### 5. Documentação e processos padronizados
A desorganização documental é uma das maiores causas de atrasos na logística. Padronize processos de emissão de notas fiscais, conhecimentos de transporte e comprovantes de entrega.

## Indicadores que você deve acompanhar

Para saber se sua logística está realmente otimizada, monitore estes KPIs:

- **Taxa de entregas no prazo:** ideal acima de 95%
- **Custo por quilograma transportado:** acompanhe a evolução mensal
- **Índice de avarias:** mantenha abaixo de 1%
- **Tempo médio de entrega:** por rota e modalidade
- **Satisfação do cliente final:** pesquisas pós-entrega

## Como a Expresso Leonidas pode ajudar

Com experiência em logística empresarial, a Expresso Leonidas oferece soluções completas de transporte, desde a coleta até a entrega final, com monitoramento 24 horas e suporte especializado.

Solicite uma cotação personalizada e transforme sua logística em vantagem competitiva.`,
    tags: ['logística empresarial', 'otimização logística', 'gestão de transporte', 'KPI logística'],
    seoTitle: 'Logística Empresarial: Como Otimizar o Transporte | Expresso Leonidas',
    seoDescription: 'Estratégias práticas para otimizar o transporte da sua empresa: redução de custos, monitoramento em tempo real, KPIs e parcerias estratégicas.',
    published: true,
    image: '',
  },
  {
    title: 'Seguro de Carga: Tudo que Sua Empresa Precisa Saber',
    excerpt: 'Guia completo sobre seguro de carga no transporte rodoviário: obrigações, coberturas, tipos de apólice e como proteger sua mercadoria contra imprevistos.',
    content: `## Por que o seguro de carga é fundamental?

O transporte de mercadorias envolve riscos — roubos, acidentes, avarias e até fenômenos naturais. O seguro de carga é a ferramenta que protege seu negócio contra esses imprevistos, garantindo que você não arque com prejuízos que podem comprometer o fluxo de caixa.

## O que diz a lei?

No Brasil, o seguro de carga é obrigatório para o transporte rodoviário de cargas, conforme estabelece a Lei nº 11.442/2007 e a Resolução ANTT nº 5.999/2022. O contratante do serviço de transporte é responsável por contratar o seguro adequado.

## Tipos de cobertura

### 1. RCTR-C (Responsabilidade Civil do Transportador Rodoviário - Carga)
Cobre avarias e perdas decorrentes de acidentes com o veículo, como colisões, capotamentos e incêndios. É obrigatório por lei.

### 2. RCTR-VI (Responsabilidade Civil do Transportador Rodoviário - Viagem)
Cobre roubo e furto da carga, incluindo apropriação indébita. Altamente recomendado para rotas de maior risco.

### 3. Seguro Opcional (ou Seguro Adicional)
Cobre eventos não incluídos nas apólices básicas, como danos causados por fenômenos da natureza, greves e tumultos.

## Documentos necessários para contratação

Para contratar o seguro de carga, você precisará de:

- Nota Fiscal da mercadoria
- Conhecimento de Transporte Eletrônico (CT-e)
- Valor da mercadoria e descrição detalhada
- Dados de origem e destino do transporte

## Dicas para escolher o seguro ideal

**Avalie o valor da mercadoria:** o valor segurado deve cobrir integralmente o custo da carga, incluindo impostos e margem de lucro.

**Considere a rota:** rotas com maior incidência de roubos exigem coberturas mais abrangentes.

**Verifique as exclusões:** toda apólice tem exclusões. Leia atentamente para saber o que não está coberto.

**Conte com uma transportadora parceira:** transportadoras experientes como a Expresso Leonidas orientam seus clientes sobre as melhores práticas de seguro para cada tipo de carga.

## A Expresso Leonidas e a segurança da sua carga

A Expresso Leonidas trabalha com seguro de carga em todas as operações, garantindo tranquilidade desde a coleta até a entrega final. Nossa equipe oferece suporte completo na documentação e orientação sobre coberturas.

Solicite uma cotação e descubra como transportamos sua carga com segurança e confiança.`,
    tags: ['seguro de carga', 'RCTR-C', 'transporte de cargas', 'seguro transporte'],
    seoTitle: 'Seguro de Carga: Guia Completo | Expresso Leonidas',
    seoDescription: 'Tudo sobre seguro de carga no transporte rodoviário: tipos de cobertura, obrigações legais, documentos necessários e dicas para escolher a melhor proteção.',
    published: true,
    image: '',
  },
  {
    title: 'Transporte de Máquinas e Equipamentos Pesados: Desafios e Soluções',
    excerpt: 'Saiba quais são os principais desafios logísticos no transporte de máquinas pesadas e como escolher a transportadora certa para garantir segurança e eficiência.',
    content: `## Um segmento que exige expertise

O transporte de máquinas e equipamentos pesados é um dos segmentos mais desafiadores da logística. Diferente de cargas convencionais, essas operações envolvem peças de grande porte, alto valor agregado e necessidades específicas de manuseio, amarração e documentação.

## Principais desafios

### 1. Excesso de dimensões e peso
Máquinas industriais, equipamentos agrícolas e peças de grande porte frequentemente excedem os limites legais de dimensão e peso. Isso exige veículos especiais, como carretas prancha, reboques articulados e caminhões com capacidade de carga elevada.

### 2. Licenciamento e documentação
Cargas excedentes requerem Autorização Especial de Trânsito (AET), emitida pelos órgãos rodoviários. O processo envolve análise de rota, definição de horários restritos e, em alguns casos, escolta veicular obrigatória.

### 3. Amarração e segurança
A fixação inadequada de máquinas pesadas pode resultar em deslocamentos durante o trajeto, causando acidentes graves. Técnicas profissionais de amarração com cintas, correntes e calços são indispensáveis.

### 4. Roteirização especializada
Pontes com limite de peso, viadutos baixos, curvas fechadas e estradas estreitas precisam ser mapeados previamente. Uma roteirização mal feita coloca a carga e terceiros em risco.

## Soluções que fazem a diferença

### Planejamento integrado
Uma transportadora especializada realiza uma análise completa antes da operação: dimensões da carga, pontos de acesso, restrições de rota e documentação necessária.

### Equipamentos adequados
O uso de veículos apropriados — como carretas prancha de 2 e 3 eixos, reboques telescópicos e cavalos mecânicos de alta potência — garante estabilidade e segurança.

### Equipe especializada
Motoristas com treinamento específico para transporte de cargas pesadas e equipe de carga devidamente equipada fazem toda a diferença no resultado final.

### Seguro diferenciado
Cargas de alto valor exigem apólices de seguro específicas, com cobertura ampla que inclua transporte, operações de carga e descarga, e eventual armazenamento temporário.

## Por que contratar a Expresso Leonidas?

A Expresso Leonidas possui frota preparada e equipe experiente no transporte de máquinas e equipamentos pesados. Cuidamos de toda a documentação, roteirização e execução para que sua máquina chegue ao destino com total segurança.

Solicite uma cotação e descubra a solução ideal para sua carga pesada.`,
    tags: ['transporte de máquinas', 'cargas pesadas', 'logística industrial', 'AET'],
    seoTitle: 'Transporte de Máquinas Pesadas: Desafios e Soluções | Expresso Leonidas',
    seoDescription: 'Guia completo sobre transporte de máquinas e equipamentos pesados: desafios logísticos, documentação, segurança e como escolher a transportadora ideal.',
    published: true,
    image: '',
  },
  {
    title: 'A Importância do Monitoramento em Tempo Real no Transporte de Cargas',
    excerpt: 'Entenda como o rastreamento em tempo real revoluciona a logística, reduz perdas, aumenta a eficiência e traz tranquilidade para embarcadores e destinatários.',
    content: `## Tecnologia a serviço da logística

O monitoramento em tempo real deixou de ser um diferencial para se tornar uma exigência no transporte de cargas. Com a evolução da tecnologia embarcada e dos sistemas de gestão, hoje é possível saber exatamente onde cada carga está, em que condições e qual a previsão de chegada.

## Benefícios do monitoramento em tempo real

### Redução de roubos e sinistros
O Brasil registra milhares de ocorrências de roubo de carga todos os anos. Sistemas de rastreamento com cerca eletrônica, bloqueio remoto e sensor de abertura de porta reduzem drasticamente o risco. Em caso de desvio de rota, a central é alertada instantaneamente.

### Previsibilidade para o cliente final
Compartilhar a localização da carga com o destinatário gera confiança e elimina a ansiedade de "onde está minha mercadoria?". O cliente acompanha cada etapa e pode se planejar para o recebimento.

### Eficiência operacional
Com dados de rota em tempo real, é possível identificar desvios, congestionamentos e atrasos com antecedência. A central de operações pode agir proativamente, replanejando rotas ou comunicando clientes sobre novos prazos.

### Tomada de decisão baseada em dados
O histórico de monitoramento gera insights valiosos: rotas mais eficientes, horários de menor tráfego, desempenho de motoristas e regiões de maior risco. Esses dados alimentam a melhoria contínua da operação.

## Tecnologias utilizadas

### GPS veicular
O sistema mais difundido, com cobertura nacional e precisão de metros. Integrado a sensores de temperatura, porta e combustível, oferece visão completa da operação.

### Telemetria
Captura dados do veículo como velocidade, consumo de combustível, frenagens bruscas e tempo de motor ligado. Essencial para gestão de frota e segurança.

### Câmeras embarcadas
Imagens em tempo real da cabine e da carga auxiliam na prevenção de sinistros e na apuração de responsabilidades em caso de ocorrências.

### Aplicativos para o destinatário
Portais e apps permitem que o cliente acompanhe a entrega em tempo real, receba notificações de chegada e avalie o serviço prestado.

## A Expresso Leonidas e o monitoramento 24 horas

Na Expresso Leonidas, todas as cargas são monitoradas 24 horas por dia, 7 dias por semana. Nossa central de operações acompanha cada etapa do transporte, desde a coleta até a entrega final, garantindo visibilidade total para o cliente.

Entre em contato e descubra como nossa tecnologia pode trazer mais segurança e tranquilidade para sua operação.`,
    tags: ['monitoramento', 'rastreamento', 'segurança logística', 'tecnologia'],
    seoTitle: 'Monitoramento em Tempo Real no Transporte de Cargas | Expresso Leonidas',
    seoDescription: 'Descubra como o monitoramento em tempo real revoluciona a logística: redução de roubos, previsibilidade, eficiência operacional e tecnologias como GPS e telemetria.',
    published: true,
    image: '',
  },
];

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function hydratePost(p: BlogPost): BlogPost {
  return { ...p, image: getPostImage(p.id) };
}

export function ensurePostsSeeded(): void {
  const existing = getItem<BlogPost[]>(POSTS_KEY, []);
  if (existing.length > 0) return;
  for (const data of SEED_POSTS) {
    createPost(data);
  }
}

export function getPosts(): BlogPost[] {
  ensurePostsSeeded();
  return getItem<BlogPost[]>(POSTS_KEY, []).map(hydratePost);
}

export function getPublishedPosts(): BlogPost[] {
  return getPosts().filter(p => p.published).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const post = getItem<BlogPost[]>(POSTS_KEY, []).find(p => p.slug === slug);
  return post ? hydratePost(post) : undefined;
}

export function getPostById(id: string): BlogPost | undefined {
  const post = getItem<BlogPost[]>(POSTS_KEY, []).find(p => p.id === id);
  return post ? hydratePost(post) : undefined;
}

export function savePostImage(id: string, dataUrl: string): boolean {
  if (!dataUrl) return true;
  return setItem(IMAGE_PREFIX + id, dataUrl);
}

export function getPostImage(id: string): string {
  return getItem(IMAGE_PREFIX + id, '');
}

export function deletePostImage(id: string): void {
  removeItem(IMAGE_PREFIX + id);
}

export interface SaveResult {
  success: boolean;
  imageSaved: boolean;
  post?: BlogPost;
}

export function createPost(data: Omit<BlogPost, 'id' | 'slug' | 'publishedAt' | 'updatedAt'>): SaveResult {
  const posts = getItem<BlogPost[]>(POSTS_KEY, []);
  const now = new Date().toISOString();
  let slug = slugify(data.title);

  if (posts.some(p => p.slug === slug)) {
    slug += '-' + Date.now().toString(36);
  }

  const post: BlogPost = {
    ...data,
    image: '',
    id: generateId(),
    slug,
    publishedAt: data.published ? now : '',
    updatedAt: now,
  };

  posts.push(post);
  const postSaved = setItem(POSTS_KEY, posts);

  let imageSaved = true;
  if (data.image) {
    imageSaved = savePostImage(post.id, data.image);
  }

  return { success: postSaved, imageSaved, post: postSaved ? { ...post, image: data.image || '' } : undefined };
}

export function updatePost(id: string, data: Partial<Omit<BlogPost, 'id' | 'slug' | 'publishedAt' | 'updatedAt'>>): SaveResult {
  const posts = getItem<BlogPost[]>(POSTS_KEY, []);
  const idx = posts.findIndex(p => p.id === id);
  if (idx === -1) return { success: false, imageSaved: false };

  const now = new Date().toISOString();
  const { image: newImage, ...rest } = data as any;

  posts[idx] = {
    ...posts[idx],
    ...rest,
    image: '',
    updatedAt: now,
    publishedAt: data.published && !posts[idx].publishedAt ? now : posts[idx].publishedAt,
    published: data.published ?? posts[idx].published,
  };

  const postSaved = setItem(POSTS_KEY, posts);

  let imageSaved = true;
  if (newImage !== undefined) {
    if (newImage) {
      imageSaved = savePostImage(id, newImage);
    } else {
      deletePostImage(id);
    }
  }

  return {
    success: postSaved,
    imageSaved,
    post: postSaved ? { ...posts[idx], image: newImage ?? getPostImage(id) } : undefined,
  };
}

export function deletePost(id: string): void {
  const posts = getItem<BlogPost[]>(POSTS_KEY, []).filter(p => p.id !== id);
  setItem(POSTS_KEY, posts);
  deletePostImage(id);
}
