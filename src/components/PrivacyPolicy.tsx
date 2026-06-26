import { ArrowLeft } from 'lucide-react';
import styles from './PrivacyPolicy.module.css';
import { SITE_CONFIG } from '../shared/constants';

const CONTROLLER = 'Expresso Leonidas';
const CONTROLLER_EMAIL = SITE_CONFIG.email;
const LAST_UPDATED = 'Junho de 2026';

function PrivacyPolicy() {
  return (
    <article className={styles.page}>
      <div className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <a href="/" className={styles.backLink}>
            <ArrowLeft size={20} aria-hidden="true" />
            Voltar para o site
          </a>
          <h1 className={styles.title}>Política de Privacidade</h1>
          <p className={styles.lastUpdated}>Última atualização: {LAST_UPDATED}</p>
        </div>
      </div>

      <div className={`container ${styles.content}`}>
        <section className={styles.section}>
          <h2>1. Quem somos</h2>
          <p>
            O <strong>{CONTROLLER}</strong> é uma empresa de logística e transporte de cargas
            com atuação em todo o território nacional. Esta Política de Privacidade explica
            como coletamos, usamos, armazenamos e protegemos seus dados pessoais em
            conformidade com a <strong>Lei Geral de Proteção de Dados Pessoais (LGPD – Lei nº 13.709/2018)</strong>.
          </p>
          <p>
            Ao utilizar nosso site ou contratar nossos serviços, você confia seus dados
            a nós. Nosso compromisso é tratá-los com transparência, segurança e respeito.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Dados que coletamos</h2>
          <p>Podemos coletar os seguintes dados pessoais fornecidos voluntariamente por você:</p>
          <ul>
            <li><strong>Dados de identificação:</strong> nome completo, CPF/CNPJ, RG, endereço</li>
            <li><strong>Dados de contato:</strong> telefone, WhatsApp, e-mail</li>
            <li><strong>Dados de navegação:</strong> endereço IP, tipo de navegador, páginas acessadas, tempo de sessão</li>
            <li><strong>Dados de contratação:</strong> informações sobre cargas, origem, destino e histórico de fretes</li>
            <li><strong>Dados de comunicação:</strong> mensagens trocadas via formulário de contato, WhatsApp ou e-mail</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. Como utilizamos seus dados</h2>
          <p>Seus dados são utilizados para as seguintes finalidades:</p>
          <ul>
            <li>Prestar serviços de logística e transporte de cargas</li>
            <li>Elaborar cotações e propostas comerciais</li>
            <li>Responder a solicitações feitas via formulário de contato ou WhatsApp</li>
            <li>Manter comunicação sobre o andamento de fretes e entregas</li>
            <li>Cumprir obrigações legais e fiscais</li>
            <li>Melhorar nossos serviços e a experiência do usuário no site</li>
            <li>Enviar comunicações institucionais, se autorizado</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. Base legal para o tratamento</h2>
          <p>
            De acordo com a LGPD, tratamos seus dados pessoais com base nas seguintes
            hipóteses legais (Art. 7º):
          </p>
          <ul>
            <li><strong>Execução de contrato:</strong> para prestação dos serviços contratados</li>
            <li><strong>Consentimento:</strong> para comunicações de marketing e cookies não essenciais</li>
            <li><strong>Obrigação legal:</strong> para cumprimento de obrigações fiscais e regulatórias</li>
            <li><strong>Legítimo interesse:</strong> para melhoria dos serviços e segurança do site</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>5. Compartilhamento de dados</h2>
          <p>
            Não vendemos seus dados pessoais. Podemos compartilhar seus dados com:
          </p>
          <ul>
            <li>Prestadores de serviços essenciais (operadores logísticos parceiros)</li>
            <li>Autoridades públicas, quando exigido por lei</li>
            <li>Ferramentas de análise e tecnologia (Google Analytics, hospedagem) que operam como operadores</li>
          </ul>
          <p>
            Todos os parceiros estão contratualmente obrigados a proteger seus dados
            e a tratá-los apenas para as finalidades estabelecidas.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Cookies</h2>
          <p>
            Utilizamos cookies e tecnologias similares para melhorar sua experiência
            de navegação. Os cookies são pequenos arquivos de texto armazenados no
            seu navegador.
          </p>
          <h3>Tipos de cookies utilizados:</h3>
          <ul>
            <li>
              <strong>Necessários:</strong> essenciais para o funcionamento do site.
              Não podem ser desativados.
            </li>
            <li>
              <strong>Analíticos:</strong> nos ajudam a entender como você interage
              com o site, permitindo melhorias contínuas.
            </li>
            <li>
              <strong>Marketing:</strong> utilizados para exibir anúncios relevantes
              e medir a eficácia de campanhas.
            </li>
          </ul>
          <p>
            Você pode gerenciar suas preferências de cookies a qualquer momento
            através do banner de consentimento exibido em nosso site.
          </p>
        </section>

        <section className={styles.section}>
          <h2>7. Seus direitos (LGPD)</h2>
          <p>
            Como titular de dados pessoais, você possui os seguintes direitos
            garantidos pela LGPD (Art. 18):
          </p>
          <div className={styles.rightsGrid}>
            <div className={styles.rightCard}>
              <strong>Confirmação e acesso</strong>
              <span>Saber se tratamos seus dados e acessá-los</span>
            </div>
            <div className={styles.rightCard}>
              <strong>Correção</strong>
              <span>Corrigir dados incompletos, inexatos ou desatualizados</span>
            </div>
            <div className={styles.rightCard}>
              <strong>Anonimização ou eliminação</strong>
              <span>Solicitar a eliminação de dados desnecessários ou tratados com consentimento</span>
            </div>
            <div className={styles.rightCard}>
              <strong>Portabilidade</strong>
              <span>Solicitar a transferência dos dados a outro fornecedor</span>
            </div>
            <div className={styles.rightCard}>
              <strong>Revogação do consentimento</strong>
              <span>Revogar o consentimento a qualquer momento</span>
            </div>
            <div className={styles.rightCard}>
              <strong>Oposição</strong>
              <span>Opor-se ao tratamento realizado com base no legítimo interesse</span>
            </div>
          </div>
          <p>
            Para exercer qualquer um desses direitos, entre em contato conosco
            através do e-mail abaixo.
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. Segurança dos dados</h2>
          <p>
            Adotamos medidas técnicas e organizacionais para proteger seus dados
            contra acesso não autorizado, destruição, perda ou alteração, incluindo:
          </p>
          <ul>
            <li>Criptografia de conexão via SSL/TLS (HTTPS)</li>
            <li>Controles de acesso restritos a colaboradores autorizados</li>
            <li>Monitoramento de segurança contínuo</li>
            <li>Políticas internas de proteção de dados</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>9. Retenção dos dados</h2>
          <p>
            Mantemos seus dados pessoais pelo tempo necessário para cumprir as
            finalidades descritas nesta política, salvo se um período de retenção
            maior for exigido por lei (ex.: obrigações fiscais).
          </p>
          <p>
            Quando não houver mais necessidade legal ou contratual, os dados serão
            eliminados de forma segura.
          </p>
        </section>

        <section className={styles.section}>
          <h2>10. Alterações nesta política</h2>
          <p>
            Esta Política de Privacidade pode ser atualizada periodicamente para
            refletir mudanças em nossas práticas ou na legislação aplicável.
            Recomendamos que você a revise regularmente.
          </p>
          <p>
            A data da última atualização está indicada no início do documento.
            Alterações significativas serão comunicadas através do nosso site.
          </p>
        </section>

        <section className={styles.section}>
          <h2>11. Contato</h2>
          <p>
            Para exercer seus direitos, tirar dúvidas ou fazer solicitações
            relacionadas a esta Política de Privacidade, entre em contato conosco:
          </p>
          <div className={styles.contactInfo}>
            <p><strong>{CONTROLLER}</strong></p>
            <p>E-mail: <a href={`mailto:${CONTROLLER_EMAIL}`}>{CONTROLLER_EMAIL}</a></p>
            <p>
              Encarregado (DPO): <a href={`mailto:${CONTROLLER_EMAIL}`}>{CONTROLLER_EMAIL}</a>
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}

export default PrivacyPolicy;
