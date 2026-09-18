import React, { useState } from 'react';
import { ServerInfo } from '../types';

interface TicketsViewProps {
  currentServer: ServerInfo;
  onBackToDashboard?: () => void;
}

interface TicketPanel {
  id: string;
  name: string;
  channel: string;
  category: string;
  createdAt: string;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_LIST: FAQItem[] = [
  {
    id: 'plugins.ticketing.faq.question1',
    question: 'O que é um Painel?',
    answer:
      'Um Painel é uma mensagem que, uma vez publicada, permitirá aos membros abrir tickets a partir dela. É o ponto de entrada de todo o Plugin de emissão tickets no seu servidor. Esta mensagem inclui botões ou um menu suspenso (configurável no painel de controle Vixe) que pode ser clicado para criar ticket. Em seguida, é atribuído um canal a ticket criado, onde pode ocorrerá a conversa relacionada ao atendimento.',
  },
  {
    id: 'plugins.ticketing.faq.question2',
    question: 'Por que tenho que selecionar um Cargo Gerenciador de Tickets?',
    answer:
      'Eles poderão reivindicar, fechar, responder ou mesmo excluir o ticket (canal). Mais informações abaixo.\nCargos Gerenciadores de Tickets podem ver todos os tickets criados e reivindicá-los, respondê-los ou excluí-los. Um membro do seu servidor sem nenhum destes cargos só poderá criar tickets, ver e interagir com eles.',
  },
  {
    id: 'plugins.ticketing.faq.question3',
    question: 'Quantos tickets um membro pode abrir?',
    answer:
      'Um membro do seu servidor poderá abrir 1 ticket por categoria de suporte que você definir durante a configuração do painel (1 botão ou menu suspenso = 1 tipo de ticket). Um membro terá de esperar 5 minutos entre a criação de 2 tickets do mesmo tipo.',
  },
  {
    id: 'plugins.ticketing.faq.question4',
    question: 'Qual é o número máximo de tickets que podem ser criados no meu servidor?',
    answer:
      'Um servidor Discord não pode ter mais de 500 canais. Como os novos tickets serão criados como canais, está limitado a este número. O número máximo de tickets varia conforme o número de canais que já tem no seu servidor.\nO Discord também limita o número de canais por categoria a 50. Se este número de tickets for atingido na categoria "Criar", serão criados novos tickets como canais no topo da sua lista de canais.\nSe você atingir 50 canais nas categorias "Reivindicar" e "Fechar", as ações de reivindicar e fechar não funcionarão até que você exclua alguns canais nessas 2 categorias.',
  },
  {
    id: 'plugins.ticketing.faq.question5',
    question:
      'Por que preciso selecionar as categorias "Criar", "Reivindicar" e "Fechar" ao criar um botão de painel ou um menu suspenso?',
    answer:
      'Ao configurar um Painel e selecionar os tipos de tickets, será solicitado que você pedido que defina categorias para cada tipo de ticket. A categoria "Criar" é onde são criados os novos tickets, a categoria "Reivindicados" é onde são movidos os tickets reinvindicados por usuários com cargos de Gerenciador de Tickets e a categoria "Fechar" é onde são movidos os tickets resolvidos. Os tickets excluídos não estarão disponíveis, uma vez que os canais são permanentemente removidos do servidor.',
  },
  {
    id: 'plugins.ticketing.faq.question6',
    question: 'Onde serão criados os novos tickets?',
    answer:
      'Quando você cria um painel e define os tipos de tickets que deseja, você pode configurar uma categoria "Criar" para definir onde os novos tickets serão criados.',
  },
  {
    id: 'plugins.ticketing.faq.question7',
    question: 'O que é uma Mensagem de introdução de um ticket?',
    answer:
      'É uma mensagem publicada no canal do ticket logo após a sua criação. Utilize-a para explicar se precisa de informações adicionais ou para agradecer ao seu membro. Anexados a esta mensagem de introdução estão 4 botões fixados dentro de cada novo ticket: Reivindicar, Fechar, Reabrir e Apagar.',
  },
  {
    id: 'plugins.ticketing.faq.question8',
    question: 'Qual é o objetivo de reivindicar um ticket?',
    answer:
      'Se você precisar dividir a sua carga de trabalho, a reivindicação de um ticket pode ajudá-lo a organizar-se. A reivindicação move o ticket para a categoria "Reivindicar" que foi definida durante a configuração do painel, desobstruindo a categoria "Criar". Além disso, se for trabalhar em equipe, a reivindicação de um ticket adicionará o nome de quem reivindicou ao nome do ticket. Isto ajuda a esclarecer quem está atendendo o ticket.',
  },
  {
    id: 'plugins.ticketing.faq.question9',
    question: 'Não consigo mais reivindicar ou fechar um ticket, por quê?',
    answer:
      'O Discord limita o número de canais por categoria a 50. Se atingir 50 canais nas categorias "Reivindicar" ou "Fechar", as ações de reivindicar e fechar não funcionarão até excluir alguns canais nessas 2 categorias.',
  },
  {
    id: 'plugins.ticketing.faq.question10',
    question: 'Qual é a diferença entre fechar e apagar um ticket?',
    answer:
      'Ao fechar um ticket, ele será movido para a categoria \'Fechar\' e continuará contando como 1 canal no número máximo de canais por servidor ou por categoria. O seu conteúdo continuará acessível.\nApagar um ticket irá apagá-lo permanentemente. Deixará de contar no limite global do servidor de 500 canais e 50 canais por categoria, e o seu conteúdo deixará de estar acessível. Estamos gerando transcrições para que o conteúdo nunca se perca.',
  },
  {
    id: 'plugins.ticketing.faq.question11',
    question:
      'O que são os 4 botões que estão fixados em cada ticket: Reivindicar, Fechar, Reabrir e Apagar?',
    answer:
      'Reivindicar permite que você mova um novo ticket para uma determinada categoria e mudará adicionará ao nome do canal quem reivindicou.\nFechar permite que você feche um ticket sem perder o seu conteúdo.\nReabrir fica disponível assim que um ticket é fechado. Clicando nele, o ticket é reaberto.\nApagar permite que você elimine permanentemente um ticket. O canal atribuído ao ticket será apagado e não será possível restaurá-lo. Será apresentada uma mensagem de confirmação antes da remoção.',
  },
  {
    id: 'plugins.ticketing.faq.question12',
    question: 'Como posso editar um Canal do Painel e o cargo Gerenciador de Tickets?',
    answer:
      'Você pode duplicar um painel a partir da lista de painéis e, em seguida, alterar o canal do painel ou o cargo Gerenciador de Tickets.',
  },
  {
    id: 'plugins.ticketing.faq.question13',
    question: 'Posso pausar a abertura de novos tickets?',
    answer:
      'No modo de edição de um Painel, abaixo do botão ou menu suspenso, você pode usar o botão liga/desliga para habilitar ou desabilitar o botão ou menu suspenso. Uma vez desativado, significa que o botão ou menu suspenso não pode ser usado por seus membros.',
  },
  {
    id: 'plugins.ticketing.faq.question14',
    question: 'O que acontece quando apago um ticket?',
    answer:
      'O seu conteúdo é apagado permanentemente e deixa de estar acessível. Também deixará de contar no limite de 500 canais por servidor e 50 canais por categoria do Discord.',
  },
  {
    id: 'plugins.ticketing.faq.question15',
    question: 'Por que preciso esperar antes de poder realizar uma ação?',
    answer:
      'Para proteger o seu servidor contra sobrecargas e respeitar as restrições da API do Discord, existe um breve intervalo de segurança entre ações consecutivas nos canais de tickets.',
  },
  {
    id: 'plugins.ticketing.faq.question16',
    question: 'Por que meus membros precisam esperar antes de poder abrir um ticket?',
    answer:
      'Para evitar spam no servidor, um membro só pode abrir 1 ticket de cada tipo (definido nos botões ou no menu suspenso). Se tiver vários tipos de tickets no seu servidor, um membro terá que esperar 5 minutos entre a criação de 2 tickets do mesmo tipo.',
  },
];

export const TicketsView: React.FC<TicketsViewProps> = ({ currentServer, onBackToDashboard }) => {
  const [isActive, setIsActive] = useState(true);
  const [panels, setPanels] = useState<TicketPanel[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newPanelTitle, setNewPanelTitle] = useState('');
  const [newPanelChannel, setNewPanelChannel] = useState('#suporte-tickets');

  // Commands state
  const [isCommandsOpen, setIsCommandsOpen] = useState(true);
  const [commandsState, setCommandsState] = useState({
    claim: true,
    close: true,
    delete: true,
    reopen: true,
  });

  // FAQ open items state (by id)
  const [openFaqIds, setOpenFaqIds] = useState<Record<string, boolean>>({});

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCreatePanel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPanelTitle.trim()) return;

    const newPanel: TicketPanel = {
      id: `panel-${Date.now()}`,
      name: newPanelTitle.trim(),
      channel: newPanelChannel,
      category: 'Geral',
      createdAt: 'Agora mesmo',
    };

    setPanels((prev) => [...prev, newPanel]);
    setNewPanelTitle('');
    setIsCreateModalOpen(false);
  };

  const handleDeletePanel = (id: string) => {
    setPanels((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6 pb-16 animate-fadeIn" id="dashboard__content">
      {/* Header */}
          <div className="flex justify-between mb-8 lg:mb-6">
            <div className="flex flex-col grow items-center lg:items-start">
              <div className="bg-dark-800 sm:bg-transparent flex items-center justify-between w-[calc(100%+48px)] sm:w-full px-6 py-4 sm:px-0 sm:py-0 mb-3 sm:mb-0">
                <button
                  type="button"
                  onClick={onBackToDashboard}
                  aria-label="Voltar"
                  className="sm:hidden text-dark-100 p-1 hover:bg-dark-700 rounded-lg transition-colors"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5 17l-5-5 5-5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <h4 className="font-bold text-dark-100 text-2xl flex-1 text-center lg:text-left flex flex-row items-center">
                  Tickets
                </h4>
                <div>
                  <div className="flex justify-start cursor-pointer gap-2.5 items-center">
                    <div className="flex justify-start cursor-pointer gap-2.5 items-center flex-row-reverse">
                      <div
                        onClick={() => setIsActive(!isActive)}
                        className={`shrink-0 rounded-full transition-all duration-200 overflow-hidden relative cursor-pointer h-[28px] w-[56px] ${
                          isActive ? 'bg-brand-default' : 'bg-dark-700'
                        }`}
                      >
                        <div
                          className={`absolute left-0 top-0 w-full h-full flex items-center ${
                            isActive ? 'justify-start px-2' : 'justify-end px-2'
                          }`}
                        >
                          <div
                            className={`text-[10px] font-bold ${
                              isActive ? 'text-dark-900' : 'text-dark-400'
                            }`}
                            translate="no"
                          >
                            {isActive ? 'ON' : 'OFF'}
                          </div>
                        </div>
                        <div
                          className={`rounded-full top-1 absolute transition-all duration-200 transform flex items-center justify-center h-5 w-5 ${
                            isActive
                              ? 'translate-x-8 bg-white'
                              : 'translate-x-1 bg-dark-500'
                          }`}
                        >
                          <div
                            className={`h-2 w-2 rounded-full transition-all duration-200 ${
                              isActive ? 'bg-brand-dark' : 'bg-dark-700'
                            }`}
                          />
                        </div>
                      </div>
                      <label
                        onClick={() => setIsActive(!isActive)}
                        className="select-none cursor-pointer flex flex-col gap-0.5"
                      >
                        <div className="text-dark-100 text-base">
                          <p className="text-sm text-dark-100 hidden md:inline-block font-medium">
                            {isActive ? 'Ativo' : 'Desativado'}
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-base text-dark-300 max-w-[830px] ml-0 w-full mt-3 text-center sm:text-left">
                Permita que os membros do servidor abram tickets de atendimento, suporte ou relatórios organizados em canais dedicados.
              </p>
            </div>
          </div>

          {/* Main 12-Column Equivalent Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left Column: Painéis de Ticket e Comandos */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              {/* Card 1: Seus painéis de ticket */}
              <div className="bg-dark-800 shadow-xs sub_feature_card rounded-2xl border border-dark-700 overflow-hidden" id="plugins.ticketing.list.title">
                <h3 className="text-xl text-dark-100 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:text-dark-200 transition-all py-4 lg:py-6 px-4 sm:px-6 gap-3">
                  <div className="flex flex-col w-full pr-0 sm:pr-4">
                    <div className="sub_feature_title flex items-center text-base sm:text-lg font-semibold">
                      Seus painéis de ticket
                    </div>
                  </div>
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                  <p className="text-right text-base sm:text-xl text-dark-300">
                    <span className="text-dark-100 font-bold">{panels.length}</span>
                    &nbsp;/&nbsp;10
                  </p>
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-brand-default text-dark-900 hover:bg-brand-hover active:bg-brand-default active:bg-opacity-40 disabled:cursor-not-allowed disabled:opacity-50 text-xs sm:text-sm px-3 sm:px-4 py-2 cursor-pointer font-bold"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline-block shrink-0"
                    >
                      <path
                        d="M6 12h12m-6-6v12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="flex grow justify-center max-w-full">
                      <span className="transition-all duration-200 whitespace-nowrap text-ellipsis overflow-hidden block w-full shrink-0 text-center">
                        Criar Painel
                      </span>
                    </div>
                  </button>
                </div>
              </h3>

              <div className="text-base transition-all">
                <div className="p-6 pt-0">
                  <div className="grid w-full border-t border-solid border-dark-700 pt-4" />

                  {panels.length === 0 ? (
                    <div className="mx-auto w-full max-w-xl text-center my-6 py-4">
                      <img
                        src="/assets/init-1d58fdac.svg"
                        className="w-full max-w-[280px] mx-auto mb-4 opacity-90"
                        alt="empty_state"
                      />
                      <p className="text-dark-400 lg:text-xl text-base">
                        Você não tem painéis de ticket ainda
                      </p>
                      <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="mt-4 text-sm text-dark-200 hover:text-white underline underline-offset-4 cursor-pointer"
                      >
                        Clique aqui para criar seu primeiro painel
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                      {panels.map((p) => (
                        <div
                          key={p.id}
                          className="bg-dark-900 rounded-lg p-4 border border-dark-700 flex items-center justify-between"
                        >
                          <div>
                            <h5 className="font-semibold text-dark-100 text-base">{p.name}</h5>
                            <p className="text-xs text-dark-300 mt-0.5">
                              Canal: <span className="text-dark-200">{p.channel}</span> • Categoria: {p.category}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeletePanel(p.id)}
                            className="text-xs text-rose-400 hover:text-rose-300 p-2 rounded-lg hover:bg-rose-950/40 transition-colors cursor-pointer"
                          >
                            Excluir
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

              {/* Card 2: Comandos */}
              <div className="bg-dark-800 shadow-xs sub_feature_card rounded-2xl border border-dark-700 overflow-hidden" id="plugins.commands">
                <h3
                  onClick={() => setIsCommandsOpen(!isCommandsOpen)}
                  className="text-xl text-dark-100 flex justify-between items-start hover:text-dark-200 transition-all py-4 lg:py-6 px-6 cursor-pointer select-none"
                >
                  <div className="flex flex-col w-full pr-4">
                    <div className="sub_feature_title flex items-center text-lg font-semibold">
                      Comandos de Atendimento
                    </div>
                  </div>
                <div className="flex items-center justify-between gap-4">
                  <button type="button" className="pt-1 text-dark-300 hover:text-white">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`cursor-pointer transition-transform duration-200 ${
                        isCommandsOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    >
                      <path
                        d="M7 14.5l5-5 5 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </h3>

              {isCommandsOpen && (
                <div className="text-base transition-all">
                  <div className="p-6 pt-0">
                    <div className="mb-4 text-dark-300 text-sm">
                      Os comandos só podem ser executados de um canal de ticket por Gerenciadores de Ticket.
                    </div>
                    <div className="flex flex-col gap-2">
                      {/* Command 1: /ticket-claim */}
                      <div className="flex items-center w-full shadow-xs relative rounded-lg cursor-pointer p-4 sm:p-6 bg-dark-900 border border-transparent transition-all hover:border-dark-600">
                        <div className="flex flex-col">
                          <h5 className="flex text-base font-bold text-dark-100">
                            /ticket-claim
                          </h5>
                          <p className="text-sm text-dark-300">
                            Reivindicar um ticket.
                          </p>
                        </div>
                        <div className="flex justify-start cursor-pointer gap-2.5 ml-auto items-center">
                          <div
                            onClick={() =>
                              setCommandsState((prev) => ({ ...prev, claim: !prev.claim }))
                            }
                            className={`shrink-0 rounded-full transition-all duration-200 overflow-hidden relative cursor-pointer h-[28px] w-[56px] ${
                              commandsState.claim ? 'bg-brand-default' : 'bg-dark-700'
                            }`}
                          >
                            <div
                              className={`rounded-full top-1 absolute transition-all duration-200 transform flex items-center justify-center h-5 w-5 ${
                                commandsState.claim
                                  ? 'translate-x-8 bg-white'
                                  : 'translate-x-1 bg-dark-500'
                              }`}
                            >
                              <div
                                className={`h-2 w-2 rounded-full transition-all duration-200 ${
                                  commandsState.claim ? 'bg-brand-dark' : 'bg-dark-700'
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          title="Editar permissões"
                          className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-white bg-opacity-10 text-white hover:bg-opacity-20 active:bg-opacity-5 ml-4 p-2 cursor-pointer"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.31 10.448l4.57-4.57a3 3 0 014.241 4.243l-4.57 4.57a15.501 15.501 0 01-7.2 4.077l-.884.22a.376.376 0 01-.455-.455l.22-.883a15.501 15.501 0 014.078-7.202z"
                              fill="rgba(154,161,181,0.16)"
                            />
                            <path
                              d="M17.25 10.992c-2.121.707-4.95-2.121-4.242-4.242m.871-.871l-4.57 4.57a15.501 15.501 0 00-4.077 7.2l-.22.884a.376.376 0 00.455.455l.883-.22a15.501 15.501 0 007.202-4.078l4.57-4.57a3 3 0 10-4.243-4.241z"
                              stroke="#9B9D9F"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Command 2: /ticket-close */}
                      <div className="flex items-center w-full shadow-xs relative rounded-lg cursor-pointer p-4 sm:p-6 bg-dark-900 border border-transparent transition-all hover:border-dark-600">
                        <div className="flex flex-col">
                          <h5 className="flex text-base font-bold text-dark-100">
                            /ticket-close
                          </h5>
                          <p className="text-sm text-dark-300">
                            Fechar um ticket.
                          </p>
                        </div>
                        <div className="flex justify-start cursor-pointer gap-2.5 ml-auto items-center">
                          <div
                            onClick={() =>
                              setCommandsState((prev) => ({ ...prev, close: !prev.close }))
                            }
                            className={`shrink-0 rounded-full transition-all duration-200 overflow-hidden relative cursor-pointer h-[28px] w-[56px] ${
                              commandsState.close ? 'bg-brand-default' : 'bg-dark-700'
                            }`}
                          >
                            <div
                              className={`rounded-full top-1 absolute transition-all duration-200 transform flex items-center justify-center h-5 w-5 ${
                                commandsState.close
                                  ? 'translate-x-8 bg-white'
                                  : 'translate-x-1 bg-dark-500'
                              }`}
                            >
                              <div
                                className={`h-2 w-2 rounded-full transition-all duration-200 ${
                                  commandsState.close ? 'bg-brand-dark' : 'bg-dark-700'
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          title="Editar permissões"
                          className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-white bg-opacity-10 text-white hover:bg-opacity-20 active:bg-opacity-5 ml-4 p-2 cursor-pointer"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.31 10.448l4.57-4.57a3 3 0 014.241 4.243l-4.57 4.57a15.501 15.501 0 01-7.2 4.077l-.884.22a.376.376 0 01-.455-.455l.22-.883a15.501 15.501 0 014.078-7.202z"
                              fill="rgba(154,161,181,0.16)"
                            />
                            <path
                              d="M17.25 10.992c-2.121.707-4.95-2.121-4.242-4.242m.871-.871l-4.57 4.57a15.501 15.501 0 00-4.077 7.2l-.22.884a.376.376 0 00.455.455l.883-.22a15.501 15.501 0 007.202-4.078l4.57-4.57a3 3 0 10-4.243-4.241z"
                              stroke="#9B9D9F"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Command 3: /ticket-delete */}
                      <div className="flex items-center w-full shadow-xs relative rounded-lg cursor-pointer p-4 sm:p-6 bg-dark-900 border border-transparent transition-all hover:border-dark-600">
                        <div className="flex flex-col">
                          <h5 className="flex text-base font-bold text-dark-100">
                            /ticket-delete
                          </h5>
                          <p className="text-sm text-dark-300">
                            Excluir um ticket.
                          </p>
                        </div>
                        <div className="flex justify-start cursor-pointer gap-2.5 ml-auto items-center">
                          <div
                            onClick={() =>
                              setCommandsState((prev) => ({ ...prev, delete: !prev.delete }))
                            }
                            className={`shrink-0 rounded-full transition-all duration-200 overflow-hidden relative cursor-pointer h-[28px] w-[56px] ${
                              commandsState.delete ? 'bg-brand-default' : 'bg-dark-700'
                            }`}
                          >
                            <div
                              className={`rounded-full top-1 absolute transition-all duration-200 transform flex items-center justify-center h-5 w-5 ${
                                commandsState.delete
                                  ? 'translate-x-8 bg-white'
                                  : 'translate-x-1 bg-dark-500'
                              }`}
                            >
                              <div
                                className={`h-2 w-2 rounded-full transition-all duration-200 ${
                                  commandsState.delete ? 'bg-brand-dark' : 'bg-dark-700'
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          title="Editar permissões"
                          className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-white bg-opacity-10 text-white hover:bg-opacity-20 active:bg-opacity-5 ml-4 p-2 cursor-pointer"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.31 10.448l4.57-4.57a3 3 0 014.241 4.243l-4.57 4.57a15.501 15.501 0 01-7.2 4.077l-.884.22a.376.376 0 01-.455-.455l.22-.883a15.501 15.501 0 014.078-7.202z"
                              fill="rgba(154,161,181,0.16)"
                            />
                            <path
                              d="M17.25 10.992c-2.121.707-4.95-2.121-4.242-4.242m.871-.871l-4.57 4.57a15.501 15.501 0 00-4.077 7.2l-.22.884a.376.376 0 00.455.455l.883-.22a15.501 15.501 0 007.202-4.078l4.57-4.57a3 3 0 10-4.243-4.241z"
                              stroke="#9B9D9F"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Command 4: /ticket-reopen */}
                      <div className="flex items-center w-full shadow-xs relative rounded-lg cursor-pointer p-4 sm:p-6 bg-dark-900 border border-transparent transition-all hover:border-dark-600">
                        <div className="flex flex-col">
                          <h5 className="flex text-base font-bold text-dark-100">
                            /ticket-reopen
                          </h5>
                          <p className="text-sm text-dark-300">
                            Reabrir um ticket fechado.
                          </p>
                        </div>
                        <div className="flex justify-start cursor-pointer gap-2.5 ml-auto items-center">
                          <div
                            onClick={() =>
                              setCommandsState((prev) => ({ ...prev, reopen: !prev.reopen }))
                            }
                            className={`shrink-0 rounded-full transition-all duration-200 overflow-hidden relative cursor-pointer h-[28px] w-[56px] ${
                              commandsState.reopen ? 'bg-brand-default' : 'bg-dark-700'
                            }`}
                          >
                            <div
                              className={`rounded-full top-1 absolute transition-all duration-200 transform flex items-center justify-center h-5 w-5 ${
                                commandsState.reopen
                                  ? 'translate-x-8 bg-white'
                                  : 'translate-x-1 bg-dark-500'
                              }`}
                            >
                              <div
                                className={`h-2 w-2 rounded-full transition-all duration-200 ${
                                  commandsState.reopen ? 'bg-brand-dark' : 'bg-dark-700'
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          title="Editar permissões"
                          className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-white bg-opacity-10 text-white hover:bg-opacity-20 active:bg-opacity-5 ml-4 p-2 cursor-pointer"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.31 10.448l4.57-4.57a3 3 0 014.241 4.243l-4.57 4.57a15.501 15.501 0 01-7.2 4.077l-.884.22a.376.376 0 01-.455-.455l.22-.883a15.501 15.501 0 014.078-7.202z"
                              fill="rgba(154,161,181,0.16)"
                            />
                            <path
                              d="M17.25 10.992c-2.121.707-4.95-2.121-4.242-4.242m.871-.871l-4.57 4.57a15.501 15.501 0 00-4.077 7.2l-.22.884a.376.376 0 00.455.455l.883-.22a15.501 15.501 0 007.202-4.078l4.57-4.57a3 3 0 10-4.243-4.241z"
                              stroke="#9B9D9F"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Resumo de Atendimento e FAQ */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            {/* Card: Status & Resumo de Atendimento */}
            <div className="bg-dark-800 border border-dark-700 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-dark-700">
                <span className="text-xs font-bold uppercase tracking-wider text-dark-300">
                  Resumo do Atendimento
                </span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Operacional
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-dark-900 rounded-xl p-3 border border-dark-700/60">
                  <span className="text-[11px] text-dark-400 block">Painéis Ativos</span>
                  <strong className="text-lg text-white font-bold">{panels.length} / 10</strong>
                </div>
                <div className="bg-dark-900 rounded-xl p-3 border border-dark-700/60">
                  <span className="text-[11px] text-dark-400 block">Tempo Médio</span>
                  <strong className="text-lg text-white font-bold">&lt; 4 min</strong>
                </div>
                <div className="bg-dark-900 rounded-xl p-3 border border-dark-700/60">
                  <span className="text-[11px] text-dark-400 block">Atendentes</span>
                  <strong className="text-lg text-white font-bold">5 Online</strong>
                </div>
                <div className="bg-dark-900 rounded-xl p-3 border border-dark-700/60">
                  <span className="text-[11px] text-dark-400 block">Taxa de Resolução</span>
                  <strong className="text-lg text-white font-bold">98.4%</strong>
                </div>
              </div>
            </div>

            {/* Section 3: Perguntas frequentes */}
            <div className="bg-dark-800 border border-dark-700 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <p className="text-dark-100 font-bold text-base">
                  Perguntas frequentes
                </p>
                <span className="text-[10px] text-dark-400 uppercase font-semibold">Ajuda Rápida</span>
              </div>
              <div className="space-y-3">
                {FAQ_LIST.map((faq) => {
                  const isOpen = !!openFaqIds[faq.id];
                  return (
                    <div
                      key={faq.id}
                      className="bg-dark-900/80 border border-dark-700/80 rounded-xl overflow-hidden"
                      id={faq.id}
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(faq.id)}
                        className="text-left w-full text-sm text-dark-100 flex justify-between items-center hover:text-white transition-all p-3.5 cursor-pointer select-none"
                      >
                        <span className="font-semibold text-xs sm:text-sm pr-2">
                          {faq.question}
                        </span>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={`shrink-0 text-dark-400 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-white' : 'rotate-0'
                          }`}
                        >
                          <path
                            d="M7 14.5l5-5 5 5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="px-3.5 pb-3.5 pt-1 text-xs text-dark-300 leading-relaxed border-t border-dark-800/80">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      {/* Modal Criar Painel */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-dark-800 border border-dark-700 rounded-xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-dark-100 mb-2">Criar Painel de Tickets</h3>
            <p className="text-sm text-dark-300 mb-5">
              Defina o título do painel e o canal onde os membros poderão interagir.
            </p>
            <form onSubmit={handleCreatePanel} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-dark-400 uppercase tracking-wider mb-2">
                  Título do Painel
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: Central de Atendimento VIP"
                  value={newPanelTitle}
                  onChange={(e) => setNewPanelTitle(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 rounded-lg px-3.5 py-2.5 text-dark-100 text-sm focus:border-brand-default focus:ring-1 focus:ring-brand-default outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-dark-400 uppercase tracking-wider mb-2">
                  Canal de Publicação
                </label>
                <input
                  type="text"
                  value={newPanelChannel}
                  onChange={(e) => setNewPanelChannel(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 rounded-lg px-3.5 py-2.5 text-dark-100 text-sm focus:border-brand-default focus:ring-1 focus:ring-brand-default outline-none transition-all"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm text-dark-300 hover:text-white hover:bg-dark-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-sm font-bold bg-brand-default text-dark-900 hover:bg-brand-hover transition-colors"
                >
                  Confirmar e Criar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
